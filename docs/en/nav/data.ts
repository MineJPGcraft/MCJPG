import type { NavLink } from '.../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = [
  {
    title: 'MCJPG websites',
    items: [
      {
        icon: '/logo.png',
        title: 'MCJPG组织',
        desc: 'MCJPG组织官网',
        link: 'https://mcjpg.org',
      },
      {
        icon: '/logo.png',
        title: 'MC导航',
        desc: '由MCJPG社区维护的MC导航站',
        link: 'https://mcjpg.org/nav',
      },
      {
        icon: '/logo.png',
        title: '图床',
        desc: 'MCJPG自建图床,支持5MB以下媒体分享',
        link: 'https://image.mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: 'Markdown 编辑器',
        desc: 'MCJPG部署的在线Markdown编辑器',
        link: 'https://editor.mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: 'AI 对话',
        desc: 'MCJPG的在线AI聊天网站',
        link: 'https://chat.mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: '文件分发',
        desc: 'MCJPG的文件分发服务',
        link: 'https:/fds.mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: '状态监测',
        desc: 'MCJPG各服务状态监测',
        link: 'https://status.mcjpg.org/',
      },
      {
        icon: '/logo.png',
        title: '状态监测(备用)',
        desc: 'MCJPG各服务状态监测',
        link: 'https://bstatus.mcjpg.org/',
      },
    ],
  },
  {
    title: 'Official Website',
    items: [
      {
        //icon: 'https://www.minecraft.net/content/dam/minecraftnet/franchise/logos/Homepage_Download-Launcher_Creeper-Logo_500x500.png',
        icon: '/icons/nav/MC官方网站/Minecraft官网.avif',
        title: 'Minecraft官网',
        link: 'https://www.minecraft.net/',
      },
      {
        //icon: 'https://education.minecraft.net/etc.clientlibs/minecraft-edu/clientlibs/clientlib-common/resources/images/favicon/new-apple-icon.png',
        icon: '/icons/nav/MC官方网站/教育版官网.png',
        title: '教育版官网',
        link: 'https://education.minecraft.net/',
      },
      {
        //icon: 'https://mc.163.com/favicon.ico',
        icon: '/icons/nav/MC官方网站/MC中国版官网.ico',
        title: 'MC中国版官网',
        link: 'https://mc.163.com/',
      },
      {
        //icon: 'https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/logos/Homepage_Gameplay-Trailer_MC-OV-logo_300x300.png',
        icon: '/icons/nav/MC官方网站/反馈社区.png',
        title: '反馈社区',
        desc: 'MC的官方反馈社区',
        link: 'https://feedback.minecraft.net/',
      },
      {
        //icon: 'https://toolb.cn/favicon/bugs.mojang.com',
        icon: '/icons/nav/MC官方网站/Mojang Jira.png',
        title: 'Mojang Jira',
        desc: 'MC的官方BUG反馈社区',
        link: 'https://feedback.minecraft.net/',
      },
      {
        //icon: 'https://mc.163.com/favicon.ico',
        icon: '/icons/nav/MC官方网站/网易版论坛.ico',
        title: '网易版论坛',
        desc: '中国版官方论坛',
        link: 'https://mc.netease.com/',
      },
    ],
  },
  {
    title: 'Unofficial BBS',
    items: [
      {
        //icon: 'https://media.minecraftforum.net/avatars/0/1/635356669593325566.png',
        icon: '/icons/nav/非官方论坛/Minecraft Forum.webp',
        title: 'Minecraft Forum',
        desc: '国外比较有名的非官方Minecraft论坛',
        link: 'https://www.minecraftforum.net/',
      },
      {
        //icon: 'https://www.minebbs.com/favicon.ico',
        icon: '/icons/nav/非官方论坛/MineBBS.png',
        title: 'MineBBS',
        desc: '一个国内的我的世界中文论坛，主营基岩版',
        link: 'https://www.minebbs.com/',
      },
      {
        //icon: 'https://klpbbs.com/favicon.ico',
        icon: '/icons/nav/非官方论坛/苦力怕论坛.png',
        title: '苦力怕论坛',
        desc: '国内的我的世界中文论坛，主营基岩版',
        link: 'https://klpbbs.com/',
      },
      {
        //icon: 'https://www.himcbbs.com/favicon.ico',
        icon: '/icons/nav/非官方论坛/HiMCBBS.png',
        title: 'HiMCBBS',
        desc: '国内的我的世界中文论坛，主营Java版',
        link: 'https://www.himcbbs.com/',
      },
      {
        //icon: 'https://www.bangbang93.com/favicon.ico',
        icon: '/icons/nav/非官方论坛/Bangbang93论坛.ico',
        title: 'Bangbang93论坛',
        desc: '十分著名的下载源国内镜像站——BMCLAPI',
        link: 'https://www.bangbang93.com',
      },
      {
        //icon: 'https://mcobs.fun/static/MCOBS1.png',
        icon: '/icons/nav/非官方论坛/mcobs.png',
        title: '黑曜石论坛',
        desc: '一个国内新兴的论坛，主营java版',
        link: 'https://mcobs.cn/',
      },
    ],
  },
  {
    title: 'Wiki',
    items: [
      {
        //icon: 'https://zh.minecraft.wiki/favicon.ico',
        icon: '/icons/nav/百科/中文 Minecraft Wiki.ico',
        title: '中文 Minecraft Wiki',
        desc: 'Minecraft最著名的、最权威的非官方百科网站',
        link: 'https://zh.minecraft.wiki/',
      },
      {
        //icon: 'https://www.digminecraft.com/favicon.ico',
        icon: '/icons/nav/百科/DigMinecraft.ico',
        title: 'DigMinecraft',
        desc: '一个英文MC百科网站',
        link: 'https://www.digminecraft.com/',
      },
      {
        //icon: 'https://www.mcmod.cn/favicon.ico',
        icon: '/icons/nav/百科/MC模组百科.ico',
        title: 'MC模组百科',
        desc: '国内很著名的MC模组百科网站',
        link: 'https://www.mcmod.cn/',
      },
      {
        //icon: '',
        title: 'Wiki.vg',
        desc: '一个英文的Minecraft开发文档库',
        link: 'https://wiki.vg/',
      },
      {
        //icon: 'https://mineplugin.org/images/a/a6/Mineplugin_logo_2.3.png',
        icon: '/icons/nav/百科/Minecraft 插件百科.png',
        title: 'Minecraft 插件百科',
        desc: '一个中文MC插件百科网站',
        link: 'https://mineplugin.org/',
      },
      {
        //icon: 'https://static.miraheze.org/mcpkwiki/c/c5/MCPK_logo.png',
        icon: '/icons/nav/百科/Minecraft Parkour Wiki.webp',
        title: 'Minecraft Parkour Wiki',
        desc: '记录MC跑酷知识以及玩家运动机制的 wiki',
        link: 'https://www.mcpk.wiki/wiki/Main_Page/zh',
      },
      {
        //icon: 'https://yizhan.wiki/NitWikit/img/book.png',
        icon: '/icons/nav/百科/笨蛋 MC 开服教程.png',
        title: '笨蛋 MC 开服教程',
        desc: 'MC开服教程',
        link: 'https://yizhan.wiki/NitWikit/',
      },
    ],
  },
  {
    title: 'Bedrock DEV Docs',
    items: [
      {
        //icon: 'https://wiki.mcbe-dev.net/w/images/f/f0/Wiki.svg',
        icon: '/icons/nav/基岩版开发文档/MC基岩版开发Wiki.svg',
        title: 'MC基岩版开发Wiki',
        link: 'https://wiki.mcbe-dev.net/',
      },
      {
        //icon: 'https://wiki.bedrock.dev/assets/images/homepage/wikilogo.png',
        icon: '/icons/nav/基岩版开发文档/Bedrock Wik.png',
        title: 'Bedrock Wik',
        link: 'https://wiki.bedrock.dev',
      },
      {
        //icon: 'https://github.com/destruc7i0n/bedrock-dot-dev/blob/master/public/favicon/apple-touch-icon.png?raw=true',
        icon: '/icons/nav/基岩版开发文档/bedrock.dev.png',
        title: 'bedrock.dev',
        link: 'https://bedrock.dev/',
      },
      {
        //icon: 'https://www.microsoft.com/favicon.ico?v2',
        icon: '/icons/nav/基岩版开发文档/MCBE 官方创作者文档.ico',
        title: 'MCBE 官方创作者文档',
        desc: '微软官方MCBE创作者文档',
        link: 'https://learn.microsoft.com/zh-cn/minecraft/creator/?view=minecraft-bedrock-stable',
      },

    ],
  },
  {
    title: 'Resource Website',
    items: [
      {
        //icon: 'https://mcversions.net/favicon.ico',
        icon: '/icons/nav/资源站/MCVersions.ico',
        title: 'MCVersions',
        desc: 'Java版各版本jar下载',
        link: 'https://mcversions.net/',
      },
      {
        //icon: 'https://bbk.endyun.ltd/favicon.ico',
        icon: '/icons/nav/资源站/Minecraft for Android 版本库.ico',
        title: 'Minecraft for Android 版本库',
        desc: '安卓基岩版下载',
        link: 'https://bbk.endyun.ltd/',
      },
      {
        //icon: 'https://images.mcappx.com/logo/favicon.ico',
        icon: '/icons/nav/资源站/Minecraft for Windows 版本库.ico',
        title: 'Minecraft for Windows 版本库',
        desc: 'PC基岩版下载',
        link: 'https://www.mcappx.com/',
      },
      {
        //icon: 'https://www.fastmirror.net/favicon.ico',
        icon: '/icons/nav/资源站/无极镜像.ico',
        title: 'FastMirror 无极镜像',
        desc: '快速下载多种MC服务端核心',
        link: 'https://www.fastmirror.net/#/home',
      },
      {
        //icon: 'https://www.curseforge.com/favicon.ico',
        icon: '/icons/nav/资源站/CurseForge.ico',
        title: 'CurseForge',
        desc: '老牌MC资源站',
        link: 'https://www.curseforge.com/minecraft',
      },
      {
        //icon: 'https://modrinth.com/favicon.ico',
        icon: '/icons/nav/资源站/Modrinth.ico',
        title: 'Modrinth',
        desc: '一个新兴的Minecraft第三方资源站',
        link: 'https://modrinth.com',
      },
      {
        //icon: 'https://www.planetminecraft.com/favicon.ico',
        icon: '/icons/nav/资源站/PlanetMinecraft.ico',
        title: 'PlanetMinecraft',
        desc: '一个比较著名的Minecraft资源网站',
        link: 'https://www.planetminecraft.com/',
      },
      {
        //icon: 'https://www.spigotmc.org/favicon.ico',
        icon: '/icons/nav/资源站/SpigotMc.ico',
        title: 'SpigotMc',
        desc: 'SpigotMc的资源板块,有许多插件',
        link: 'https://www.spigotmc.org/resources/',
      },
      {
        //icon: 'https://hangar.papermc.io/_nuxt/hangar-logo.DNKyJEtq.svg',
        icon: '/icons/nav/资源站/Hanger.svg',
        title: 'Hanger',
        desc: 'papermc提供的插件站',
        link: 'https://hangar.papermc.io/',
      },
      {
        //icon: 'https://spongepowered.org/favicon.ico',
        icon: '/icons/nav/资源站/Sponge Ore.ico',
        title: 'Sponge Ore',
        desc: '一个Sponge服务端插件的下载站',
        link: 'https://ore.spongepowered.org/',
      },
      {
        //icon: 'https://mcpedl.com/favicon.ico',
        icon: '/icons/nav/资源站/MCPEDL.ico',
        title: 'MCPEDL',
        desc: '一个MC基岩版的专门资源网站',
        link: 'https://mcpedl.com/',
      },
      {
        //icon: 'https://www.minecraftyard.com/favicon.ico',
        icon: '/icons/nav/资源站/MinecraftYard.ico',
        title: 'MinecraftYard',
        desc: '收录了Java版的一些资源',
        link: 'https://www.minecraftyard.com/',
      },
      {
        //icon: 'https://www.minecraftmods.com/favicon.ico',
        icon: '/icons/nav/资源站/Minecraft Mods.ico',
        title: 'Minecraft Mods',
        desc: '收录了一些Java版的模组资源',
        link: 'https://www.minecraftmods.com/',
      },
      {
        //icon: 'https://www.minecraftmaps.com/favicon.ico',
        icon: '/icons/nav/资源站/Minecraft Maps.ico',
        title: 'Minecraft Maps',
        desc: '一个MC游戏地图的专门资源网站',
        link: 'https://www.minecraftmaps.com/',
      },
      {
        //icon: 'https://minecraftshader.com/wp-content/uploads/2023/09/sun-favicon-e1695481883503.png',
        icon: '/icons/nav/资源站/Minecraft Shaders.avif',
        title: 'Minecraft Shaders',
        desc: '提供MC的光影包和资源包资源',
        link: 'https://minecraftshader.com/',
      },
      {
        //icon: 'https://resourcepack.net/wp-content/themes/rp/assets/images/ico-diamond.png',
        icon: '/icons/nav/资源站/Resourse Packs for Minecraft.png',
        title: 'Resourse Packs for Minecraft',
        desc: '主要提供MC的各种资源包资源',
        link: 'https://resourcepack.net/',
      },
      {
        //icon: 'https://littleskin.cn/favicon.png',
        icon: '/icons/nav/资源站/LittleSkin.png',
        title: 'LittleSkin',
        desc: '国内老牌MC皮肤站',
        link: 'https://littleskin.cn/',
      },
      {
        //icon: 'https://www.minecraftskins.com/favicon.ico',
        icon: '/icons/nav/资源站/Minecraft Skins.ico',
        title: 'Minecraft Skins',
        desc: '一个英文的MC皮肤资源网站',
        link: 'https://www.minecraftskins.com/',
      },
      {
        //icon: 'https://mskins.net/favicon.ico',
        icon: '/icons/nav/资源站/MSkins.ico',
        title: 'MSkins',
        desc: '一个英文的MC皮肤资源网站',
        link: 'https://mskins.net/',
      },
      {
        //icon: 'https://www.minecraft-schematics.com/favicon.ico',
        icon: '/icons/nav/资源站/Minecraft Schematics.ico',
        title: 'Minecraft Schematics',
        desc: '一个英文的MC投影资源网站',
        link: 'https://www.minecraft-schematics.com/',
      },
      {
        icon: '/icons/nav/资源站/Minecraft_Sounds.webp',
        title: 'Minecraft Sounds',
        desc: '一个国内MC音效下载网站',
        link: 'https://o.xbottle.top/mcsounds/',
      },
    ],
  },
  {
    title: 'Server Gateway',
    items: [
      {
        icon: '/logo.png',
        title: 'MCJPG组织',
        desc: 'MCJPG组织官网',
        link: 'https://mcjpg.org',
      },
      {
        icon: '/icons/nav/服务器门户/MSCPO.webp',
        title: 'MSCPO',
        desc: '一个服务器集体宣传组织',
        link: 'https://mscpo.top/',
      },
      {
        //icon: 'https://toolb.cn/favicon/minecraftservers.org',
        icon: '/icons/nav/服务器门户/Minecraft Servers.png',
        title: 'Minecraft Servers',
        desc: '国外比较著名的服务器资源网站',
        link: 'https://minecraftservers.org/',
      },
      {
        //icon: 'https://minecraft-mp.com/favicon.ico',
        icon: '/icons/nav/服务器门户/Minecraft Multiplayer.ico',
        title: 'Minecraft Multiplayer',
        desc: '国外比较著名的服务器资源网站',
        link: 'https://minecraft-mp.com/',
      },
      {
        //icon: 'https://www.mclists.cn/template/images/favicon.ico',
        icon: '/icons/nav/服务器门户/我的世界找服网.ico',
        title: '我的世界找服网',
        desc: '一个国内的服务器资源网站',
        link: 'https://www.mczfw.cn/',
      },
      {
        //icon: 'https://cdn.mczfw.cn/images/logo.png',
        icon: '/icons/nav/服务器门户/Minecraft服务器列表.png',
        title: 'Minecraft服务器列表',
        desc: '一个国内的服务器资源网站',
        link: 'https://www.mczfw.cn/',
      },
      {
        //icon: 'https://www.mcmod.cn/favicon.ico',
        icon: '/icons/nav/服务器门户/MCMOD服务器列表.ico',
        title: 'MCMOD服务器列表',
        desc: 'MCMOD服务器板块',
        link: 'https://play.mcmod.cn/',
      },
    ],
  },
  {
    title: 'Functional website',
    items: [
      {
        //icon: 'https://www.chunkbase.com/favicon.ico',
        icon: '/icons/nav/功能性网站/Chunk Base.ico',
        title: 'Chunk Base',
        desc: '种子查询器、区块查询器等工具网站',
        link: 'https://www.chunkbase.com/',
      },
      {
        //icon: 'http://mcid.lingningyu.cn/webIcon_mcid.png',
        icon: '/icons/nav/功能性网站/MCID.png',
        title: 'MCID',
        desc: '物品ID查询网站',
        link: 'http://mcid.lingningyu.cn/',
      },
      {
        //icon: 'https://minecraft.tools/favicon.ico',
        icon: '/icons/nav/功能性网站/Minecraft Tools.ico',
        title: 'Minecraft Tools',
        desc: '提供各种自定义等工具',
        link: 'https://minecraft.tools/',
      },
      {
        //icon: 'https://mctools.org/img/icon.png',
        icon: '/icons/nav/功能性网站/Minecraft Server Tools.png',
        title: 'Minecraft Server Tools',
        desc: '提供各种自定义服务器的工具',
        link: 'https://mctools.org/',
      },
      {
        //icon: 'https://mcsrvstat.us/img/minecraft.png',
        icon: '/icons/nav/功能性网站/Minecraft Server Status.png',
        title: 'Minecraft Server Status',
        desc: '网页MC服务器状态检测',
        link: 'https://mcsrvstat.us/',
      },
      {
        //icon: 'https://mcstatus.io/favicon.ico',
        icon: '/icons/nav/功能性网站/MCS.ico',
        title: 'MCS',
        desc: '网页MC服务器状态检测',
        link: 'https://mcstatus.io/',
      },
      {
        //icon: 'https://mclo.gs/img/favicon.ico',
        icon: '/icons/nav/功能性网站/mclo.gs.ico',
        title: 'mclo.gs',
        desc: 'MC服务器日志分析',
        link: 'https://mclo.gs/',
      },
      {
        //icon: 'https://redenmc.com/reden_256.png',
        icon: '/icons/nav/功能性网站/Reden.png',
        title: 'Reden',
        desc: '世吞等投影文件在线生成',
        link: 'https://redenmc.com/',
      },
      {
        //icon: 'https://rebane2001.com/mapartcraft/images/favicon.ico',
        icon: '/icons/nav/功能性网站/MapartCraft.ico',
        title: 'MapartCraft',
        desc: 'MC像素画生成器,支持投影',
        link: 'https://rebane2001.com/mapartcraft/zh-Hans',
      },
      {
        //icon: 'https://www.minecraftpfp.com/PFP/I_Like_Cats__.png',
        icon: '/icons/nav/功能性网站/Minecraft PFP.png',
        title: 'Minecraft PFP',
        desc: '根据正版账号皮肤生成头像',
        link: 'https://www.minecraftpfp.com/',
      },
      {
        //icon: 'https://www.gamergeeks.net/favicon.ico',
        icon: '/icons/nav/功能性网站/GAMEGEEKS.ico',
        title: 'GAMEGEEKS',
        desc: '网页MC指令生成',
        link: 'https://www.gamergeeks.net/',
      },
      {
        //icon: 'https://wallpapers.novaskin.me/apple-touch-icon.png',
        icon: '/icons/nav/功能性网站/Nova Skin.png',
        title: 'Nova Skin',
        desc: '网页MC皮肤站,可以制作、上传皮肤和下载皮肤的壁纸',
        link: 'https://minecraft.novaskin.me/',
      },
      {
        //icon: 'https://skin.endyun.ltd/img/favicon.ico',
        icon: '/icons/nav/功能性网站/MC-3D皮肤预览.ico',
        title: 'MC-3D皮肤预览',
        desc: 'MC皮肤查询、3D预览',
        link: 'https://skin.endyun.ltd/',
      },
      {
        //icon: 'https://textcraft.net/favicon.ico',
        icon: '/icons/nav/功能性网站/Textcraft.ico',
        title: 'Textcraft',
        desc: '生成MC风格的各种艺术字',
        link: 'https://textcraft.net/',
      },
      {
        //icon: 'https://chunker.app/favicon.png',
        icon: '/icons/nav/功能性网站/Chunker.png',
        title: 'Chunker',
        desc: '在线MC跨版本地图转换器,支持JE和BE互转',
        link: 'https://chunker.app/',
      },
      {
        //icon: 'https://minecraft-heads.com/themes/mch-v2/assets/images/chest.webp',
        icon: '/icons/nav/功能性网站/Minecraft Heads.webp',
        title: 'Minecraft Heads',
        desc: '收集了大量MC装饰性头颅 ',
        link: 'https://www.minecraft-heads.com/',
      },
      {
        //icon: 'https://minecraftshapes.com/favicon.ico',
        icon: '/icons/nav/功能性网站/Minecraft Shapes.ico',
        title: 'Minecraft Shapes',
        desc: '指导在MC搭建规范的图形',
        link: 'https://minecraftshapes.com/',
      },
      {
        //icon: 'https://zh-cn.namemc.com/favicon.ico',
        icon: '/icons/nav/功能性网站/NameMC.ico',
        title: 'NameMC',
        desc: '查询正版玩家皮肤、名称、皮肤、UUID等信息',
        link: 'https://zh-cn.namemc.com/',
      },
      {
        //icon: 'https://mcuuid.net/favicon.ico',
        icon: '/icons/nav/功能性网站/Minecraft UUID.ico',
        title: 'Minecraft UUID',
        desc: '查询正版玩家的UUID等信息',
        link: 'https://mcuuid.net/',
      },
    ],
  },
  {
    title: 'Mod and Shadow Loader',
    items: [
      {
        //icon: 'https://forums.minecraftforge.net/favicon.ico',
        icon: '/icons/nav/模组和光影加载器/Forge.ico',
        title: 'Forge',
        desc: '老牌模组加载器官网',
        link: 'https://forums.minecraftforge.net/',
      },
      {
        //icon: 'https://neoforged.net/favicon.ico',
        icon: '/icons/nav/模组和光影加载器/NeoForge.ico',
        title: 'NeoForge',
        desc: 'Forge在高版本的更佳分支',
        link: 'https://neoforged.net/',
      },
      {
        //icon: 'https://fabricmc.net/assets/logo.png',
        icon: '/icons/nav/模组和光影加载器/Fabric.png',
        title: 'Fabric',
        desc: '新兴热门模组加载器',
        link: 'https://fabricmc.net/',
      },
      {
        //icon: 'https://quiltmc.org/favicon/favicon-32x32.png',
        icon: '/icons/nav/模组和光影加载器/Quilt.webp',
        title: 'Quilt',
        desc: 'Fabric下游分支',
        link: 'https://quiltmc.org/en/',
      },
      {
        //icon: 'https://www.liteloader.com/favicon.ico',
        icon: '/icons/nav/模组和光影加载器/LiteLoader.ico',
        title: 'LiteLoader',
        desc: '轻量级模组加载器,较久没更新',
        link: 'http://www.liteloader.com/',
      },
      {
        //icon: 'https://www.optifine.net/favicon.ico',
        icon: '/icons/nav/模组和光影加载器/Optifine.ico',
        title: 'Optifine',
        desc: '老牌渲染优化模组高清修复,也可作为光影加载器',
        link: 'https://www.optifine.net',
      },
      {
        //icon: 'https://cdn.modrinth.com/data/YL57xq9U/dc558eece920db435f9823ce86de0c4cde89800b.png',
        icon: '/icons/nav/模组和光影加载器/Iris Shaders.webp',
        title: 'Iris Shaders',
        desc: '通过Fabric驱动的Java版高版本光影加载器,与钠兼容',
        link: 'https://irisshaders.net/',
      },
    ],
  },
  {
    title: 'Luncher and Client',
    items: [
      {
        //icon: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/Launcher_Icon.png',
        icon: '/icons/nav/启动器和客户端/Minecraft 官方启动器.avif',
        title: 'Minecraft 官方启动器',
        desc: 'MC官方启动器',
        link: 'https://www.minecraft.net/zh-hans/download',
      },
      {
        //icon: 'https://hmcl.huangyuhui.net/favicon.ico',
        icon: '/icons/nav/启动器和客户端/HMCL.ico',
        title: 'HMCL',
        desc: '经典老牌启动器,跨平台',
        link: 'https://hmcl.huangyuhui.net/',
      },
      {
        //icon: '/icons/PCL2.png',
        icon: '/icons/nav/启动器和客户端/PCL2.png',
        title: 'PCL2',
        desc: '新兴启动器,适于新手',
        link: 'https://afdian.com/p/0164034c016c11ebafcb52540025c377',

      },
      {
        //icon: 'https://www.bakaxl.com/favicon.ico',
        icon: '/icons/nav/启动器和客户端/BakaXL.ico',
        title: 'BakaXL',
        desc: '国产二次元启动器.界面美观',
        link: 'https://www.bakaxl.com/',
      },
      {
        //icon: 'https://multimc.org/favicon.ico',
        icon: '/icons/nav/启动器和客户端/MultiMC.ico',
        title: 'MultiMC',
        desc: '国外老牌启动器,支持中文',
        link: 'https://multimc.org/',
      },
      {
        //icon: 'https://mc.163.com/favicon.ico',
        icon: '/icons/nav/启动器和客户端/中国版启动器.ico',
        title: '中国版启动器',
        desc: '中国版官网',
        link: 'https://mc.163.com/',
      },
      {
        //icon: 'https://www.lunarclient.com/assets/img/favicon.ico',
        icon: '/icons/nav/启动器和客户端/Lunar Client.ico',
        title: 'Lunar Client',
        desc: '热门PVP客户端',
        link: 'https://www.lunarclient.com/',
      },
      {
        //icon: 'https://assets.badlion.net/site/favicon.webp',
        icon: '/icons/nav/启动器和客户端/Badlion Client.webp',
        title: 'Badlion Client',
        desc: '热门PVP客户端',
        link: 'https://client.badlion.net/zh-CN',
      },
      {
        //icon: 'https://labymod.net/page/tpl/assets/images/icons/favicon.ico',
        icon: '/icons/nav/启动器和客户端/Labymod.ico',
        title: 'Labymod',
        desc: '热门PVP客户端',
        link: 'https://labymod.net/zh_Hans',
      },
      {
        //icon: 'https://feathermc.com/favicon/apple-touch-icon.png',
        icon: '/icons/nav/启动器和客户端/FEATHER CLIENT.png',
        title: 'FEATHER CLIENT',
        desc: '热门PVP客户端',
        link: 'https://feathermc.com/',
      },
    ],
  },
  {
    title: 'Practical Software',
    items: [
      {
        icon: '/icons/nav/实用软件/EaglerCraft.webp',
        title: 'EaglerCraftX',
        desc: '网页版MC 版本JE1.8.8',
        link: 'https://eaglercraft.ru/',
      },
      {
        //icon: 'https://mccteam.github.io/icons/favicon-32x32.png',
        icon: '/icons/nav/实用软件/MCC.png',
        title: 'MCC',
        desc: 'MC命令行客户端',
        link: 'https://mccteam.github.io/l10n/zh-Hans/',
      },
      {
        //icon: '/icons/MCA.png',
        icon: '/icons/nav/实用软件/MCA Selector.png',
        title: 'MCA Selector',
        desc: 'MC区块选择器,方便编辑区块,支持中文',
        link: 'https://github.com/Querz/mcaselector',
      },
      {
        //icon: 'https://www.worldpainter.net/favicon.ico',
        icon: '/icons/nav/实用软件/WorldPainter.ico',
        title: 'WorldPainter',
        desc: 'MC地形制作软件',
        link: 'https://www.worldpainter.net/',
      },
      {
        //icon: 'https://www.radmin.com/favicon.svg',
        icon: '/icons/nav/实用软件/Radmin LAN.svg',
        title: 'Radmin LAN',
        desc: '虚拟局域网软件,可用于联机',
        link: 'https://www.radmin.com/cn/',
      },
      {
        //icon: 'https://www.mineimator.com/images/logo.png',
        icon: '/icons/nav/实用软件/Mine-imator.png',
        title: 'Mine-imator',
        desc: 'MC动画制作软件',
        link: 'https://www.mineimator.com/',
      },
      {
        //icon: 'https://mcreator.net/themes/mcreator/favicon.ico',
        icon: '/icons/nav/实用软件/MCreator.ico',
        title: 'MCreator',
        desc: '可视化MC模组制作软件',
        link: 'https://mcreator.net/',
      },
      {
        //icon: 'https://www.blockbench.net/favicon.svg',
        icon: '/icons/nav/实用软件/BlockBench.svg',
        title: 'BlockBench',
        desc: 'MC建模软件',
        link: 'https://www.blockbench.net/',
      },
      {
        //icon: 'https://serverpackcreator.de/icons/favicon-128x128.png',
        icon: '/icons/nav/实用软件/ServerPackCreator.png',
        title: 'ServerPackCreator',
        desc: '生成模组端服务器核心',
        link: 'https://serverpackcreator.de/#/',
      },
    ],
  },
]
