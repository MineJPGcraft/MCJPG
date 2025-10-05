<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showAnnouncementSystem && visibleAnnouncements.length > 0"
        class="announcement-system"
        :class="`position-${globalConfig.position || 'top'}`"
        :style="{ zIndex: globalConfig.zIndex }"
      >
        <TransitionGroup
          name="announcement"
          tag="div"
          class="announcement-container"
          :style="{ gap: `${globalConfig.spacing}px` }"
        >
          <div
            v-for="(announcement, index) in visibleAnnouncements"
            :key="announcement.id"
            class="announcement-wrapper"
            :style="{ '--delay': `${index * 80}ms` }"
          >
            <div
              class="announcement-toast"
              :class="[
                `type-${announcement.type}`,
                { 'with-icon': announcement.showIcon },
                { 'closable': announcement.closable },
                { 'closing': closingAnnouncements.has(announcement.id) }
              ]"
              @click="handleAnnouncementClick(announcement)"
              @mouseenter="pauseTimer(announcement.id)" 
              @mouseleave="resumeTimer(announcement.id)"
            >
              <div class="announcement-backdrop"></div>
              
              <div class="announcement-content">
                <div v-if="announcement.showIcon" class="announcement-icon-container">
                  <component 
                    :is="getIconComponent(announcement.type)" 
                    class="announcement-icon"
                  />
                </div>
                
                <div class="announcement-text">
                  <h4 v-if="announcement.title" class="announcement-title">
                    {{ announcement.title }}
                  </h4>
                  <p class="announcement-message">{{ announcement.content }}</p>
                </div>
                
                <button
                  v-if="announcement.closable"
                  class="announcement-close"
                  @click.stop="closeAnnouncement(announcement.id)"
                  :aria-label="'关闭公告'"
                >
                  <CloseIcon class="close-icon" />
                </button>
              </div>
              
              <div
                v-if="announcement.duration > 0 && announcement.showProgress"
                class="announcement-progress"
                :style="{ 
                    transform: `scaleX(${announcement.remainingTime / announcement.duration})`
                }"
              ></div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h, watch } from 'vue'
import { useRoute } from 'vitepress'
// 假设 config 文件如下，你需要确保它们能被正确导入
import { announcements, globalConfig, type AnnouncementConfig } from './config' 

// --- 图标组件定义（保持不变）---
const InfoIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  width: '20',
  height: '20',
  fill: 'currentColor',
  class: 'icon-svg'
}, [
  h('path', {
    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
  })
])

const SuccessIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  width: '20',
  height: '20',
  fill: 'currentColor',
  class: 'icon-svg'
}, [
  h('path', {
    d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  })
])

const WarningIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  width: '20',
  height: '20',
  fill: 'currentColor',
  class: 'icon-svg'
}, [
  h('path', {
    d: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'
  })
])

const ErrorIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  width: '20',
  height: '20',
  fill: 'currentColor',
  class: 'icon-svg'
}, [
  h('path', {
    d: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
  })
])

const CloseIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  width: '16',
  height: '16',
  fill: 'currentColor',
  class: 'icon-svg'
}, [
  h('path', {
    d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
  })
])

// --- 状态管理和工具函数 ---
const route = useRoute()
const showAnnouncementSystem = ref(false) 
const closedAnnouncements = ref<Set<string>>(new Set())
const closingAnnouncements = ref<Set<string>>(new Set())

interface ActiveAnnouncementState {
  rAFHandle: number | null // requestAnimationFrame 句柄
  
  remainingTime: number // 当前剩余时间（毫秒），用于渲染进度
  duration: number // 原始总时长（毫秒）
  
  // startCountingTime: number // 不再需要，用 lastFrameTime 替代
  lastFrameTime: number; // 新增：上次 rAF 成功更新进度的时间戳
  
  showProgress: boolean
  isActive: boolean
  isPaused: boolean 
}

const activeAnnouncements = ref<Map<string, ActiveAnnouncementState>>(new Map()) 

const getIconComponent = (type: string) => {
  const iconMap = { info: InfoIcon, success: SuccessIcon, warning: WarningIcon, error: ErrorIcon }
  return iconMap[type as keyof typeof iconMap] || InfoIcon
}

