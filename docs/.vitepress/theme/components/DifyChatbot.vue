<script setup lang="ts">
/**
 * DifyChatbot.vue - 自建聊天机器人 UI 组件
 *
 * 功能：
 *   - 浮动聊天按钮（左下角）
 *   - 完整聊天窗口：消息列表 + 输入框 + 流式响应
 *   - Markdown 基础渲染（代码块、加粗、链接等）
 *   - 暗色模式适配（跟随 VitePress 主题）
 *   - 移动端响应式
 *   - 自动滚动到底部
 *   - 打字指示器
 */
import { ref, nextTick, computed, watch } from 'vue'
import { useDifyChat } from '../composables/useDifyChat'

/* ── 配置（通过环境变量注入，避免泄露 API Key） ──────────────── */
const TOKEN = import.meta.env.VITE_DIFY_API_KEY || ''
const BASE_URL = import.meta.env.VITE_DIFY_BASE_URL || 'https://dify.mcjpg.org'
const BOT_NAME = 'MCJPG 助手'
const WELCOME =
  '你好！我是 MCJPG 智能助手 🤖\n你可以问我关于 MCJPG 组织、服务器、规章制度等任何问题~'

/** 检查 API Key 是否已配置 */
const isConfigured = !!TOKEN

/* ── 状态 ──────────────────────────────────────── */
const isOpen = ref(false)
const inputText = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

/* ── Dify Chat 逻辑 ────────────────────────────── */
const { messages, loading, error, sendMessage, abort, reset } = useDifyChat({
  token: TOKEN,
  baseUrl: BASE_URL,
  inputs: {},
  user: 'mcjpg-web-user',
})

/** 显示用消息列表（含欢迎语） */
const displayMessages = computed(() => messages.value)

/* ── 操作 ──────────────────────────────────────── */
async function handleSend() {
  if (!isConfigured) {
    error.value = '聊天服务未配置，请联系管理员设置 API Key。'
    return
  }
  const text = inputText.value.trim()
  if (!text || loading.value) return
  inputText.value = ''
  await sendMessage(text)
}

