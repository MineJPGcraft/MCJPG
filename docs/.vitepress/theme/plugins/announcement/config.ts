/**
 * 公告插件配置文件
 * 通过修改此文件来管理公告内容
 */

export interface AnnouncementConfig {
  id: string
  title: string
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
  priority: number
  startTime?: string
  endTime?: string
  showIcon: boolean
  closable: boolean
  duration: number // 0 表示不自动关闭
  position: 'top' | 'bottom'
  target?: string[] // 指定显示的页面路径，空数组表示所有页面
}

/**
 * 公告配置列表
 * 按 priority 降序排列，数值越大优先级越高
 */
export const announcements: AnnouncementConfig[] = [
  {
    id: 'welcome',
    title: '欢迎来到 AIJPG',
    content: '🎉 欢迎来到 AIJPG 官网！',
    type: 'info',
    priority: 100,
    showIcon: true,
    closable: true,
    duration: 5000,
    position: 'top',
    target: ['/']
  },
  {
    id: 'new-feature',
    title: '新年快乐',
    content: '✨ AIJPG组织祝大家2026新年快乐！',
    type: 'info',
    priority: 200,
    startTime: '2025-12-31',
    endTime: '2026-01-03',
    showIcon: true,
    closable: true,
    duration: 5000,
    position: 'top',
    target: ['/'] // 仅首页显示
    }

]
/**
 * 全局配置
 */
export const globalConfig = {
  // 最大同时显示的公告数量
  maxVisible: 3,
  // 公告间的间距（像素）
  spacing: 12,
  // 动画持续时间（毫秒）
  animationDuration: 400,
  // 是否启用声音提示（无用）
  enableSound: true,
  // 是否启用震动反馈（移动端，无用）
  enableVibration: true,
  // 公告容器的 z-index
  zIndex: 99999,
  // 是否启用键盘快捷键（ESC 关闭）
  enableKeyboard: true,
  // 公告显示延迟（毫秒）
  showDelay: 500
}
