---
layout: page
title: 我们的团队
description: MCJPG组织团队成员列表
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'
const code = [
    {
    avatar: '/teammate/SuiFeng.jpg',
    name: '随风潜入夜',
    title: '网络开发',
    desc: 'MCJPG官网和社区导航维护 | MC生电服腐竹',
    links: [
      { icon: 'github', link: 'https://github.com/ZhuYuxuan9302' },
      { icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M488.6 104.1C505.3 122.2 513 143.8 511.9 169.8V372.2C511.5 398.6 502.7 420.3 485.4 437.3C468.2 454.3 446.3 463.2 419.9 464H92C65.6 463.2 43.8 454.2 26.7 436.8C9.7 419.4 .8 396.5 0 368.2V169.8C.8 143.8 9.7 122.2 26.7 104.1C43.8 87.8 65.6 78.8 92 78H121.4L96.1 52.2C90.3 46.5 87.4 39.2 87.4 30.4C87.4 21.6 90.3 14.3 96.1 8.6C101.8 2.9 109.1 0 117.9 0C126.7 0 134 2.9 139.8 8.6L213.1 78H301.1L375.6 8.6C381.7 2.9 389.2 0 398 0C406.8 0 414.1 2.9 419.9 8.6C425.6 14.3 428.5 21.6 428.5 30.4C428.5 39.2 425.6 46.5 419.9 52.2L394.6 78L423.9 78C450.3 78.8 471.9 87.8 488.6 104.1H488.6zM449.8 173.8C449.4 164.2 446.1 156.4 439.1 150.3C433.9 144.2 425.1 140.9 416.4 140.5H96.1C86.5 140.9 78.6 144.2 72.5 150.3C66.3 156.4 63.1 164.2 62.7 173.8V368.2C62.7 377.4 66 385.2 72.5 391.7C79 398.2 86.9 401.5 96.1 401.5H416.4C425.6 401.5 433.4 398.2 439.7 391.7C446 385.2 449.4 377.4 449.8 368.2L449.8 173.8zM185.5 216.5C191.8 222.8 195.2 230.6 195.6 239.7V273C195.2 282.2 191.9 289.9 185.8 296.2C179.6 302.5 171.8 305.7 162.2 305.7C152.6 305.7 144.7 302.5 138.6 296.2C132.5 289.9 129.2 282.2 128.8 273V239.7C129.2 230.6 132.6 222.8 138.9 216.5C145.2 210.2 152.1 206.9 162.2 206.5C171.4 206.9 179.2 210.2 185.5 216.5H185.5zM377 216.5C383.3 222.8 386.7 230.6 387.1 239.7V273C386.7 282.2 383.4 289.9 377.3 296.2C371.2 302.5 363.3 305.7 353.7 305.7C344.1 305.7 336.3 302.5 330.1 296.2C323.1 289.9 320.7 282.2 320.4 273V239.7C320.7 230.6 324.1 222.8 330.4 216.5C336.7 210.2 344.5 206.9 353.7 206.5C362.9 206.9 370.7 210.2 377 216.5H377z"/></svg>'
        },
         link: 'https://space.bilibili.com/495322167' }
    ]
  },
  {
    avatar: '/teammate/Ленинград.jpg',
    name: 'Ленинград',
    title: '网站作者',
    desc: '为MCJPG网站提供了源码级的技术支持',
  },
  {
    avatar: '/teammate/fireguo.png',
    name: 'FireGuo',
    title: '技术支持',
    desc: '基础的技术问题解决（雾），风梨团队创始人（），状态监测与机器人负责人',
  },
]

const community = [
  {
    avatar: '/teammate/Xiaosan.jpg',
    name: 'Xiaosan',
    title: '宣传',
    desc: '曙光生电服务器腐竹，唯一开学后有很多时间的人',
  },
  {
    avatar: '/teammate/北🐟.jpg',
    name: '深',
    title: '论坛主',
    desc: '社区论坛负责人，TuTuPixel服务器腐竹',
  },
  {
    avatar: '/teammate/WERTYUS11.jpg',
    name: 'WERTYUS11',
    title: '审核兼宣传',
    desc: 'HappyDog服务器腐竹，啥都会但啥都不精通（）（）会Replay和Bcut',
  }
]

const publicise = [
  {
    avatar: '/teammate/二氧化钛.jpg',
    name: '二氧化钛',
    title: '剪辑',
    desc: 'MCIC服主',
  },
  {
    avatar: '/teammate/WERTYUS11.jpg',
    name: 'WERTYUS11',
    title: '审核兼宣传',
    desc: 'HappyDog服务器腐竹，啥都会但啥都不精通（）（）会Replay和Bcut',
  },
  {
    avatar: '/teammate/Redapple_one.png',
    name: 'Redapple_one',
    title: '封面设计兼剪辑',
    desc: 'TAC-Server服务器腐竹, 会那么一点的剪辑手法, 会用达芬奇,PR,ReplayMod,FlashBack.',
  }
]
</script>

<VPTeamPage>

  <VPTeamPageTitle>
    <template #title>我们的团队</template>
    <template #lead>认识一下 MCJPG 背后的成员，这是一个 MC服务器 技术交流与宣传组织，致力于通过更快、更安全的软件和更完善的宣传改善服务器生态</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>开发部</template>
    <template #lead>MCJPG 开发者帮助编写代码、审核成员服请求并保持项目的活力。通过贡献新社区服务和帮助完善旧服务，他们使 MCJPG 得以运行</template>
    <template #members>
      <VPTeamMembers size="small" :members="code" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>社区部</template>
    <template #lead>MCJPG 社区部门通过审核新加入的成员服，维护交流社区的秩序，以确保 MCJPG 拥有健康向上的生命力</template>
    <template #members>
      <VPTeamMembers size="small" :members="community" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>宣传部</template>
    <template #lead>MCJPG 宣传部通过对组织和成员服的宣传，来让更多的人知道我们的行动</template>
    <template #members>
      <VPTeamMembers size="small" :members="publicise" />
    </template>
  </VPTeamPageSection>

</VPTeamPage>


<center>帮助我们添加服务器的贡献者们：</center>

<center><a href="https://github.com/ZhuYuxuan9302/MCJPG/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ZhuYuxuan9302/MCJPG" alt="Contributors"/>
</a></center>

<center>对以上参与者致以敬意！</center>