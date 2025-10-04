# 🚀 公告插件快速配置指南

## 📝 5分钟快速上手

### 1️⃣ 编辑配置文件

打开 `.vitepress/theme/plugins/announcement/config.ts`，修改 `announcements` 数组：

```typescript
export const announcements: AnnouncementConfig[] = [
  {
    id: 'my-first-announcement',           // 唯一ID
    title: '欢迎来到我的网站',              // 标题
    content: '这是我的第一个公告！',        // 内容
    type: 'info',                         // 类型: info/success/warning/error
    priority: 100,                        // 优先级（数字越大越优先）
    showIcon: true,                       // 显示图标
    closable: true,                       // 可关闭
    duration: 5000,                       // 5秒后自动关闭（0=不自动关闭）
    position: 'top',                      // 位置: top/bottom
    target: []                            // 显示页面（空=所有页面）
  }
]
```

### 2️⃣ 保存并测试

保存文件后，启动开发服务器：

```bash
npm run docs:dev
```

访问网站即可看到公告效果！

## 🎨 常用配置模板

### 欢迎公告（仅首页）
```typescript
{
  id: 'welcome',
  title: '欢迎',
  content: '欢迎来到我们的网站！',
  type: 'info',
  priority: 80,
  showIcon: true,
  closable: true,
  duration: 8000,
  position: 'top',
  target: ['/']  // 仅首页显示
}
```

### 维护通知（全站）
```typescript
{
  id: 'maintenance',
  title: '维护通知',
  content: '网站将于今晚进行维护，请提前保存工作。',
  type: 'warning',
  priority: 90,
  showIcon: true,
  closable: true,
  duration: 0,  // 不自动关闭
  position: 'top',
  target: []  // 全站显示
}
```

### 新功能发布（特定页面）
```typescript
{
  id: 'new-feature',
  title: '新功能',
  content: '我们发布了新功能，快来体验吧！',
  type: 'success',
  priority: 70,
  showIcon: true,
  closable: true,
  duration: 6000,
  position: 'top',
  target: ['/docs/features', '/docs/changelog']  // 特定页面
}
```

### 紧急通知
```typescript
{
  id: 'urgent',
  title: '紧急通知',
  content: '发现重要安全问题，请立即更新！',
  type: 'error',
  priority: 100,
  showIcon: true,
  closable: false,  // 不可关闭
  duration: 0,      // 不自动关闭
  position: 'top',
  target: []
}
```

## ⏰ 时间控制

### 定时显示公告
```typescript
{
  id: 'timed-announcement',
  title: '限时活动',
  content: '双十一活动开始啦！',
  type: 'success',
  priority: 85,
  startTime: '2024-11-01',      // 开始时间
  endTime: '2024-11-12',        // 结束时间
  showIcon: true,
  closable: true,
  duration: 10000,
  position: 'top',
  target: []
}
```

## 🎯 页面定位

- `target: []` - 所有页面显示
- `target: ['/']` - 仅首页显示  
- `target: ['/docs/']` - 所有文档页面显示
- `target: ['/docs/guide', '/docs/api']` - 特定页面显示

## 🔧 全局设置

在 `config.ts` 中修改 `globalConfig`：

```typescript
export const globalConfig = {
  maxVisible: 3,        // 最多同时显示3个公告
  spacing: 12,          // 公告间距12px
  animationDuration: 400, // 动画400ms
  zIndex: 99999,        // 层级
  showDelay: 500        // 延迟500ms显示
}
```

## 🚨 注意事项

1. **ID必须唯一** - 每个公告的 `id` 不能重复
2. **优先级排序** - 数字越大优先级越高，会显示在上方
3. **性能考虑** - 不要同时显示过多公告（建议≤3个）
4. **移动端适配** - 插件已自动适配移动端，无需额外配置
5. **深色模式** - 自动适配网站的深色/浅色主题

## 🎉 完成！

配置完成后，你的网站就有了优雅的公告系统！

需要更多高级功能？查看完整的 [README.md](./README.md) 文档。

