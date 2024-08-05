import DefaultTheme from 'vitepress/theme'
import './style/var.css'
import './style/fonts.css'
import Layout from './Layout.vue'
import VPHome from './components/VPHome.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({app}) {
    // 注册全局组件
    app.component('VPHome' , VPHome)
    app.component('Layout' , Layout)
  },
}