// 路径匹配逻辑（保持不变）
const normalizePath = (path: string): string => {
  try {
    const decodedPath = decodeURIComponent(path)
    if (decodedPath === '/') return decodedPath
    return decodedPath.endsWith('/') ? decodedPath.slice(0, -1) : decodedPath
  } catch (e) {
    if (path === '/') return path
    return path.endsWith('/') ? path.slice(0, -1) : path
  }
}

const isPathMatched = (currentPath: string, targetPath: string): boolean => {
  const normalizedCurrent = normalizePath(currentPath)
  const normalizedTarget = normalizePath(targetPath)
  
  if (normalizedTarget === '/') {
    return normalizedCurrent === '/' || normalizedCurrent === '/index' || normalizedCurrent === ''
  }
  if (normalizedCurrent === normalizedTarget) {
    return true
  }
  if (normalizedCurrent.startsWith(normalizedTarget + '/')) {
    return true
  }
  return false
}

const canBeActivated = (announcement: AnnouncementConfig): boolean => {
  if (closedAnnouncements.value.has(announcement.id)) return false
  if (activeAnnouncements.value.get(announcement.id)?.isActive) return false

  const now = new Date()
  if (announcement.startTime && new Date(announcement.startTime) > now) return false
  if (announcement.endTime && new Date(announcement.endTime) < now) return false
  
  if (announcement.target && announcement.target.length > 0) {
    const currentPath = route.path
    return announcement.target.some(targetPath => isPathMatched(currentPath, targetPath))
  }
  
  return true
}

const initAnnouncementState = (announcement: AnnouncementConfig) => {
  if (!activeAnnouncements.value.get(announcement.id)?.isActive) {
    activeAnnouncements.value.set(announcement.id, {
      rAFHandle: null,
      remainingTime: announcement.duration, 
      duration: announcement.duration,
      lastFrameTime: 0, // 初始化为 0
      showProgress: announcement.duration > 0,
      isActive: true,
      isPaused: false,
    })
  }
}

// **rAF 计时核心 (优化)**
const startRAFTimer = (id: string) => {
  const state = activeAnnouncements.value.get(id)
  if (!state || state.isPaused || state.rAFHandle || state.duration <= 0) return

  const step = (timestamp: number) => {
    // 检查是否已暂停或被关闭
    if (state.isPaused || !activeAnnouncements.value.get(id)) {
      if (state.rAFHandle) cancelAnimationFrame(state.rAFHandle)
      state.rAFHandle = null
      return
    }
    
    // 关键优化：计算本次与上次渲染之间流逝的精确时间
    // 第一次运行 (lastFrameTime=0) 时，deltaTime 应该为 0，因为时间是从本次 rAF 帧开始算的
    const deltaTime = state.lastFrameTime ? (timestamp - state.lastFrameTime) : 0; 

    let newRemaining = state.remainingTime - deltaTime;

    if (newRemaining <= 0) {
      newRemaining = 0
      state.remainingTime = newRemaining
      closeAnnouncement(id)
      if (state.rAFHandle) cancelAnimationFrame(state.rAFHandle)
      state.rAFHandle = null
      return
    }

    state.remainingTime = newRemaining
    state.lastFrameTime = timestamp; // 更新上次渲染时间戳
    
    // 自动触发 Vue 重新渲染 progress 元素的 transform 样式
    state.rAFHandle = requestAnimationFrame(step)
  }

  // 恢复/启动时，重置 lastFrameTime 以确保 rAF 的第一次计算 deltaTime 为 0
  state.lastFrameTime = 0; 
  state.rAFHandle = requestAnimationFrame(step)
  activeAnnouncements.value.set(id, state)
}

// **暂停计时器 (简化)**
const pauseTimer = (id: string) => {
  const state = activeAnnouncements.value.get(id)
  if (!state || !state.showProgress || state.isPaused) return

  // 1. 停止 rAF 循环
  if (state.rAFHandle) cancelAnimationFrame(state.rAFHandle)
  state.rAFHandle = null
  
  // 2. 标记暂停 (remainingTime 在 rAF 循环结束时已精确维护)
  state.isPaused = true
  
  activeAnnouncements.value.set(id, state)
}

