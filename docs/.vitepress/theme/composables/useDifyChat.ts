/**
 * useDifyChat - Dify Chat API 交互逻辑封装
 *
 * 封装 Dify v1 /chat-messages 接口的调用，支持：
 *   - SSE 流式响应
 *   - 会话管理（conversation_id 自动维护）
 *   - 预设变量（inputs）
 *   - 加载状态 & 错误处理
 */
import { ref, shallowRef } from 'vue'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  /** 临时 ID，用于流式更新 */
  id: string
}

export interface UseDifyChatOptions {
  /** Dify 应用的 API token (App Secret) */
  token: string
  /** Dify 服务基地址 */
  baseUrl: string
  /** 预设变量，如 { bot_name: '助手' } */
  inputs?: Record<string, any>
  /** 用户唯一标识（用于统计与会话隔离） */
  user?: string
}

export function useDifyChat(options: UseDifyChatOptions) {
  const { token, baseUrl, inputs = {}, user = 'web-user' } = options

  /** 消息列表 */
  const messages = shallowRef<ChatMessage[]>([])
  /** 当前会话 ID（首次对话后由 Dify 返回） */
  const conversationId = ref<string>('')
  /** 是否正在等待回复 */
  const loading = ref(false)
  /** 错误信息 */
  const error = ref<string>('')

  let abortController: AbortController | null = null

  /**
   * 生成简单唯一 ID
   */
  function genId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  }

  /**
   * 发送消息（流式 SSE）
   */
  async function sendMessage(text: string): Promise<void> {
    if (!text.trim() || loading.value) return

    error.value = ''
    loading.value = true

    // 构建用户消息
    const userMsg: ChatMessage = {
      role: 'user',
      content: text,
      id: genId(),
    }
    // 构建占位 assistant 消息（流式填充）
    const assistantMsg: ChatMessage = {
      role: 'assistant',
      content: '',
      id: genId(),
    }

    messages.value = [...messages.value, userMsg, assistantMsg]

    abortController = new AbortController()

    try {
      const resp = await fetch(`${baseUrl}/v1/chat-messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: text,
          inputs,
          response_mode: 'streaming',
          conversation_id: conversationId.value,
          user,
        }),
        signal: abortController.signal,
      })

      if (!resp.ok) {
        const errText = await resp.text()
        throw new Error(`HTTP ${resp.status}: ${errText}`)
      }

      // 读取 SSE 流
      const reader = resp.body?.getReader()
      if (!reader) throw new Error('无法读取响应流')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // SSE 以 \n\n 分隔事件
        const events = buffer.split('\n\n')
        buffer = events.pop() || '' // 最后一个可能不完整，留到下次

        for (const eventRaw of events) {
          if (!eventRaw.trim()) continue
          const lines = eventRaw.split('\n')
          let dataStr = ''
          for (const line of lines) {
            if (line.startsWith('data:')) {
              dataStr += line.slice(5).trim()
            }
          }
          if (!dataStr) continue

          try {
            const data = JSON.parse(dataStr)
            handleSSEEvent(data, assistantMsg)
          } catch {
            // JSON 解析失败，忽略
          }
        }
      }
    } catch (e: any) {
      if (e.name === 'AbortError') {
        // 用户取消，静默处理
      } else {
        error.value = e.message || '请求失败'
        // 移除空的占位消息
        if (!assistantMsg.content) {
          messages.value = messages.value.filter((m) => m.id !== assistantMsg.id)
        }
      }
    } finally {
      loading.value = false
      abortController = null
    }
  }

  /**
   * 处理 SSE 事件
   */
  function handleSSEEvent(data: any, assistantMsg: ChatMessage): void {
    const event = data.event
    switch (event) {
      case 'message':
      case 'agent_message': {
        // 追加内容片段
        assistantMsg.content += data.answer || ''
        // 触发响应式更新（替换数组引用）
        messages.value = [...messages.value]
        break
      }
      case 'message_end': {
        // 记录 conversation_id
        if (data.conversation_id) {
          conversationId.value = data.conversation_id
        }
        break
      }
      case 'error': {
        error.value = data.message || 'Dify 返回错误'
        break
      }
    }
  }

  /**
   * 终止当前请求
   */
  function abort(): void {
    abortController?.abort()
  }

  /**
   * 清空对话
   */
  function reset(): void {
    abort()
    conversationId.value = ''
    messages.value = []
    error.value = ''
  }

  return {
    messages,
    conversationId,
    loading,
    error,
    sendMessage,
    abort,
    reset,
  }
}
