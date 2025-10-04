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
      duration: announ
