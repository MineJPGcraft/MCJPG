---
layout: page
title: 私たちのチーム
description: MCJPG組織チームメンバー一覧
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
    title: 'ネットワーク開発',
    desc: 'MCJPG公式サイト保守 | AIプロジェクト責任者 | MC生電サーバー管理者',
    links: [
      { icon: 'github', link: 'https://github.com/ZhuYuxuan9302' },
      { icon: {
          svg: '<svg ... />'
        },
         link: 'https://space.bilibili.com/495322167' }
    ]
  },
  {
    avatar: '/teammate/fireguo.png',
    name: 'FireGuo',
    title: '技術サポート',
    desc: '基本的な技術問題の解決（霧）| フォンリー（風梨）チーム創設者 | 状態監視とBot担当',
  },
  {
    avatar: '/teammate/gufan.jpg',
    name: '孤帆',
    title: '技術サポート',
    desc: 'Python開発',
  },
  {
    avatar: '/teammate/pingguomc.png',
    name: 'pingguomc',
    title: 'バックエンドプラグイン技術',
    desc: '紅星マイクラサーバー現任管理者 | 雑務',
  },
]

const community = [
  {
    avatar: '/teammate/Xiaosan.jpg',
    name: 'Xiaosan',
    title: 'コミュニティ管理',
    desc: '曙光生電サーバー管理者、唯一学校が始まっても時間がある人',
  },
  {
    avatar: '/teammate/WERTYUS11.jpg',
    name: 'WERTYUS11',
    title: '審査',
    desc: 'HappyDogサーバー管理者、何でもできるけど何一つ極めていない（）',
  },
  {
    avatar: '/teammate/yubaozhi.jpg',
    name: '鱼包纸',
    title: '宣伝',
    desc: '文書作業担当',
  },
  {
    avatar: '/teammate/叫我董老实-元气TaskMgr.jpg',
    name: '叫我董老实-元气TaskMgr',
    title: 'コミュニティ管理',
    desc: 'RBS生電サーバー（まだ加盟サーバーではない）管理者。国慶期間中は研修コミュニティ管理を兼任。コミュニティ管理担当。何もできないけど何一つ極めていない（）',
    links: [
      { icon: {
          svg: '<svg ... />'
        },
         link: 'https://space.bilibili.com/1655020702' }
    ]
  },
  {
    avatar: '/teammate/北尘.png',
    name: '北尘',
    title: '審査',
    desc: 'FurCraft管理者、Amethyst代理管理者'
  },
  {
    avatar: '/teammate/二氧化钛.jpg',
    name: '二氧化钛',
    title: 'コミュニティ管理',
    desc: 'MCIC管理者',
  },
  {
    avatar: '/teammate/明镜台.jpg',
    name: '明镜台',
    title: '宣伝兼デザイン',
    desc: '鏡羽スタジオ創設者',
  },
  {
    avatar: '/teammate/Redapple_one.png',
    name: 'Redapple_one',
    title: '宣伝',
    desc: 'TAC-Server管理者、少しだけ編集スキルあり。DaVinci, PR, ReplayMod, FlashBackが使える。',
  }
]

</script>

<VPTeamPage>

  <VPTeamPageTitle>
    <template #title>私たちのチーム</template>
    <template #lead>MCJPGの背後にいるメンバーを紹介します。これはMCサーバー技術交流と宣伝の組織であり、より速く安全なソフトウェアとより充実した宣伝活動によってサーバーのエコシステムを改善することに尽力しています。</template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>開発部</template>
    <template #lead>MCJPG開発者はコード作成や加盟サーバー申請の審査を行い、プロジェクトを活性化させます。新しいコミュニティサービスの提供や既存サービスの改善を通じて、MCJPGを運営しています。</template>
    <template #members>
      <VPTeamMembers size="small" :members="code" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>コミュニティ部</template>
    <template #lead>MCJPGコミュニティ部門は、新しく加入するサーバーの審査や交流コミュニティの秩序維持、組織の宣伝を担当し、MCJPGが健全で前向きな活力を持つようにします。</template>
    <template #members>
      <VPTeamMembers size="small" :members="community" />
    </template>
  </VPTeamPageSection>

</VPTeamPage>


<center>サーバー追加を手伝ってくれた貢献者の皆さん：</center>

<center><a href="https://github.com/MineJPGCraft/MCJPG/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=MineJPGCraft/MCJPG" alt="Contributors"/>
</a></center>

<center>上記の参加者に敬意を表します！</center>