---
layout: home

hero:
  name: MCJPG服务器集体宣传组织
  tagline: Minecraft服务器集体宣传组织 (MCJPG)</br>一个致力于Minecraft服务器宣传和技术交流社区的新兴组织
  image:
    src: /logo.png
    alt: MCJPG组织
  actions:
    - theme: brand
      text: 加入社区群组
      link: https://qm.qq.com/q/C9K1fV3pSM
    - theme: alt
      text: 加入服主组织(需通过社区审核)
      link: https://qm.qq.com/q/wIJMz1SBjk
    # - theme: alt
      # text: View on GitHub
      # link: https://github.com/vuejs/vitepress

features:
  - icon:
      src: /server_icons/MC生电服.jpg
    title: MC生电服
    details: 多版本支持 原生1.20.4 趣味的生电 便捷的菜单操作 不限制传送 独家优化的整合包 无需正版
    link: https://qm.qq.com/q/QhfzwbV82Y
    linkText: 加入我们!
  - icon:
      src: /server_icons/MCODW.png
    title: MCODW 服务器
    details: 版本：JAVA互通 | 1.20.1</br>leaves生电+粘液
    link: https://mcyouxi.asia/
    linkText: 实现共产，奔赴未来！
  - icon:
      src: /server_icons/HappyDog.jpg
    title: HappyDog
    details: 版本：JAVA互通 | 1.8.X-1.20.x跨版本</br>HappyDog新服开荒！1.8.X-1.20.x多版本支持！且支持基岩版玩家进入服务器！无正版无白名单，快来一键进服玩耍！快来和小伙伴占山为王吧！
    link: http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=XMDbSMq5gMVGTESYHiBOQB80SoYJA7U4&authKey=qRhuSkFIxpfQc9CYs4MnfidRNI2cOcrT1HqoJbVV7%2BujhsywsYPx8Kv0NzuCitxd&noverify=0&group_code=192088919
    linkText: 加入HappyDog！
  - icon:
      src: /server_icons/MCIC.jpg
    title: MCIC
    details: 版本：JAVA | 1.16.x-1.20.2</br>*Unknown**无线电静默*成分复杂的服务器
    link: https://qm.qq.com/q/6DsL9DkN3O
    linkText: 加入MCIC!
  - icon:
      src: https://api.flweb.cn/logos/MCWP/server-icon.png
    title: MC WindyPear高版本互通生电
    details: 客户端版本：JAVA1.9-1.21</br>基岩最新版</br>无正版无白名单，littleskin登录</br>风梨团队倾心打造
    link: https://go.flweb.cn/qunmcwp
    linkText: 加入MC WindyPear!
---
<script>
export default {
  mounted() {
    this.shuffleElements();
    // 如果确实需要在挂载后调用 reload() 方法，确保该方法已经定义
    // this.reload();
  },
  methods: {
    shuffleElements() {
      const elements = Array.from(document.querySelectorAll('div.VPFeatures .container .items .item'));
      const parent = document.querySelector('div.VPFeatures .container .items');

      for (let i = elements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = elements[i];
        elements[i] = elements[j];
        elements[j] = temp;
      }

      // 清空父元素并将重新排序后的元素添加到父元素中
      parent.innerHTML = '';
      elements.forEach(element => {
        parent.appendChild(element);
      });
    }
  }
}
</script>
