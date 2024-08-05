export default {
    head: [
        ['link', { rel: 'icon', href: '/logo2.png' }],
    ],
    title: 'MCJPG组织',
    lastUpdated: true,
    description: 'Minecraft服务器集体宣传组织 (MSJPG)-一个致力于Minecraft服务器宣传和技术交流社区的新兴组织',
    lang: 'zh-CN',
    themeConfig: {
        siteTitle: 'MCJPG组织', //站点标题
        logo: "/logo2.png",
        description: '一个Minecraft服务器集体宣传组织',//Minecraft Server Collective Promotion Organization
        nav: [
            { text: "成员服", link: "/" },
            { text: "须知", link: "/rules/" },
            { text: "组织架构", link: "/structure/" },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/ZhuYuxuan9302/MCJPG" },
        ],
        footer: {
            message: 'MCJPG服务器联合组织',
            copyright: 'Copyright © 2024-present <a href="https://mcjpg.zhuyuxuan.link/">MCJPG</a>— —<a href="https://zhuyuxuan.link/">编辑的网站</a>'
        },
        lastUpdatedText: "最近更新时间",
        search: {
            provider: "local",
            options: {
              translations: {
                button: {
                  buttonText: "搜索文章",
                  buttonAriaLabel: "搜索文章",
                },
                modal: {
                  noResultsText: "无法找到相关结果",
                  resetButtonTitle: "清除查询条件",
                  footer: {
                    selectText: "选择",
                    navigateText: "切换",
                  },
                },
              },
            },
          },
    },
};
