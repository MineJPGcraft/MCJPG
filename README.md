**中文** | [English](./README_EN.md)

# MCJPG 服务器交流组织

这里是Minecraft服务器服务器交流组织 (MCJPG)！ 

一个致力于我的世界服务器技术交流和宣传的组织。 

[加入MCJPG社区群组](https://qm.qq.com/q/5Y4ueZdkxq) 

## 提交服务器

在提交服务器之前，请确定你的服务器满足以下要求： 

- 服务器能够正常运行，且不会在短时间内关闭。 

- 服务器已经加入 **MCJPG** 组织。 

如果你的服务器满足以上要求，请按照以下步骤提交服务器： 

1. fork 本仓库, 并 clone 到本地。 

2. 修改 `docs/.vitepress/theme/data/serverlist.ts` 的servers字段（请严格参照原先代码的缩进格式），添加

```serverlist.ts
{ 
    id: 'n+1', 
    name: '服务器名称', 
    type: '服务器种类(参考最上面的玩法分类)', 
    version: '服务器版本(参考最上面的版本分类)', 
    icon: '/server_icons/服务器图标文件', 
    description: '服务器描述', 
    link: '链接', 
    ip: '服务器IP（可选），用于显示服务器状态信息' 
  }, 
```

> 其中icon:可以修改为单个图标

> 如果你需要增加版本或玩法分类，请修改serverlist.ts的`serverTypes`和`serverVersions`字段

3. 如果你需要显示服务器图标，请在 `docs/public/server_icons/` 目录下添加图标

4. push 到你的仓库，然后提交 pull request。