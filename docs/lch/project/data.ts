import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: '官網',
    items: [
      {
        icon: '/logo.png',
        title: 'MCJPG官網',
        desc: '吾輩之官網',
        link: 'https://mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: '官網開發站',
        desc: '含最新之代碼更改',
        link: 'https://dev.mcjpg.org/',
      },
    ],
  },
  {
    title: '用具',
    items: [
      {
        icon: '/icons/project/casdoor.png',
        title: 'MCJPG令牌',
        desc: 'MCJPG統一之身份管理系統',
        link: 'https://sso.mcjpg.org/login/MCJPG/',
      },
      {
        icon: '/icons/project/google-color.svg',
        title: '元搜索',
        desc: 'MCJPG部署的元搜索引擎',
        link: 'https://search.mcjpg.org',
      },
      {
        icon: '/logo_AI.png',
        title: 'AskAI',
        desc: '有疑問乎？可詢AI！',
        link: 'https://askai.mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: 'ServerEditor',
        desc: '速編成員伺服器之列表',
        link: 'https://server-editor.mcjpg.dev/',
      },
      {
        icon: '/logo.png',
        title: 'Devop Platform',
        desc: '可取免費之次級域名及社群通行證登入',
        link: 'https://dash.mcjpg.dev/',
      },
      {
        icon: '/logo_AI.png',
        title: 'Charity API',
        desc: '吾輩公益之大模型API站',
        link: 'https://charity-api.mcjpg.dev/',
      },
      {
        icon: '/icons/project/Openlist.svg',
        title: 'FDS',
        desc: '文件分發之系統，快捷高效',
        link: 'https://fds.mcjpg.org/',
      },
      {
        icon: '/icons/project/Openlist.svg',
        title: 'FDS Plus',
        desc: '速之網路而服務相同',
        link: 'https://proxy.mcjpg.org:45595/',
      },
      {
        icon: '/icons/project/imghub.png',
        title: '圖床',
        desc: '可速示畫與他人',
        link: 'https://image.mcjpg.org/',
      },
      {
        icon: '/icons/project/editor.svg',
        title: 'Markdown輯者',
        desc: '開放程式碼之Markdown輯者',
        link: 'https://editor.mcjpg.org/',
      },
    ],
  },
  {
    title: '周邊',
    items: [
      {
        icon: '/Sticker.png',
        title: 'Sticker Pack',
        desc: '原創金蘋果看板娘之表情包',
        link: 'https://sticker.mcjpg.org/',
      },
    ],
  },
  {
    title: 'MC模組',
    items: [
      {
        icon: '/icons/project/ServerListSync.png',
        title: 'ServerListSync',
        desc: '可速同步衆戲之列表',
        link: 'https://modrinth.com/mod/serverlistsync',
      },
    ],
  },
  {
    title: '伺服器插件',
    items: [
      {
        icon: '/icons/project/webhook.jpg',
        title: 'Minecraft Webhook',
        desc: '監聽事件，發送Webhook',
        link: 'https://github.com/MineJPGcraft/Minecraft-Webhook',
      },
    ],
  },
  {
    title: '機器人插件',
    items: [
      {
        icon: '/icons/project/bot.jpg',
        title: 'MCTool',
        desc: '通群服互聯，可綁帳號查死亡',
        link: 'https://github.com/MineJPGcraft/koishi-plugin-mctool',
      },
    ],
  },
  {
    title: '狀態勘察',
    items: [
      {
        icon: '/icons/project/uptime.svg',
        title: '狀態勘察',
        desc: '實時勘察項目及成員伺服器之狀況',
        link: 'https://status.mcjpg.org/',
      },
      {
        icon: '/icons/project/bstack.webp',
        title: '備用之狀態勘察',
        desc: '僅MCJPG項目是也',
        link: 'https://bstatus.mcjpg.org/',
      },
    ],
  },
]
