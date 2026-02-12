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
  export const serverVersions = ['中国版','互通','基岩版','1.21.X','1.21.7','1.21.4','1.21.3','1.21.1','1.21','1.20.4','1.20.1', '1.18.2', '1.16.5']

  export const servers: MinecraftServer[] = [
    {
      id: '1',
      name: 'ATCraftMC',
      type: '生存',
      version: '互通',
      icon: '/server_icons/AT.png',
      description: 'ATCraftMC 由一群志同道合的腐竹和玩家联合组成。 秉持着开放、包容、共享的理念，我们持续添加新的游戏玩法， 以及激动人心的活动，为玩家提供新鲜刺激的游戏体验。',
      link: 'https://atcraftmc.cn',
      ip: 'game.atcraftmc.cn'
    },
    {
      id: '2',
      name: 'PixelMine',
      type: '生存',
      version: '1.21.8',
      icon: '/server_icons/PixelMine.jpg',
      description: '一个基于1.21.8版本的多元化生存服务器，支持离线登录。服务器包含粘液科技、公会系统、领地保护、经济贸易等丰富玩法。无论你是生存玩家、粘液科技爱好者还是建筑爱好者，这里都能找到属于你的乐趣。服务器长期稳定运营，社区友好和谐，期待你的加入',
      link: 'https://shamizo.top/',
      ip: 'shamizo.top'
    },
    {
    id: '3',
    name: 'Cold Mouse',
    type: '群组服',
    version: '互通',
    icon: '/server_icons/ColdMouse.png',
    description: 'Cold Mouse 是一站式MC群组服，提供RPG生存、创造、空岛、小游戏以及PVP等多种玩法。本服自2022年起稳定运营，专注于高版本休闲体验与和谐社区建设。欢迎来到这个更快、更稳、更有氛围的方块世界。点击此卡片进入官网，查看文档或加群了解更多~',
    link: 'https://coldmouse.cn/',
    ip: 'coldmouse.cn'
    },
  ]
