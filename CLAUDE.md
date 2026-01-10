# CLAUDE.md

此说明旨在介绍整个代码仓库

## 简介

这个仓库为[MCJPG组织网站](https://mcjpg.org)的源码仓库，仓库地址为：https://github.com/MineJPGcraft/MCJPG

网站采用**Vitepress**搭建，使用到了Vue和SCSS等，所有的配置文件可以在`/docs/.vitepress`找到
所有配置文件使用`TS`语法，修改时务必开启新的PR或追加在原有的PR，**禁止**直接commit`main`主分支
所有站点配置语言文件在`/docs/.vitepress/config`目录下模块化引用并配置有i18n国际化，需要仔细审查其中的目录结构来修改，添加新语言时按照English的配置文件来添加，翻译指南在`/.claude/prompts/auto-translate.md`务必阅读

## 调试

在进行最后的**Commit**并提交PR前，务必先进行测试确保网站可以正确运行，详细命令参见`/package.json`，比如Dev命令为`npm run docs:dev`

## 回应用户
优先使用用户提起PR和Issue的语言回复用户