function handleKeydown(e: KeyboardEvent) {
  // Enter 发送，Shift+Enter 换行
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

function toggleChat() {
  isOpen.value = !isOpen.value
}

function handleReset() {
  reset()
}

/* ── 自动滚动 ──────────────────────────────────── */
async function scrollToBottom() {
  await nextTick()
  const el = messagesContainer.value
  if (el) {
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }
}

watch(
  () => messages.value.length,
  () => scrollToBottom(),
)
watch(
  () => messages.value[messages.value.length - 1]?.content,
  () => scrollToBottom(),
)
watch(isOpen, (open) => {
  if (open) scrollToBottom()
})

/* ── Markdown 基础渲染 ──────────────────────────── */
/**
 * 将 Dify 返回的 markdown 文本做轻量渲染：
 *   - 代码块 ```lang\ncode```
 *   - 行内代码 `code`
 *   - **加粗**
 *   - [链接](url)
 *   - 换行
 * 返回 HTML 字符串（已做基本转义）
 */
function renderMarkdown(text: string): string {
  if (!text) return ''
  // 先转义 HTML
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 代码块 ```lang\ncode```
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_m, lang, code) => {
    const langLabel = lang ? `<span class="chat-code-lang">${lang}</span>` : ''
    return `<pre class="chat-code-block">${langLabel}<code>${code.trim()}</code></pre>`
  })

  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code class="chat-code-inline">$1</code>')

  // 加粗
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')

  // 链接
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  )

  // 标题 (### etc) - 简单处理为加粗
  html = html.replace(/^###\s+(.+)$/gm, '<strong class="chat-h3">$1</strong>')
  html = html.replace(/^##\s+(.+)$/gm, '<strong class="chat-h2">$1</strong>')
  html = html.replace(/^#\s+(.+)$/gm, '<strong class="chat-h1">$1</strong>')

  // 无序列表
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')

  // 换行
  html = html.replace(/\n/g, '<br/>')

  return html
}

/** 判断是否是最后一条 assistant 消息且正在加载 */
const isTyping = computed(() => {
  const last = messages.value[messages.value.length - 1]
  return loading.value && last?.role === 'assistant' && last.content === ''
})
</script>

<template>
  <!-- 聊天按钮 -->
  <Transition name="chat-bubble">
    <button
      v-show="!isOpen"
      class="chatbot-bubble"
      :aria-label="BOT_NAME"
      title="点击打开聊天助手"
      @click="toggleChat"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
      <span class="chatbot-bubble-badge" v-if="messages.length === 0"></span>
    </button>
  </Transition>

  <!-- 聊天窗口 -->
  <Transition name="chat-window">
    <div v-show="isOpen" class="chatbot-window">
      <!-- 头部 -->
      <header class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <div>
            <h3>{{ BOT_NAME }}</h3>
            <span class="chatbot-status" :class="{ online: !loading, typing: loading }">
              {{ loading ? '正在输入…' : '在线' }}
            </span>
          </div>
        </div>
        <div class="chatbot-header-actions">
          <button class="chatbot-icon-btn" title="重置对话" @click="handleReset">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="1 4 1 10 7 10"/>
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
            </svg>
          </button>
          <button class="chatbot-icon-btn" title="关闭" @click="toggleChat">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- 消息列表 -->
      <div ref="messagesContainer" class="chatbot-messages">
        <!-- 欢迎消息 -->
        <div v-if="displayMessages.length === 0" class="chatbot-welcome">
          <div class="chatbot-welcome-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <p>{{ WELCOME }}</p>
          <!-- 快捷问题 -->
          <div class="chatbot-quick-questions" v-if="isConfigured">
            <button @click="sendMessage('MCJPG 是什么组织？')">MCJPG 是什么组织？</button>
            <button @click="sendMessage('有哪些成员服务器？')">有哪些成员服务器？</button>
            <button @click="sendMessage('如何加入 MCJPG？')">如何加入 MCJPG？</button>
          </div>
          <!-- 未配置提示 -->
          <div class="chatbot-unconfigured" v-else>
            <p>⚠️ 聊天服务尚未配置。</p>
            <p class="chatbot-unconfigured-hint">
              请在项目根目录创建 <code>.env</code> 文件并设置
              <code>VITE_DIFY_API_KEY</code>。
            </p>
          </div>
        </div>

        <!-- 消息气泡 -->
        <div
          v-for="msg in displayMessages"
          :key="msg.id"
          class="chatbot-message"
          :class="msg.role"
        >
          <div class="chatbot-message-avatar" v-if="msg.role === 'assistant'">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </div>
          <div class="chatbot-message-bubble" v-if="msg.content" v-html="renderMarkdown(msg.content)"></div>
          <!-- 打字指示器 -->
          <div class="chatbot-message-bubble typing-indicator" v-if="msg.role === 'assistant' && loading && !msg.content">
            <span></span><span></span><span></span>
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="chatbot-error">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>{{ error }}</span>
        </div>
      </div>

      <!-- 输入区 -->
      <footer class="chatbot-input-area">
        <textarea
          v-model="inputText"
          class="chatbot-input"
          :placeholder="loading ? '等待回复中…' : '输入消息，Enter 发送，Shift+Enter 换行'"
          :disabled="loading"
          rows="1"
          @keydown="handleKeydown"
        ></textarea>
        <button
          v-if="loading"
          class="chatbot-send-btn stop"
          title="终止生成"
          @click="abort"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="2"/>
          </svg>
        </button>
        <button
          v-else
          class="chatbot-send-btn"
          :disabled="!inputText.trim()"
          title="发送"
          @click="handleSend"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </footer>
    </div>
  </Transition>
</template>

<style scoped>
/* ── CSS 变量 ─────────────────────────────────── */
.chatbot-bubble,
.chatbot-window {
  /* 跟随 VitePress 暗色模式 */
  --chat-bg: var(--vp-c-bg);
  --chat-bg-soft: var(--vp-c-bg-soft);
  --chat-bg-elv: var(--vp-c-bg-elv, var(--vp-c-bg-soft));
  --chat-text: var(--vp-c-text-1);
  --chat-text-2: var(--vp-c-text-2);
  --chat-text-3: var(--vp-c-text-3);
  --chat-border: var(--vp-c-divider);
  --chat-brand: var(--vp-c-brand-1, #3eaf7c);
  --chat-brand-hover: var(--vp-c-brand-2, #4abf8a);
  --chat-user-bubble: var(--vp-c-brand-1, #3eaf7c);
  --chat-user-text: var(--vp-c-white, #fff);
  --chat-code-bg: var(--vp-c-bg-alt, rgba(125,125,125,0.08));
  --chat-shadow: rgba(0, 0, 0, 0.12);
}

:root.dark .chatbot-bubble,
:root.dark .chatbot-window {
  --chat-shadow: rgba(0, 0, 0, 0.4);
}

/* ── 浮动按钮 ─────────────────────────────────── */
.chatbot-bubble {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: var(--chat-brand);
  color: #fff;
  cursor: pointer;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px var(--chat-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.chatbot-bubble:hover {
  transform: scale(1.08);
  background: var(--chat-brand-hover);
  box-shadow: 0 6px 20px var(--chat-shadow);
}

.chatbot-bubble:active {
  transform: scale(0.95);
}

.chatbot-bubble-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: #ff4d4f;
  border-radius: 50%;
  border: 2px solid var(--chat-bg);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}

/* ── 聊天窗口 ─────────────────────────────────── */
.chatbot-window {
  position: fixed;
  bottom: 90px;
  left: 20px;
  width: 400px;
  max-width: calc(100vw - 40px);
  height: 600px;
  max-height: calc(100vh - 120px);
  background: var(--chat-bg);
  border: 1px solid var(--chat-border);
  border-radius: 16px;
  box-shadow: 0 16px 48px var(--chat-shadow);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── 头部 ─────────────────────────────────────── */
.chatbot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--chat-bg-soft);
  border-bottom: 1px solid var(--chat-border);
  flex-shrink: 0;
}

.chatbot-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chatbot-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--chat-brand);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chatbot-header-info h3 {
  font-size: 15px;
  font-weight: 600;
  margin: 0;
  color: var(--chat-text);
  line-height: 1.4;
}

.chatbot-status {
  font-size: 12px;
  color: var(--chat-text-3);
  display: flex;
  align-items: center;
  gap: 4px;
}

.chatbot-status.online::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #52c41a;
  display: inline-block;
}

.chatbot-status.typing::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #faad14;
  display: inline-block;
}

.chatbot-header-actions {
  display: flex;
  gap: 4px;
}

.chatbot-icon-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--chat-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.chatbot-icon-btn:hover {
  background: var(--chat-bg-elv);
  color: var(--chat-text);
}

/* ── 消息列表 ─────────────────────────────────── */
.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  scrollbar-width: thin;
}

.chatbot-messages::-webkit-scrollbar {
  width: 6px;
}

.chatbot-messages::-webkit-scrollbar-thumb {
  background: var(--chat-border);
  border-radius: 3px;
}

/* ── 欢迎消息 ─────────────────────────────────── */
.chatbot-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  padding: 20px 8px;
}

.chatbot-welcome-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--chat-bg-soft);
  color: var(--chat-brand);
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-welcome p {
  font-size: 14px;
  color: var(--chat-text-2);
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;
}

