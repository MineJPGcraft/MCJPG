import { defineConfig, type DefaultTheme } from 'vitepress'
import {  nav, sidebar, } from './'

export const zh_CN = defineConfig({
    title: 'MCJPG组织网站',
    description: 'Minecraft服务器交流组织 (MCJPG)-一个致力于Minecraft技术交流和服务器宣传的新兴组织',

    themeConfig: {
        siteTitle: 'MCJPG组织',
        nav,
        sidebar,
        editLink: {
            pattern: 'https://github.com/MineJPGcraft/MCJPG/edit/main/docs/:path',
            text: '编辑此页面'
          },
        
        outline: {
            level: 'deep',
            label: '页面导航',
          },
      
        footer: {
            message: 'MCJPG服务器交流组织',
            copyright: 'Copyright © 2026-Present <a href="https://mcjpg.org/">MCJPG</a>— —<a href="https://github.com/MineJPGcraft/MCJPG">网站代码仓库</a>'
          },
      
        lastUpdated: {
        text: '最后更新于',
            formatOptions: {
              dateStyle: 'short',
              timeStyle: 'medium',
            },
          },
      
        docFooter: {
            prev: '上一页',
            next: '下一页',
          },
      
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '目录',
        darkModeSwitchLabel: '深浅模式',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',

        notFound: {
          code:'404',
          title:'不存在的页面',
          quote:'这里什么都没有，去别处看看吧，实在无聊可以去社区群组聊聊天',
          linkText:'返回首页',
        },
    }
})

export const search: DefaultTheme.AlgoliaSearchOptions['locales'] = {
    root: {
      placeholder: '搜索文档',
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档'
        },
        modal: {
          searchBox: {
            resetButtonTitle: '清除查询条件',
            resetButtonAriaLabel: '清除查询条件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消'
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除'
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接'
          },
          footer: {
            selectText: '选择',
            navigateText: '切换',
            closeText: '关闭',
            searchByText: '搜索提供者'
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为该查询应该有结果？',
            reportMissingResultsLinkText: '点击反馈'
          }
        }
      }
    }
  }
