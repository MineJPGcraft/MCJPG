export interface MinecraftServer {
  id: string
  name: string
  type: string
  version: string
  icon: string | {
    src: string
    alt?: string
    width?: number
    height?: number
  }
  description: string
  link: string
  ip?: string
}
  
  export const serverTypes = ['生存', '生电','创造', '模组', '小游戏','群组服','无政府']
  export const serverVersions = ['互通','基岩版','1.21.X','1.21.4','1.21.3','1.21.1','1.21','1.20.4','1.20.1', '1.18.2', '1.16.5']

  export const servers: MinecraftServer[] = [
    {
      id: '1',
      name: 'MC生电服',
      type: '生电',
      version: '互通',
      icon: '/server_icons/MC生电服.jpg',
      description: '兼容JE1.9~1.21.1和最新BE 游戏内语音聊天 随意喷涂 趣味的生电 便捷的菜单操作 不限制传送 独家优化的整合包 无需正版',
      link: 'https://qm.qq.com/q/QhfzwbV82Y',
      ip: 'mc.zhuyuxuan.link'
    },
    {
      id: '2',
      name: '二氧化硅生存服务器',
      type: '生存',
      version: '互通',
      icon: '/server_icons/SiO2 SMP.png',
      description: '高版本互通群组服，QQ群902147486。一服为版本1.21-1.21.1的原版生电服，离线可进，规则完善，需要白名单。二服为版本1.21.4的原版生存服，不支持生电，有tpa,箱子锁，领地，商店等插件，无需白名单，欢迎加入！',
      link: 'https://mcsio2.cn'
    },
    {
      id: '3',
      name: 'MCRW',
      type: '生电',
      version: '基岩版',
      icon: '/server_icons/MCRW.png',
      description: '服务器群：971422762 服务器装载的插件有USF无名氏插件、飞行插件、领地插件等 飞行开启方式：输入/fly即可 服务器配置低，人多的时候尽量不要过度跑图',
      link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=6KRND0sSxtuSyKXvMLPJRk2jcw30tlee&authKey=6Qbcuj%2BiemjLVwKS2wczNUg0cAffX8C%2BK%2BDb%2FdcUWEsfnLmUkZaf8N%2FukjYMkyc%2B&noverify=0&group_code=971422762'
    },
    {
      id: '4',
      name: 'BugCraft',
      type: '生存',
      version: '互通',
      icon: '/server_icons/BugCraft.png',
      description: '一个 Java 和基岩互通生存服务器（基于 1.21.1），推荐 Java 版本 1.18.2 - 1.21.1，基岩版 1.21.30 无需正版登录，仅基本粘液科技插件。',
      link: 'https://bugcraft.org/docs/bugcraft/mcjpg'
    },
    {
      id: '5',
      name: '风河 | WindyRiver',
      type: '生存',
      version: '1.21',
      icon: '/server_icons/WindyRiver.png',
      description: '欢迎来到风河，一个大型综合性服务器！ 玩法包括【生存|天坑乱斗|游艺街(小游戏合集)】 公会 生电 粘液科技 养老 语音聊天 资源维度 结婚 通行证 PVP 小游戏 放在家中的高性能永久物理服务器，i9-14900K+64G内存，为玩家的游玩体验保驾护航。 事不宜迟，快来加入风河吧~',
      link: 'https://qm.qq.com/q/VvtGhFSfkI'
    },
    {
      id: '6',
      name: 'RedStarMC',
      type: '生存',
      version: '1.21',
      icon: '/server_icons/Unknown.png',
      description: '版本：JAVA 1.7-1.21 粘液科技与插件生存',
      link: 'https://www.redstarmc.top'
    },
    {
      id: '7',
      name: 'HappyDog',
      type: '生存',
      version: '互通',
      icon: '/server_icons/HappyDog.jpg',
      description: 'HappyDog新服开荒！无正版无白名单，快来一键进服玩耍！快来和小伙伴占山为王吧！',
      link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=XMDbSMq5gMVGTESYHiBOQB80SoYJA7U4&authKey=qRhuSkFIxpfQc9CYs4MnfidRNI2cOcrT1HqoJbVV7%2BujhsywsYPx8Kv0NzuCitxd&noverify=0&group_code=192088919'
    },
    {
      id: '8',
      name: 'MCIC',
      type: '生存',
      version: '1.21',
      icon: '/server_icons/MCIC.jpg',
      description: '版本：JE 1.16.x-1.20.2 *Unknown**无线电静默*成分复杂的服务器',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=-IlME68JyiIobA7kc0K1ZtYq4bYuyrUj&authKey=AfOWKLmhMS666hgDeOW0Su3Oecq7WAfzOgDHhH8Zkpi5Anq9qWiQm6Vq7C9mcCcY&noverify=0&group_code=821501867',
      ip: '9666.fun:10482'
    },
    {
      id: '9',
      name: 'Better on Bedrock',
      type: '生存',
      version: '基岩',
      icon: '/server_icons/BetteronBedrock.png',
      description: '兼容BE高版本 新生存服开荒中',
      link: 'https://qun.qq.com/universal-share/share?ac=1&authKey=TgLN3upBU0%2FnB6DP%2FQ25hzA%2BlpqB4tRGYjboc1Klnr18ZfVpPGvpkUJrEdDuhj8B&busi_data=eyJncm91cENvZGUiOiIxMDQxNzg3Njc5IiwidG9rZW4iOiJwbUp5eFY2dkhaYm9SSThQdThpN0tJQUh1bU54cVVhaEFMSHQrYmxjdnhSYmJaQlNIbGFiS0FHMkhTclZselJDIiwidWluIjoiMTY1MTE1NTMyOCJ9&data=4SbAn3ttzBBHunIG2YM4H249kTS3ZP0sZ_pqAhrH_6GV5GKTqNieeh_gtNGY4HqeUwnpX8OkKrA7SZuBtQmfCA&svctype=4&tempid=h5_group_info'
    },
    {
      id: '10',
      name: '2B2T.LTD原版生存',
      type: '无政府',
      version: '1.21.4',
      icon: '/server_icons/2B2T.png',
      description: '死亡标记 反作弊 支持非正版玩家 支持离线玩家使用皮肤 支持坐下躺下趴下',
      link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=ZUlCu0t20rtzXQ-VFq4rGnu-NPfqC05c&authKey=ET6TmNsod93ySdq861YNZytyu5XKom0FskLAvYhFRe%2B5ZRx%2F3%2BOLjuVISVKRgkjV&noverify=0&group_code=940028915'
    },
    {
      id: '11',
      name: 'mcdogserver',
      type: '生电',
      version: '1.21',
      icon: '/server_icons/mcdogserver.jpg',
      description: '兼容1.9~1.21 无需正版 玩家间互相传送 生电',
      link: 'https://www.mcdogserver.top'
    },
    {
      id: '12',
      name: 'EternalStar (永恒星)',
      type: '群组服',
      version: '1.20.4',
      icon: '/server_icons/EternalStar.png',
      description: '群组服（纯净生存 + 小游戏 + 容易爆炸的RPG） EternalStar旨在给玩家更好的游戏体验，即使我们曾经遇到过无数困难，但我们没有就此离去 EternalStar欢迎您！',
      link: 'https://eternalstarmc.com/'
    },
    {
      id: '13',
      name: '繁星游戏堡FGC',
      type: '生电',
      version: '1.21',
      icon: '/server_icons/繁星游戏堡FGCserver.png',
      description: '不互通 正版白名单 需审核 由多位中学生共同建立的完美世界——一个生电服务器。 我们内置了游戏内语音以及生电模组。需要正版。 一审进群，二审进服。（题很简单的啦）',
      link: 'https://www.bilibili.com/video/BV19pYReHEZ9'
    },
    {
      id: '14',
      name: '星梦桃源',
      type: '生存',
      version: '1.21.1',
      icon: '/server_icons/星梦桃源.png',
      description: '版本：JE1.12~1.21.1（基岩java互通） 专注于生存、生电、红石与建筑的原版插件服务器。 ps：需进入审核群审核成功方可进入。',
      link: 'https://xingmengtaoyuan.zeabur.app/',
      ip: 'fizmc.icu:25565'
    },
    {
      id: '15',
      name: 'Play Chess Club(PCC)',
      type: '生存',
      version: '互通',
      icon: '/server_icons/pcc.webp',
      description: '版本：1.21.x（基岩java互通）  欢迎来到PlayChessClub，一个温馨和谐的公益服务器。无论您是寻找稳定流畅的游戏体验，还是希望在友好的社区中结交新朋友，PCC都能足您的需求。从一周目到三周目，PCC一直致力于提供优质的生存以及特色玩法。诚邀您的加入！ 点击后进入官网加入服务器！',
      link: 'https://www.mcpcc.fun'
    },
    {
      id: '16',
      name: '喵星乐园',
      type: '生存',
      version: '1.21.4',
      icon: '/server_icons/喵星乐园.jpg',
      description: '支持离线登录  插件半生存养老服  "探索梦幻宇宙，邂逅喵星奇缘！欢迎踏入喵星乐园服务器——一个插件生存世界。 喵星乐园，不仅是心灵的温馨港湾。与来自五湖四海的朋友相遇，共建和谐社区，分享喜乐与硕果。在这里，每一天都充满惊喜，每一次天都有奇妙的旅程。 加入我们，成为喵星乐园的成员，守护这份净土与美好，让爱与梦想在喵星乐园里绽放光彩！',
      link: 'https://play.meowland.icu'
    },
    {
      id: '17',
      name: 'MLX落雪',
      type: '生存',
      version: '1.21.1',
      icon: '/server_icons/MLX.png',
      description: '这是一个纯生存java版服务器。然后？没了，嗯，没了。（你干嘛哎呦！）',
      link: 'https://www.wslst.xyz/'
    },
    {
      id: '18',
      name: 'FreeWind',
      type: '生存',
      version: '互通',
      icon: '/server_icons/自由之风.png',
      description: '版本1.7-1.2X.X   3c3u(无规则/管理)互通 非周目制  探索未知，创造无限---欢迎来到自由之风服务器，一个充满创新与冒险的虚拟世界。 加入我们，释放您的创造力，与玩家一起，共同打造一个独一无二的游戏世界。自由之风，等待您的加入',
      link: 'https://qm.qq.com/q/q51dtS4Kty',
      ip: '3c3u.icu'
    },
    {
      id: '19',
      name: 'NPL无界玩家',
      type: '生电',
      version: '1.21',
      icon: '/server_icons/NPL.jpg',
      description: 'NPL是一个新生的生电服务器，在这里你可以进行体验到较为轻松的生存技术玩法。 我们致力于打造一个忠于原版的生电社区，玩家之间可以愉快交流。服务器基于fabric+mcdr进行搭建，目前有一套比较完善的后勤系统，游戏内无op杜绝一切作弊，加入我们体验原汁原味的生电玩法',
      link: 'https://qm.qq.com/q/elgE8HFeSI'
    },
    {
      id: '20',
      name: 'Badboys Network',
      type: '小游戏',
      version: '1.21',
      icon: '/server_icons/Badboys Network.png',
      description: '版本JE1.8 - 1.21 类商业服 无正版验证 2021年一群中学生开始的服务器。历经多次迭代，这是最后一次的展演。 多样的小游戏，完善的反作弊',
      link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=AbM_6vwGmhmkT1nFLtPDbVeHW_cWJUH7&authKey=P20w%2FQTDHM6uFgn%2F%2Ftsz%2FRFil7Q9TwOESMEFpkmnXeb81WIi67M7kLU1JhvZxcEx&noverify=0&group_code=373311963'
    },
    {
      id: '21',
      name: '破土豆服务器',
      type: '生存',
      version: '互通',
      icon: '/server_icons/破土豆服务器.jpg',
      description: '版本JE1.20.4 跨版本 兼容BE 反作弊  本服为公益服，不只接受无条件赞助，任何玩家都是平等的，让玩家享受最公平的游戏环境 群号：962534612',
      link: 'http://gw.3114514.xyz/'
    },
    {
      id: '22',
      name: '方块风云国战服',
      type: '国战',
      version: '基岩版',
      icon: '/server_icons/方块风云国战服.jpg',
      description: '这个星球上，有的地方“朱门酒肉臭，路有冻死骨”，有的地方“受命于天，既寿永昌”，有的地方“把生命献给人民解放的事业”，有的地方“以阶级斗争为纲”......但这些地方的人们都有一个共同的梦想:富强。 危机四伏的世界里，如何脱颖而出，成为世界之巅？ 诚邀广大国际版玩家加入《方块风云2》我的世界基岩版国战模拟服务器的大家庭。 听歌｜货币｜签到｜装备品质｜精英怪｜菜单｜反作弊｜头衔｜国战｜世界地图｜...',
      link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=iUbRw1cvX38Nmsee6JETCZzVGNSeDzC2&authKey=DIFPEi9ubzyma%2BeET59Du7cfc%2BSCnUZMlMxorEgH1MYtPwEkd1b%2BeKRBzSpij%2Fcp&noverify=0&group_code=979459083'
    },
    {
      id: '23',
      name: 'Thome Server',
      type: '生电',
      version: '1.21',
      icon: '/server_icons/Thome Server.jpg',
      description: '一群热爱生电的人所创建的服务器，版本Java1.21，游戏内可以听music，腐竹是个超级面包人，群内提供整合包（持续更新） 有较为严格的规则，但是腐竹非常喜欢抽象。 目前不需要审核，严禁作弊（你赞助了我可以稍微放宽一些）。服内装有权限组mod，具体规则看腐竹心情定。',
      link: 'http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=fmnIu20oFFCPREG0zz5guy-dM8r84XwI&authKey=afN7Q6f50w1MBFMZH8V8BaCBh9xLqdeBo6f7torNhv8TrVNTQet%2BOnJKbAF%2FPh%2BX&noverify=0&group_code=862770191'
    },
    {
      id: '24',
      name: 'Craft233',
      type: '生存',
      version: '互通',
      icon: '/server_icons/Craft233.png',
      description: '高版本生存服务器，不限制红石与机器，拥有原版粘液生存和单方块生存，支持正版/LittleSkin/基岩版登陆，不限制客户端原版可进。全新周目等待你的探索，欢迎加入我们！',
      link: 'https://www.craft233.top',
      ip: 'mc.craft233.top'
    },
    {
      id: '25',
      name: '🍵TACS/茶水晶服务器🍵',
      type: '生电',
      version: '1.21.3',
      icon: '/server_icons/TACS_茶水晶服务器.svg',
      description: '无须审核 支持正版/皮肤站登录 不管你是摸鱼的 搞生电的 搞建筑的 来交流的 来学习的 都可以加入我们 服务器为i5-13600KF+32G运存 加群后您方可加入服务器',
      link: 'https://tacserver.cn/'
    },
    {
      id: '26',
      name: 'Paradox',
      type: '生电',
      version: '互通',
      icon: '/server_icons/Paradox.png',
      description: '版本：JAVA互通 1.20.4 - 1.8.9 | 生电 / 生存 一个Fabric的生电服，群700450401',
      link: 'https://host.namespace-serivce.com/'
    },
    {
      id: '27',
      name: 'Bluecraft-蔚蓝工艺',
      type: '模组',
      version: '1.20.1',
      icon: '/server_icons/BluecraftLogo-B.png',
      description: 'QQ账号验证（无需MC正版） 生存冒险\科技\魔法\枪械\YSM都在这里等你来玩 与你相遇,便是奇迹！ QQ群：555822991',
      link: 'https://www.bluecraft.top'
    },
    {
      id: '28',
      name: 'RHTserver',
      type: '生电',
      version: '1.20.1',
      icon: '/server_icons/RHTserver.jpg',
      description: '服务器加载carpet等生电mod，纯原版端也可进入 游玩服务器无需正版账号 服务器采取审核制',
      link: 'https://www.bilibili.com/video/BV1miebe6E2w'
    },
    {
      id: '29',
      name: 'Ocean Network',
      type: '生存',
      version: '互通',
      icon: '/server_icons/Oceannetwork.png',
      description: '版本：JE1.8x-1.21.x | BE:最新 这是一个长期开放的原版纯净高版本生存服务器 保留了原汁原味的体验,仅有基础玩法经济等插件 我们保证不做影响平衡、破坏公平或偏袒其他玩家 无需担心服内出现OP滥用权限恶意破坏等恶劣行为',
      link: 'https://oceannetwork.top',
      ip: 'mc.oceannetwork.top'
    },
    {
      id: '31',
      name: '千禧年世界',
      type: '群组服',
      version: '1.21.X',
      icon: '/server_icons/千禧年世界.jpeg',
      description: 'JE1.12.2-1.21.x 千禧年世界服务器＆MilleniumWorld 历经一年半，打造一个不错(?的小型群组服务器 服务器有生存服，小游戏，生电服(后续可能会增加玩法) 快来加入我们吧！',
      link: 'https://qxn.world',
      ip: 'nosrv.qxn.world:56000'
    },
    {
      id: '32',
      name: 'FurCraft',
      type: '群组服',
      version: '1.21.X',
      icon: '/server_icons/FurCraft.png',
      description: '支持JE1.8-1.21.5 高版本生存&UHC 在方块世界中，与毛毛共绘未来',
      link: 'https://furcraft.top'
    },
    {
      id: '33',
      name: '星梦缘',
      type: '模组',
      version: '1.20.1',
      icon: '/server_icons/星梦缘.jpg',
      description: '女仆、枪械、国家的世界，需正版，整合包点链接下载。「星梦缘起，书写你的传奇」',
      link: 'https://www.fizmc.icu/'
    },
    {
      id: '34',
      name: '怡梦云',
      type: '生电',
      version: '1.20.4',
      icon: '/server_icons/怡梦云.png',
      description: '集生电、建筑、冒险于一体的混乱的服务器，不定时会展开活动（死亡不掉落）',
      link: 'https://qm.qq.com/q/gDTuqu8nIY'
    },
    {
      id: '35',
      name: '星光StarShine',
      type: '生存',
      version: '互通',
      icon: '/server_icons/星光StarShine.png',
      description: '版本:JE1.20.4 一个MC插件互通生存服务器 死亡不掉落:主世界✓下界✓末地× 主城含有一个物品不太全的商店，正在完善中 含有tpa gsit quickshop res等插件，目前主玩法为生存，自由探索，后续尝试打算改群组服尝试以添加一些小游戏，持续创新中！ 起步阶段，来了你就是服务器元老 官网：www.8bc.top',
      link: 'https://www.8bc.top/'
    },
    {
      id: '36',
      name: 'TSM生存生电',
      type: '生存',
      version: '1.21.X',
      icon: '/server_icons/TSM生存生电.png',
      description: '版本:1.20.X~1.21.X |离线|白名单|公益|生存|生电 一个玩家和谐，玩法自由，游戏完善的高版本Fabric端生存生电服务器，详见宣传片',
      link: 'https://www.bilibili.com/video/BV1tRkiYcEXG/?share_source=copy_web&vd_source=5efb7eb559fb6731efdf1dd87ab54abc'
    },
    {
      id: '37',
      name: 'YUXD江心岛',
      type: '生存',
      version: '互通',
      icon: '/server_icons/YUXD江心岛.png',
      description: '版本1.21.4，1.20-1.21.4可进，离线可进16核心物理机，苍白花园1.20-1.21.4可进，java基岩互通服，支持离线，插件服，拥有武器强化，怪物强化，种族，公会，玩家头衔，玩家任务等多种玩法插件，服务器接入deepseek，可以在服务器里面与deepseek聊天，其他方面，我们有领地插件（无限制创建领地），coi，箱子锁，反作弊，和反矿透（非假矿，通过玩家挖矿行为反）',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=_1e_hufFpMXIJFsDqsLXbaNEHPIqg3Sl&authKey=Jr3WJftfHhjTh2DKOZelXUELzbWq%2BeSO31kgje1Sz7yWQCuiT2gGGYrFv%2BTJkTxP&noverify=0&group_code=839218299'
    },
    {
      id: '38',
      name: '圣苦力怕服务器',
      type: '生存',
      version: '1.21.1',
      icon: '/server_icons/圣苦力怕服务器.png',
      description: '欢迎来到Holy Creeper Empire圣苦力怕服务器（HCE），这是一个永久公益的生存冒险建筑服务器，如果您想要在社区结交新朋友，那就加入我们；如果您想要在MC建立城池、公会，那就加入我们；如果您热爱冒险，那就加入我们；如果您只想体验原汁原味的生存，那就加入我们！加入HCE，让我们一起在圣苦力怕的大陆上建造自己的世界吧！',
      link: 'https://qm.qq.com/q/CBkmZTM16U'
    },
    {
      id: '39',
      name: '远途服务器',
      type: '生存',
      version: '1.21.1',
      icon: '/server_icons/远途服务器.png',
      description: '支持JE 1.21～1.21.1版本，进服需要正版账号和定制整合包（参见群文件）。服务器内生电机器较完备，支持生存、生电、建筑、冒险等玩法，加入了No Chat Reports模组保证聊天安全，管理员能够保持活跃，服务器能够定期备份，欢迎加入到我们的旅途中！',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=IiJFvtzm_ypIaPTUOsN2fOX7YOfLnMnu&authKey=jm4pCfb0fcGrp%2F4K0e3s9pXbnID9Sp7gAco2bOq0upxlFnWtNhbfCgPj9gHnkhZ5&noverify=0&group_code=921363139'
    },
    {
      id: '40',
      name: '星穹之境',
      type: '生存',
      version: '1.21',
      icon: '/server_icons/星穹之境.png',
      description: '如果你渴望在《我的世界》中结交志同道合的伙伴，这里就是你的家园；如果你想打造属于自己的梦幻建筑，这里将是你挥洒创意的画布；如果你热爱探索未知、挑战极限生存，这里有你想要的冒险与惊喜；如果你只想安安静静种田养老，享受原汁原味的MC乐趣，这里同样欢迎你！加入「星穹之境」，在1.21的全新世界中，与我们一起书写属于你的方块传奇！ 🌟',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?k=yzMew-ub5mpr0immygvMImi2nSK-YxgG&jump_from=webapi&authKey=3nYe/MAfr6cEtGsYW1zyzBezWwIHRibQeUw6cQ5cRBS6wkjPvSygVtxsMcS9YvhF',
      ip: 'cn-hz1.qwq0v0.fun:51025'
    },
    {
      id: '41',
      name: '方块无界 LimitlessBlocks',
      type: '创造',
      version: '互通',
      icon: '/server_icons/LimitlessBlocks.png',
      description: '支持Java1.21.4及以上版本及基岩版最新。这是一个自由的互通原版服务器，支持生存/创造模式自由切换，我们珍视玩家的劳动成果，承诺长期运营。官方网站：lb.jscity.top QQ群：1027961947',
      link: 'https://lb.jscity.top',
    },
   ]