.chatbot-quick-questions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-top: 4px;
}

.chatbot-quick-questions button {
  padding: 8px 14px;
  border: 1px solid var(--chat-border);
  border-radius: 10px;
  background: var(--chat-bg);
  color: var(--chat-text-2);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
}

.chatbot-quick-questions button:hover {
  border-color: var(--chat-brand);
  color: var(--chat-brand);
  background: var(--chat-bg-soft);
}

/* ── 未配置提示 ────────────────────────────────── */
.chatbot-unconfigured {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  background: var(--vp-c-warning-bg, rgba(255, 196, 0, 0.1));
  border: 1px solid var(--vp-c-warning-border, rgba(255, 196, 0, 0.3));
}

.chatbot-unconfigured p {
  margin: 0;
  font-size: 13px;
  color: var(--chat-text-2);
  line-height: 1.6;
}

.chatbot-unconfigured-hint {
  margin-top: 4px !important;
  font-size: 12px !important;
  color: var(--chat-text-3) !important;
}

.chatbot-unconfigured code {
  padding: 2px 5px;
  border-radius: 4px;
  background: var(--chat-code-bg);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 12px;
}

/* ── 消息气泡 ─────────────────────────────────── */
.chatbot-message {
  display: flex;
  gap: 8px;
  max-width: 80%;
  animation: msgIn 0.3s ease;
}

@keyframes msgIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.chatbot-message.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.chatbot-message-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--chat-brand);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.chatbot-message-bubble {
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;
}

