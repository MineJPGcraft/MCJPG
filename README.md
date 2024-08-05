# 服务器集体宣传组织

这里是Minecraft服务器集体宣传组织 (MCJPG)！
一个致力于我的世界服务器宣传和技术交流的新兴组织。

[加入集宣社区](https://qm.qq.com/q/IYXWBvyHS0)

## 提交服务器

在提交服务器之前，请确定你的服务器满足以下要求：

- 服务器能够正常运行，且不会在短时间内关闭。
- 服务器已经加入Minecraft服务器集体宣传组织。

如果你的服务器满足以上要求，请按照以下步骤提交服务器：

1. fork 本仓库, 并 clone 到本地。
2. 修改 `docs/index.md` 的features字段，添加

``` index.md
  - icon:
      src: /server_icons/example.jpg
    title: example
    details: 版本：JAVA/JAVA互通/基岩 | example</br>example描述
    link: https://example.com（服务器官网或者是入群链接）
    linkText: example（链接名字，如“加入我们awa”）
```

>其中icon:可以修改为单个字符，也能在夜间模式和白天模式切换

例如

``` index.md
  - icon:
      dark: /dark-feature-icon.svg
      light: /light-feature-icon.svg
```

``` index.md
  - icon:
      src: /cool-feature-icon.svg
```

``` index.md
  - icon: 🛠️
```

3. (可选)如果你需要显示服务器图标，请在 `docs/public/server_icons/` 目录下添加图标
4. push 到你的仓库，然后提交 pull request。
