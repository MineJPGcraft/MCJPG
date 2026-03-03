import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '成员服', link: '/' },
  { text: '组织规则', link: '/rules/' },
  { text: "项目", link: '/project/' },
  {
    text: '团队',
    link: '/structure/',
  },
  { text: "组织专栏", link: '/press/' },
  { text: "MC导航", link: '/nav/' },
  {
    text: "友情链接",
              items: [
                { text: "铃序科技", link: "https://lynseq.com" },
                { text: "MCFlare", link: "https://forum.mcflare.com" },
                { text: "HuggingAI", link: "https://huggingai.org" },
                { text: "MSCPO", link: "https://mscpo.com/" },
                { text: "随风的个人网站", link: "https://zhuyuxuan.link/" },
                { text: "风梨网", link: "https://www.flweb.cn/" },
              ]
  }
]