.chatbot-message.user .chatbot-message-bubble {
  background: var(--chat-user-bubble);
  color: var(--chat-user-text);
  border-bottom-right-radius: 4px;
}

.chatbot-message.assistant .chatbot-message-bubble {
  background: var(--chat-bg-soft);
  color: var(--chat-text);
  border: 1px solid var(--chat-border);
  border-bottom-left-radius: 4px;
}

/* ── 打字指示器 ────────────────────────────────── */
.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 12px 16px !important;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--chat-text-3);
  animation: typingDot 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typingDot {
  0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
  30% { transform: scale(1.3); opacity: 1; }
}

/* ── 错误提示 ─────────────────────────────────── */
.chatbot-error {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
  font-size: 13px;
  align-self: center;
  max-width: 90%;
}

/* ── 输入区 ───────────────────────────────────── */
.chatbot-input-area {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid var(--chat-border);
  background: var(--chat-bg-soft);
  flex-shrink: 0;
}

.chatbot-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--chat-border);
  border-radius: 10px;
  background: var(--chat-bg);
  color: var(--chat-text);
  font-size: 14px;
  font-family: inherit;
  resize: none;
  max-height: 120px;
  outline: none;
  transition: border-color 0.15s ease;
  line-height: 1.5;
}

.chatbot-input:focus {
  border-color: var(--chat-brand);
}

.chatbot-input::placeholder {
  color: var(--chat-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chatbot-send-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: var(--chat-brand);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.chatbot-send-btn:hover:not(:disabled) {
  background: var(--chat-brand-hover);
}

.chatbot-send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.chatbot-send-btn.stop {
  background: #ff4d4f;
}

.chatbot-send-btn.stop:hover {
  background: #ff7875;
}

/* ── Markdown 样式 ──────────────────────────────── */
.chatbot-message-bubble :deep(.chat-code-block) {
  position: relative;
  background: var(--chat-code-bg);
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
  overflow-x: auto;
  font-size: 13px;
}

.chatbot-message-bubble :deep(.chat-code-lang) {
  display: block;
  font-size: 11px;
  color: var(--chat-text-3);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.chatbot-message-bubble :deep(.chat-code-block code) {
  font-family: var(--vp-font-family-mono, monospace);
  display: block;
  white-space: pre;
}

.chatbot-message-bubble :deep(.chat-code-inline) {
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--chat-code-bg);
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13px;
}

.chatbot-message-bubble :deep(strong) {
  font-weight: 600;
}

.chatbot-message-bubble :deep(a) {
  color: var(--chat-brand);
  text-decoration: none;
}

.chatbot-message-bubble :deep(a:hover) {
  text-decoration: underline;
}

.chatbot-message-bubble :deep(ul) {
  padding-left: 20px;
  margin: 6px 0;
}

.chatbot-message-bubble :deep(li) {
  list-style: disc;
  margin: 2px 0;
}

.chatbot-message-bubble :deep(.chat-h1) {
  display: block;
  font-size: 16px;
  margin: 8px 0 4px;
}

.chatbot-message-bubble :deep(.chat-h2) {
  display: block;
  font-size: 15px;
  margin: 6px 0 4px;
}

.chatbot-message-bubble :deep(.chat-h3) {
  display: block;
  font-size: 14px;
  margin: 4px 0 2px;
}

/* ── 过渡动画 ─────────────────────────────────── */
.chat-bubble-enter-active,
.chat-bubble-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.chat-bubble-enter-from {
  opacity: 0;
  transform: scale(0.6) rotate(-90deg);
}

.chat-bubble-leave-to {
  opacity: 0;
  transform: scale(0.6) rotate(90deg);
}

.chat-window-enter-active,
.chat-window-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.chat-window-enter-from,
.chat-window-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* ── 移动端适配 ────────────────────────────────── */
@media (max-width: 768px) {
  .chatbot-bubble {
    bottom: 15px;
    left: 15px;
    width: 52px;
    height: 52px;
  }

  .chatbot-window {
    width: calc(100vw - 20px);
    height: calc(100vh - 110px);
    left: 10px;
    right: 10px;
    bottom: 75px;
    border-radius: 12px;
  }

  .chatbot-input {
    font-size: 15px; /* iOS 防止缩放 */
  }
}
</style>
