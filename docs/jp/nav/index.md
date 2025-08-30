---
title: MCナビ
layoutClass: m-nav-layout
outline: [2, 3, 4]
description: MCナビサイトはMCJPG組織が提供。より便利なMinecraftナビを皆様に提供することを目指しています
---

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# Minecraftナビ

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

## リンク追加のご協力

::: tip ナビを編集するには？
[docs/nav/data.ts](https://github.com/MineJPGcraft/MCJPG/blob/main/docs/nav/data.ts) はナビのデータベースです。JSON形式に従って編集してください。  
もしあなたがサイト管理者であれば、[MCJPG組織](https://mcjpg.org/ "MCJPG組織公式サイト") をサイトの適切な位置に追加してください。[MCJPG組織](https://mcjpg.org/ "MCJPG組織公式サイト") は大変感謝します。

TIP: [JSONとは？](https://www.runoob.com/json/json-tutorial.html)
:::

::: tip アイコンの場所と使用方法

アイコンは [docs/public/icons/nav/](https://github.com/MineJPGcraft/MCJPG/tree/main/docs/public/icons/nav/) に分類済みで保存されています。分類に従って追加してください。

``` json{1}
    # これは例です。同じ形式で編集可能です
    {
        icon: '/icons/nav/百科/中文 Minecraft Wiki.ico',
        title: '中文 Minecraft Wiki',
        desc: 'Minecraftで最も有名かつ権威のある非公式百科サイト',
        link: 'https://zh.minecraft.wiki/',
    },
```
:::

## 特別謝辞

[maomao1996](https://github.com/maomao1996/) にナビスタイルモジュールの開発に感謝  
[磁鉄開発部（MDD）](https://github.com/MSCMDD "磁鉄開発部（MDD）") にナビスタイルの二次開発、内容の誤り修正およびナビ補完に感謝