// **恢复计时器**
const resumeTimer = (id: string) => {
  const state = activeAnnouncements.value.get(id)
  if (!state || !state.showProgress || !state.isPaused) return
  
  if (state.remainingTime <= 0) {
    closeAnnouncement(id)
    return
  }

  // 1. 标记为未暂停
  state.isPaused = false
  
  // 2. 重新启动 rAF
  startRAFTimer(id)

  activeAnnouncements.value.set(id, state)
}


const visibleAnnouncements = computed(() => {
  const activeAnnouncementsList = announcements
    .filter(announcement => activeAnnouncements.value.get(announcement.id)?.isActive)
    .map(announcement => {
      const activeInfo = activeAnnouncements.value.get(announcement.id)!
      return {
        ...announcement,
        showProgress: activeInfo.showProgress,
        remainingTime: activeInfo.remainingTime, 
        isPaused: activeInfo.isPaused,
        duration: activeInfo.duration 
      }
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, globalConfig.maxVisible)

  return activeAnnouncementsList
})

const closeAnnouncement = (id: string) => {
  const state = activeAnnouncements.value.get(id)
  
  if (state?.rAFHandle) cancelAnimationFrame(state.rAFHandle)
  
  closingAnnouncements.value.add(id)
  closedAnnouncements.value.add(id) 
  
  setTimeout(() => {
    activeAnnouncements.value.delete(id) 
    closingAnnouncements.value.delete(id)
  }, 400)
}

const handleAnnouncementClick = (announcement: AnnouncementConfig) => {
  console.log('Announcement clicked:', announcement.id)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (globalConfig.enableKeyboard && event.key === 'Escape') {
    const latestAnnouncement = visibleAnnouncements.value[0]
    if (latestAnnouncement && latestAnnouncement.closable) {
      closeAnnouncement(latestAnnouncement.id)
    }
  }
}

const isPageLoaded = () => document.readyState === 'complete'

const waitForPageLoad = () => {
  return new Promise<void>((resolve) => {
    if (isPageLoaded()) {
      resolve()
    } else {
      const onLoad = () => {
        window.removeEventListener('load', onLoad)
        resolve()
      }
      window.addEventListener('load', onLoad)
    }
  })
}

watch(() => route.path, (newPath) => {
  announcements.forEach(announcement => {
    if (canBeActivated(announcement)) {
      initAnnouncementState(announcement);
      startRAFTimer(announcement.id); 
    }
  });
}, { immediate: false }) 

onMounted(async () => {
  await waitForPageLoad()
  await new Promise(resolve => setTimeout(resolve, globalConfig.showDelay || 500))
  
  showAnnouncementSystem.value = true
  
  announcements.forEach(announcement => {
    if (canBeActivated(announcement)) {
      initAnnouncementState(announcement);
      startRAFTimer(announcement.id); 
    }
  });

  if (globalConfig.enableKeyboard) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  activeAnnouncements.value.forEach(activeInfo => {
    if (activeInfo.rAFHandle) cancelAnimationFrame(activeInfo.rAFHandle)
  })
  activeAnnouncements.value.clear()
  closingAnnouncements.value.clear()
  
  if (globalConfig.enableKeyboard) {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
/* 核心容器优化：更精准的定位与响应式约束 */
.announcement-system {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 580px; /* 略收窄提升精致感 */
  padding: 0 clamp(12px, 3vw, 24px); /* 响应式内边距 */
  pointer-events: none;
  z-index: inherit; /* 继承配置的z-index */
}

.announcement-system.position-top {
  top: clamp(16px, 4vh, 28px); /* 响应式顶部距离 */
}

.announcement-system.position-bottom {
  bottom: clamp(16px, 4vh, 28px); /* 响应式底部距离 */
}

.announcement-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: inherit; /* 继承配置的间距 */
}

.announcement-wrapper {
  width: 100%;
  pointer-events: auto;
}

/* 公告卡片核心样式：增强玻璃态质感 */
.announcement-toast {
  position: relative;
  width: 100%;
  border-radius: 14px; /* 更精致的圆角 */
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); /* 更自然的缓动 */
  will-change: transform, opacity, box-shadow;
  
  /* 高级玻璃态效果 */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12); /* 细腻边框 */
  
  /* 多层次阴影 */
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* 暗色模式适配优化 */
.dark .announcement-toast {
  background: rgba(15, 15, 15, 0.3);
  border-color: rgba(255, 255, 255, 0.06);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.03);
}

/* 悬停状态增强：更微妙的变换 */
.announcement-toast:hover {
  transform: translateY(-2px) scale(1.003); /* 更克制的缩放 */
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 3px 8px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.1);
}

