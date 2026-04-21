# Music Core

`Music Core` 是一个从 0 开始搭建的音乐项目底座，先解决三个问题：

- 作品如何被系统化管理
- 创作流程如何被可视化推进
- 后续发行和数据追踪如何接入

当前版本是一个前端起步页，目的是先把项目启动、品牌方向和核心模块立起来。

## 技术栈

- React
- Vite
- TypeScript

## 本地启动

```bash
npm install
npm run dev
```

## 建议的下一阶段

1. 定义音乐实体：`track`、`release`、`asset`、`task`
2. 增加假数据和列表页，先把作品库做出来
3. 接入后端或 BaaS，比如 Supabase
4. 补登录、上传、编辑、发布状态管理

## GitHub 初始化建议

如果你准备发到 GitHub，仓库名可以直接用：

```bash
music-core
```

然后在本地仓库里执行：

```bash
git init
git add .
git commit -m "chore: bootstrap music core"
```
