import { h, watch } from 'vue'
import { useData, EnhanceAppContext, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createMediumZoomProvider } from './composables/useMediumZoom'
import MLayout from './components/MLayout.vue'
import MNavLinks from './components/MNavLinks.vue'
import './styles/index.scss'
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'
import confetti from "./components/confetti.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import ServerList from './components/ServerList.vue'
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'
import { install as installAnnouncementPlugin } from './plugins/announcement'

let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,

  setup() {
    // Get frontmatter and route
    const { frontmatter } = useData();
    const route = useRoute();
        
    // giscus配置
    giscusTalk({
      repo: 'MineJPGcraft/MCJPG',
      repoId: 'R_kgDOMmxeOw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOMmxeO84CjDGB',
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      locales: {
        'zh-Hans': 'zh-CN',
        'en_US': 'en'
      },
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );

  },

  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(MLayout, props)
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    createMediumZoomProvider(app, router)
    app.component('confetti' , confetti)
    app.provide('DEV', process.env.NODE_ENV === 'development')
    vitepressMusic(playlist)
    app.component('MNavLinks', MNavLinks)
    app.component('ArticleMetadata' , ArticleMetadata)
    app.component('ServerList' , ServerList)
    // 安装公告插件
    installAnnouncementPlugin(app)

    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () =>
          updateHomePageStyle(
            /* /vitepress-nav-template/ 是为了兼容 GitHub Pages */
            location.pathname === '/' || location.pathname === '/vitepress-nav-template/',
          ),
        { immediate: true },
      )
    }
    if (typeof window !== 'undefined') {
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }
      router.onAfterRouteChanged = () => {
        NProgress.done()
      }
    }
  },
}

if (typeof window !== 'undefined') {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase()
  if (browser.includes('chrome')) {
    document.documentElement.classList.add('browser-chrome')
  } else if (browser.includes('firefox')) {
    document.documentElement.classList.add('browser-firefox')
  } else if (browser.includes('safari')) {
    document.documentElement.classList.add('browser-safari')
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}

const playlist = [
  {
    name: 'Otherside',
    author: 'Mojang',
    file: '/music/otherside.mp3',
  },
  {
    name: 'maimai DX CiRCLE',
    author: 'SEGA',
    file: '/music/maimai_dx_circle.mp3',
  }
]
