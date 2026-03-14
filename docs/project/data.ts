import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: '官网',
    items: [
      {
        icon: '/logo.png',
        title: 'MCJPG官网',
        desc: '我们的官网',
        link: 'https://mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: '官网开发站点',
        desc: '实时同步最新官网代码更新',
        link: 'https://dev.mcjpg.org/',
      },
    ],
  },
  {
    title: '实用工具',
    items: [
      {
        icon: '/icons/project/casdoor.png',
        title: 'MCJPG通行证',
        desc: 'MCJPG统一的账户系统',
        link: 'https://sso.mcjpg.org/login/mcjpg/',
      },
      {
        icon: '/icons/project/google-color.svg',
        title: '元搜索',
        desc: 'MCJPG部署的元搜索引擎',
        link: 'https://search.mcjpg.org',
      },
      {
        icon: '/logo_AI.png',
        title: 'AI 代理',
        desc: '使用基于国内外先进AI大模型的AI代理,需要BYOK',
        link: 'https://aiagent.mcjpg.org/',
      },
      {
        icon: '/logo_AI.png',
        title: 'AI Chat',
        desc: '免费与国内外先进AI大模型对话',
        link: 'https://owui.mcjpg.org/',
      },
      {
        icon: '/icons/project/Openlist.svg',
        title: 'FDS',
        desc: '文件分发服务，快捷分享你的文件',
        link: 'https://fds.mcjpg.org/',
      },
      {
        icon: '/icons/project/Openlist.svg',
        title: 'FDS Plus',
        desc: '加速线路，服务与主线路一致',
        link: 'https://proxy.mcjpg.org:45595/',
      },
      {
        icon: '/icons/project/imghub.png',
        title: '社区图床',
        desc: '快捷分享图片',
        link: 'https://image.mcjpg.org/',
      },
      {
        icon: '/icons/project/editor.svg',
        title: 'MarkDown编辑器',
        desc: '开源在线MarkDown编辑器',
        link: 'https://editor.mcjpg.org/',
      },
    ],
  },
  {
    title: 'MC模组',
    items: [
      {
        icon: '/icons/project/ServerListSync.png',
        title: 'ServerListSync',
        desc: '在线同步游戏内多人游戏服务器列表的模组',
        link: 'https://modrinth.com/mod/serverlistsync',
      },
    ],
  },
  {
    title: '服务器插件',
    items: [
      {
        icon: '/icons/project/webhook.jpg',
        title: 'Minecraft Webhook',
        desc: '实现事件监听及Webhook发送',
        link: 'https://github.com/MineJPGcraft/Minecraft-Webhook',
      },
    ],
  },
  {
    title: '机器人插件',
    items: [
      {
        icon: '/icons/project/bot.jpg',
        title: 'MCTool',
        desc: '实现群服互通（账号绑定、死亡记录查询）',
        link: 'https://github.com/MineJPGcraft/koishi-plugin-mctool',
      },
    ],
  },
  {
    title: '状态监测',
    items: [
      {
        icon: '/icons/project/uptime.svg',
        title: '状态监测',
        desc: '实时监测各项目和成员服在线情况',
        link: 'https://status.mcjpg.org/',
      },
      {
        icon: '/icons/project/bstack.webp',
        title: '备用状态监测',
        desc: '仅监控MCJPG项目',
        link: 'https://bstatus.mcjpg.org/',
      },
    ],
  },
]
