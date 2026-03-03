import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: 'Home', link: '/en/' },
  { text: 'Rules', link: '/en/rules/' },
  { text: "Project", link: '/en/project/' },
  {
    text: 'Team',
    link: '/en/structure/',
  },
  { text: "Columns", link: '/en/press/' },
  { text: "MC Nav", link: '/en/nav/' },
  {
    text: "Friendly Links",
              items: [
                { text: "LynSeq", link: "https://lynseq.com" },
                { text: "MCFlare", link: "https://forum.mcflare.com" },
                { text: "HuggingAI", link: "https://huggingai.org" },
                { text: "MSCPO", link: "https://mscpo.com/" },
                { text: "随风的个人网站", link: "https://zhuyuxuan.link/" },
                { text: "风梨网", link: "https://www.flweb.cn/" },
                { text: "Pingguomc's Website", link: "https://pingguomc.github.io/" },
              ]
  }
]
