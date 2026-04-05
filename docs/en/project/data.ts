import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: 'Official Website',
    items: [
      {
        icon: '/logo.png',
        title: 'MCJPG Official Website',
        desc: 'Our official website',
        link: 'https://mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: 'Official Development Site',
        desc: 'Syncs the latest official website code updates in real-time',
        link: 'https://dev.mcjpg.org/',
      },
    ],
  },
  {
    title: 'Utilities',
    items: [
      {
        icon: '/icons/project/casdoor.png',
        title: 'MCJPG Passport',
        desc: 'MCJPG unified account system',
        link: 'https://sso.mcjpg.org/login/mcjpg/',
      },
      {
        icon: '/icons/project/google-color.svg',
        title: 'Meta Search',
        desc: 'MCJPG Meta Search Engine',
        link: 'https://search.mcjpg.org',
      },
      {
        icon: '/logo_AI.png',
        title: 'AI Agent',
        desc: 'Access to AI agents powered by cutting-edge AI large models from both domestic and international sources, requires BYOK',
        link: 'https://aiagent.mcjpg.org/',
      },
      {
        icon: '/logo_AI.png',
        title: 'AI Chat',
        desc: 'Free chat with cutting-edge AI large models from both domestic and international sources',
        link: 'https://owui.mcjpg.org/',
      },
      {
        icon: '/logo_AI.png',
        title: 'Charity API',
        desc: 'Our public welfare large model API site',
        link: 'https://charity-api.mcjpg.org/',
      },
      {
        icon: '/icons/project/Openlist.svg',
        title: 'FDS',
        desc: 'File distribution service for easy sharing',
        link: 'https://fds.mcjpg.org/',
      },
      {
        icon: '/icons/project/Openlist.svg',
        title: 'FDS Plus',
        desc: 'Accelerated routes consistent with main routes',
        link: 'https://proxy.mcjpg.org:45595/',
      },
      {
        icon: '/icons/project/imghub.png',
        title: 'Community Image Hosting',
        desc: 'Quickly share images',
        link: 'https://image.mcjpg.org/',
      },
      {
        icon: '/icons/project/editor.svg',
        title: 'MarkDown Editor',
        desc: 'Open-source online MarkDown editor',
        link: 'https://editor.mcjpg.org/',
      },
    ],
  },
  {
    title: 'MC Mods',
    items: [
      {
        icon: '/icons/project/ServerListSync.png',
        title: 'ServerListSync',
        desc: 'A mod to sync multiplayer server lists in-game',
        link: 'https://modrinth.com/mod/serverlistsync',
      },
    ],
  },
  {
    title: 'Server Plugins',
    items: [
      {
        icon: '/icons/project/webhook.jpg',
        title: 'Minecraft Webhook',
        desc: 'Listen events(login, logout and die) and send via webhook',
        link: 'https://github.com/MineJPGcraft/Minecraft-Webhook',
      },
    ],
  },
  {
    title: 'Bot Plugins',
    items: [
      {
        icon: '/icons/project/bot.jpg',
        title: 'MCTool',
        desc: 'Connect QQ group and your server',
        link: 'https://github.com/MineJPGcraft/koishi-plugin-mctool',
      },
    ],
  },
  {
    title: 'Status Monitoring',
    items: [
      {
        icon: '/icons/project/uptime.svg',
        title: 'Status Monitoring',
        desc: 'Real-time monitoring of various project and member server statuses',
        link: 'https://status.mcjpg.org/',
      },
      {
        icon: '/icons/project/bstack.webp',
        title: 'Backup Status Monitoring',
        desc: 'Monitors MCJPG projects only',
        link: 'https://bstatus.mcjpg.org/',
      },
    ],
  },
]
