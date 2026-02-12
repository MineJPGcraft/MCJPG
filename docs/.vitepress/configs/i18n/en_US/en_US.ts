import { defineConfig, type DefaultTheme } from 'vitepress'
import {  nav, sidebar, } from './'

export const en_US = defineConfig({
    title: 'MCJPG Organization Website',
    description: 'Minecraft Server Communication Organization (MCJPG) - an organization dedicated to Minecraft technical communication and server promotion.',

    themeConfig: {
        siteTitle: 'MCJPG Organization',
        nav,
        sidebar,
        editLink: {
            pattern: 'https://github.com/MineJPGcraft/MCJPG/edit/main/docs/:path',
            text: 'Edit this page'
          },
        
        outline: {
            level: 'deep',
            label: 'Page navigation',
          },
      
        footer: {
            message: 'MCJPG Server Exchange Organization',
            copyright: 'Copyright © 2026-Present <a href="https://mcjpg.org/en/">MCJPG</a>— —<a href="https://github.com/MineJPGcraft/MCJPG">Website repository</a>'
          },
      
        lastUpdated: {
        text: 'Last updated',
            formatOptions: {
              dateStyle: 'short',
              timeStyle: 'medium',
            },
          },
      
        docFooter: {
            prev: 'Last Page',
            next: 'Next Page',
          },
      
        returnToTopLabel: 'Back to top',
        sidebarMenuLabel: 'menu',
        darkModeSwitchLabel: 'Display mode',
        lightModeSwitchTitle: 'Switch to light mode',
        darkModeSwitchTitle: 'Switch to dark mode',

        notFound: {
          code:'404',
          title:'PAGE NOT FOUND',
          quote:"There's nothing here, look elsewhere, and if you're really bored you can go to the community group and chat!",
          linkText:'Take me home',
        },
    }
})

// export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
//     en: {
//       placeholder: '搜索文档',
//       translations: {
//         button: {
//           buttonText: '搜索文档',
//           buttonAriaLabel: '搜索文档'
//         },
//         modal: {
//           searchBox: {
//             resetButtonTitle: '清除查询条件',
//             resetButtonAriaLabel: '清除查询条件',
//             cancelButtonText: '取消',
//             cancelButtonAriaLabel: '取消'
//           },
//           startScreen: {
//             recentSearchesTitle: '搜索历史',
//             noRecentSearchesText: '没有搜索历史',
//             saveRecentSearchButtonTitle: '保存至搜索历史',
//             removeRecentSearchButtonTitle: '从搜索历史中移除',
//             favoriteSearchesTitle: '收藏',
//             removeFavoriteSearchButtonTitle: '从收藏中移除'
//           },
//           errorScreen: {
//             titleText: '无法获取结果',
//             helpText: '你可能需要检查你的网络连接'
//           },
//           footer: {
//             selectText: '选择',
//             navigateText: '切换',
//             closeText: '关闭',
//             searchByText: '搜索提供者'
//           },
//           noResultsScreen: {
//             noResultsText: '无法找到相关结果',
//             suggestedQueryText: '你可以尝试查询',
//             reportMissingResultsText: '你认为该查询应该有结果？',
//             reportMissingResultsLinkText: '点击反馈'
//           }
//         }
//       }
//     }
//   }
