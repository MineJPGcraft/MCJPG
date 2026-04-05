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
        title: '人工智識代理',
        desc: '假借海內外卓犖人工智識巨範之代理，需自備密鑰',
        link: 'https://aiagent.mcjpg.org/',
      },
      {
        icon: '/logo_AI.png',
        title: '人工智識對話',
        desc: '無償與海內外卓犖人工智識巨範對話',
        link: 'https://owui.mcjpg.org/',
      },
      {
        icon: '/logo_AI.png',
        title: 'Charity API',
        desc: '吾輩公益之大模型API站',
        link: 'https://charity-api.mcjpg.org/',
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
