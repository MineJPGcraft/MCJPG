**English** | [中文](./README.md)

# MCJPG Server Communication Organization

Welcome to the Minecraft Server Communication Organization (MCJPG)!

An organization dedicated to Minecraft server technology exchange and promotion.

[Join MCJPG Community Group](https://qm.qq.com/q/5Y4ueZdkxq)

## Submit Your Server

Before submitting your server, please ensure it meets the following requirements:

- The server is running normally and will not shut down in the short term.

- The server has joined the **MCJPG** organization.

If your server meets the above requirements, please follow these steps to submit:

1. Fork this repository and clone it to your local machine.

2. Modify the `servers` field in `docs/.vitepress/theme/data/serverlist.ts` (strictly follow the original code indentation format), and add:

```serverlist.ts
{
    id: 'n+1',
    name: 'Server Name',
    type: 'Server Type (refer to the gameplay categories above)',
    version: 'Server Version (refer to the version categories above)',
    icon: '/server_icons/server_icon_file',
    description: 'Server Description',
    link: 'Link',
    ip: 'Server IP (optional), used to display server status information'
  },
```

> The icon: field can be modified to a single icon

> If you need to add version or gameplay categories, please modify the `serverTypes` and `serverVersions` fields in serverlist.ts

3. If you need to display a server icon, please add the icon to the `docs/public/server_icons/` directory

4. Push to your repository, then submit a pull request.