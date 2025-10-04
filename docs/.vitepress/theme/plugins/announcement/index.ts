/**
 * 公告插件入口文件
 * 提供插件的安装和配置功能
 */

import type { App } from 'vue'
import AnnouncementSystem from './AnnouncementSystem.vue'
import { globalConfig, announcements, type AnnouncementConfig } from './config'

// 插件安装函数
export function install(app: App) {
  // 注册全局组件
  app.component('AnnouncementSystem', AnnouncementSystem)
  
  // 提供全局配置
  app.provide('announcementConfig', globalConfig)
  app.provide('announcements', announcements)
}

// 工具函数：动态添加公告
export function addAnnouncement(announcement: AnnouncementConfig) {
  const existingIndex = announcements.findIndex(a => a.id === announcement.id)
  if (existingIndex >= 0) {
    // 更新现有公告
    announcements[existingIndex] = announcement
  } else {
    // 添加新公告
    announcements.push(announcement)
    // 按优先级排序
    announcements.sort((a, b) => b.priority - a.priority)
  }
}

// 工具函数：移除公告
export function removeAnnouncement(id: string) {
  const index = announcements.findIndex(a => a.id === id)
  if (index >= 0) {
    announcements.splice(index, 1)
  }
}

// 工具函数：清空所有公告
export function clearAnnouncements() {
  announcements.length = 0
}

// 工具函数：获取公告列表
export function getAnnouncements(): AnnouncementConfig[] {
  return [...announcements]
}

// 工具函数：更新全局配置
export function updateGlobalConfig(config: Partial<typeof globalConfig>) {
  Object.assign(globalConfig, config)
}

// 预设公告模板
export const templates = {
  // 欢迎公告
  welcome: (content: string): AnnouncementConfig => ({
    id: `welcome-${Date.now()}`,
    title: '欢迎',
    content,
    type: 'info',
    priority: 50,
    showIcon: true,
    closable: true,
    duration: 5000,
    position: 'top',
    target: ['/']
  }),
  
  // 维护通知
  maintenance: (content: string, startTime?: string, endTime?: string): AnnouncementConfig => ({
    id: `maintenance-${Date.now()}`,
    title: '维护通知',
    content,
    type: 'warning',
    priority: 90,
    startTime,
    endTime,
    showIcon: true,
    closable: true,
    duration: 0,
    position: 'top',
    target: []
  }),
  
  // 新功能发布
  feature: (content: string, target?: string[]): AnnouncementConfig => ({
    id: `feature-${Date.now()}`,
    title: '新功能',
    content,
    type: 'success',
    priority: 70,
    showIcon: true,
    closable: true,
    duration: 8000,
    position: 'top',
    target: target || []
  }),
  
  // 紧急通知
  urgent: (content: string): AnnouncementConfig => ({
    id: `urgent-${Date.now()}`,
    title: '紧急通知',
    content,
    type: 'error',
    priority: 100,
    showIcon: true,
    closable: true,
    duration: 0,
    position: 'top',
    target: []
  })
}

// 导出类型
export type { AnnouncementConfig }
export { globalConfig, announcements }
