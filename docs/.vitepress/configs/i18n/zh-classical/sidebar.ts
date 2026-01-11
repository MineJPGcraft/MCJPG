export const sidebar = {
    '/lch/press/': [
      {
        text: 'MCJPG組織專欄',
        items: [
          { text: '簡介', link: '/lch/press/' },
          {
            text: '特別欄目',
            base: '/lch/press/特别栏目/',
            collapsed: false,
            items: [
                {text: '2024國慶特輯', link: '2024国庆特辑/'},
                {text: '2025新年特輯', link: '2025新年特辑/'},
                {text: '週年特輯', link: '一周年特辑/'},
                {text: '2025國慶特輯', link: '2025国庆特辑/'},
                {text: '2025年度酬德計', link: '2025年度感谢计划/'},
                {text: '宣廣須知', link: '论坛合作/'},
                {text: '開啟AI智能倉庫時代', link: '开启AI智能仓库时代/'},
            ]
          },
          {
            text: '月刊',
            base: '/lch/press/月刊/',
            collapsed: false,
            items: [
                {text: '2024-11月', link: '2024-11月刊/'},
            ]
          },
        ]
      }
    ]
  }
  
