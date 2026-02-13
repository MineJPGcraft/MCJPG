<template>
  <div class="dify-chatbot-container"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let cleanupFns = []

function loadDifyChatbot() {
  // 配置 Dify
  window.difyChatbotConfig = {
    token: '8phrRoAeEh9HDhOc',
    baseUrl: 'https://dify.mcjpg.org',
    inputs: {},
    systemVariables: {},
    userVariables: {}
  }

  // 加载脚本
  const script = document.createElement('script')
  script.src = 'https://dify.mcjpg.org/embed.min.js'
  script.id = '8phrRoAeEh9HDhOc'
  script.defer = true
  document.body.appendChild(script)

  // 添加样式
  const style = document.createElement('style')
  style.id = 'dify-chatbot-style'
  style.textContent = `
    /* 聊天按钮样式 - 左下角 */
    #dify-chatbot-bubble-button {
      background-color: #1C64F2 !important;
      position: fixed !important;
      bottom: 20px !important;
      left: 20px !important;
      right: auto !important;
      z-index: 9999 !important;
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    }

    /* 聊天窗口样式 - 左下角 */
    #dify-chatbot-bubble-window {
      width: 24rem !important;
      height: 40rem !important;
      max-height: calc(100vh - 120px) !important;
      position: fixed !important;
      bottom: 90px !important;
      left: 20px !important;
      right: auto !important;
      z-index: 9999 !important;
      border-radius: 12px !important;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2) !important;
    }

    /* 移动端适配 */
    @media (max-width: 768px) {
      #dify-chatbot-bubble-button {
        bottom: 15px !important;
        left: 15px !important;
        width: 50px !important;
        height: 50px !important;
      }

      #dify-chatbot-bubble-window {
        width: calc(100vw - 20px) !important;
        height: calc(100vh - 100px) !important;
        bottom: 75px !important;
        left: 10px !important;
        right: 10px !important;
      }
    }
  `
  document.head.appendChild(style)
}

onMounted(() => {
  // 页面已经加载完成的情况（比如客户端导航过来的）
  if (document.readyState === 'complete') {
    // 即使已经 complete，也用 requestIdleCallback 延迟到浏览器空闲时再加载
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => loadDifyChatbot(), { timeout: 3000 })
      cleanupFns.push(() => cancelIdleCallback(idleId))
    } else {
      const timerId = setTimeout(loadDifyChatbot, 2000)
      cleanupFns.push(() => clearTimeout(timerId))
    }
    return
  }

  // 页面尚未加载完成，监听 load 事件，load 触发后再额外延迟一小段时间
  const onLoad = () => {
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => loadDifyChatbot(), { timeout: 3000 })
      cleanupFns.push(() => cancelIdleCallback(idleId))
    } else {
      const timerId = setTimeout(loadDifyChatbot, 2000)
      cleanupFns.push(() => clearTimeout(timerId))
    }
  }

  window.addEventListener('load', onLoad, { once: true })
  cleanupFns.push(() => window.removeEventListener('load', onLoad))
})

onUnmounted(() => {
  // 执行所有清理函数（取消定时器 / idle 回调 / 事件监听）
  cleanupFns.forEach(fn => fn())
  cleanupFns = []

  // 清理脚本
  const script = document.getElementById('8phrRoAeEh9HDhOc')
  if (script) script.remove()

  // 清理样式
  const style = document.getElementById('dify-chatbot-style')
  if (style) style.remove()

  // 清理 Dify 注入的 DOM 元素
  const button = document.getElementById('dify-chatbot-bubble-button')
  if (button) button.remove()
  const chatWindow = document.getElementById('dify-chatbot-bubble-window')
  if (chatWindow) chatWindow.remove()

  // 清理配置
  delete window.difyChatbotConfig
})
</script>