.dark .announcement-toast:hover {
  background: rgba(15, 15, 15, 0.35);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.25),
    0 3px 8px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* 关闭动画优化：更自然的退出 */
.announcement-toast.closing {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 背景层次增强：渐变效果 */
.announcement-backdrop {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, rgba(255, 255, 255, 0.02) 100%);
  opacity: 0.12;
  border-radius: 14px;
  z-index: 0;
}

.dark .announcement-backdrop {
  background: linear-gradient(135deg, rgba(18, 18, 18, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
}

/* 内容容器优化：更合理的间距 */
.announcement-content {
  position: relative;
  display: flex;
  align-items: center;
  padding: clamp(12px, 3vh, 16px) clamp(14px, 4vw, 20px); /* 响应式内边距 */
  gap: clamp(10px, 2vw, 14px); /* 响应式间距 */
  z-index: 1;
}

/* 图标容器：精确尺寸控制 */
.announcement-icon-container {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  will-change: transform;
}

/* 图标效果增强：微妙光晕 */
.announcement-icon {
  color: var(--announcement-color);
  transition: transform 0.25s ease, filter 0.25s ease;
}

.announcement-toast:hover .announcement-icon {
  transform: scale(1.08);
  filter: brightness(1.1); /* 亮度增强 */
}

.icon-svg {
  display: block;
  transform: translateZ(0); /* 硬件加速 */
}

/* 文本区域：排版层次优化 */
.announcement-text {
  flex: 1;
  min-width: 0;
}

.announcement-title {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.45;
  letter-spacing: 0.02em; /* 微调字间距 */
}

.announcement-message {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.55;
  word-break: break-word;
  letter-spacing: 0.01em; /* 微调字间距 */
}

/* 关闭按钮：精致化设计 */
.announcement-close {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  width: 26px;
  height: 26px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  opacity: 0.8; /* 默认略暗 */
}

.announcement-close:hover {
  background: rgba(255, 255, 255, 0.18);
  color: var(--announcement-color);
  transform: scale(1.12);
  opacity: 1; /* 悬停时完全显示 */
}

.close-icon {
  transform: translateZ(0);
}

.dark .announcement-close {
  background: rgba(255, 255, 255, 0.07);
}

.dark .announcement-close:hover {
  background: rgba(255, 255, 255, 0.12);
}

/* 进度条：更精致的视觉效果 */
.announcement-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--announcement-color);
  width: 100%;
  transform-origin: left;
  opacity: 0.8;
  z-index: 1;
  transition: transform 60ms linear;
  box-shadow: 0 0 6px var(--announcement-color); /* 微妙光晕 */
}

/* 类型颜色优化：更和谐的色调 */
.type-info { --announcement-color: rgba(59, 130, 246, 0.85); } /* 更柔和的蓝 */
.type-success { --announcement-color: rgba(34, 197, 94, 0.85); } /* 更柔和的绿 */
.type-warning { --announcement-color: rgba(245, 158, 11, 0.85); } /* 更柔和的黄 */
.type-error { --announcement-color: rgba(239, 68, 68, 0.85); } /* 更柔和的红 */

/* 动画系统优化：更自然的过渡 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.announcement-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); /* 更流畅的进入曲线 */
  transition-delay: var(--delay, 0ms);
}

.announcement-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
  z-index: 1;
}

.announcement-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}

.announcement-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

.announcement-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 响应式细节优化 */
@media (max-width: 768px) {
  .announcement-toast {
    border-radius: 12px;
  }
  
  .announcement-title {
    font-size: 13px;
  }
  
  .announcement-message {
    font-size: 12px;
  }
  
  .announcement-icon-container {
    width: 24px;
    height: 24px;
  }
}

/* 减少动画模式适配 */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
  
  .announcement-toast:hover,
  .announcement-close:hover,
  .announcement-toast:hover .announcement-icon {
    transform: none;
    filter: none;
  }
}
</style>
