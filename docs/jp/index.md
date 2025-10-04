---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: MCJPG
  text: サーバー交流組織
  tagline: Minecraftの技術交流とサーバー宣伝に専念する組織です</br>プレイヤーでもサーバー管理者でも、ここは優れた交流コミュニティです
  image:
    src: /logo.png
    alt: MCJPG組織
  actions:
    - text: コミュニティグループに参加
      link: https://qm.qq.com/q/bAZle5ABzy
    - theme: sponsor
      text: コミュニティMCナビ
      link: /jp/nav/
    - theme: sponsor
      text: 組織コラム
      link: /jp/press/


---
<ServerList />

<style>
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