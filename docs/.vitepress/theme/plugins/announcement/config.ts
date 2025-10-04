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
    id: 'welcome-2024',
    title: '欢迎来到 MCLUME',
    content: '🎉 欢迎来到 MCLUME 服务器！请仔细阅读游玩守则，享受愉快的游戏体验！',
    type: 'info',
    priority: 100,
    showIcon: true,
    closable: true,
    duration: 8000,
    position: 'top',
    target: ['/'] // 仅在首页显示
  },
  {
    id: 'new-feature',
    title: '新功能上线',
    content: '✨ 新增了日志|公告功能，现在你可以及时跟进服务器更改！',
    type: 'success',
    priority: 80,
    startTime: '2025-10-01',
    endTime: '2025-11-01',
    showIcon: true,
    closable: true,
    duration: 6000,
    position: 'top',
    target: ['/', '/docs/logs.html']
  },

  // 节日活动公告
  {
    id: 'NationalDay',
    title: '国庆节快乐!',
    content: '国庆节特别活动即将开启！完成任务获得限定奖励！',
    type: 'success',
    priority: 85,
    startTime: '2025-10-01',
    endTime: '2025-10-10',
    showIcon: true,
    closable: true,
    duration: 10000,
    position: 'top',
    target: []
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
  // 是否启用声音提示
  enableSound: true,
  // 是否启用震动反馈（移动端）
  enableVibration: true,
  // 公告容器的 z-index
  zIndex: 99999,
  // 是否启用键盘快捷键（ESC 关闭）
  enableKeyboard: true,
  // 公告显示延迟（毫秒）
  showDelay: 500
}
