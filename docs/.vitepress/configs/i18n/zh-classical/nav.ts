import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '成員伺服器', link: '/lch/' },
  { text: '組織規則', link: '/lch/rules/' },
  { text: "項目", link: '/lch/project/' },
  {
    text: '團隊',
    link: '/lch/structure/',
  },
  { text: "組織專欄", link: '/lch/press/' },
  { text: "AI索引", link: '/lch/nav/' },
  {
    text: "友情鏈接",
              items: [
                { text: "鈴序科技", link: "https://lynseq.com" },
                { text: "MCFlare", link: "https://forum.mcflare.com" },
                { text: "HuggingAI", link: "https://huggingai.org" },
                { text: "MSCPO", link: "https://mscpo.com/" },
                { text: "隨風的個人網站", link: "https://zhuyuxuan.link/" },
                { text: "鳳梨社區", link: "https://www.flweb.cn/" },
                { text: "蘋果之個人網站", link: "https://pingguomc.github.io/" },
              ]
  }
]
