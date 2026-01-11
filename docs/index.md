---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: MCJPG
  text: 服务器交流组织
  tagline: 一个致力于Minecraft技术交流和服务器宣传的组织<br>无论你是玩家还是服主，这里都是优秀的交流社区,这是一个用来测试自动翻译工作流的commit
  image:
    src: /logo.png
    alt: MCJPG组织
  actions:
    - text: 加入社区群组
      link: https://qm.qq.com/q/bAZle5ABzy
    - theme: sponsor
      text: 社区MC导航
      link: /nav/
    - theme: sponsor
      text: 组织专栏
      link: /press/
    - theme: sponsor
      text: MCFlare社区
      link: https://forum.mcflare.com


---
<ServerList />

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
<confetti />
