---
title: Alpha02-应用管理首次测试
authors: muzhou233
date: 2024-03-15
---

本次测试的主要内容是应用管理功能，这也是该功能的首次测试。

<!-- truncate -->

:::info
本次测试适用[通用内测规范](../../../docs/user/contributing/alpha-test)
:::

:::warning
本次测试为删档测试，没有数据迁移或导出功能。
:::

## 测试内容

在本次测试中，我们将会测试以下功能：

- `仅限 Windows` win32 应用导入 - 通过扫描文件导入系统中的应用
- `仅限 Windows` 应用启动器
  - 通过启动器启动已导入的应用
  - 记录应用运行时间
- Steam 集成
  - 通过绑定 Steam 账号 ID 导入 Steam 库中的游戏
  - `仅限 Windows` 通过扫描本地 Steam 库导入游戏
  - 通过名称搜索将 Steam 游戏信息绑定至任意已导入的应用
- 多端同步
  - 在所有支持的平台上查看导入的应用
  - 支持不同设备上导入同一个应用

本次测试支持的平台有：`Windows` `Android` `Web`

## 值得关注的变化

### 用户注册

用户注册在本次测试中开放，不再提供管理员账户。

### 服务端插件系统

服务端插件系统将涉及与第三方平台互操作的部分分离到插件中，以便于未来的维护，同时新设计的系统也支持插件反向调用服务端，以供实现更加灵活的功能。

### 登录设备管理

登录设备管理将允许用户查看并管理自己的登录设备，以及远程登出设备。考虑到服务端的鉴权设计及实现复杂度，远程登出功能不会立即生效。

### Steam 客户端集成

客户端将增加 Steam 客户端集成，支持扫描本地的 Steam 游戏库，并将游戏信息同步到服务端。

### 客户端系统代理支持

在此次测试中，客户端的图片加载将会自动使用系统代理，连接服务端默认不使用系统代理，可通过客户端实验性选项开启。

### 客户端优化

- 新增用户引导：客户端发布 docker 容器，该容器允许管理员部署用户引导页，包含网页版客户端、本地客户端下载分流以及一键配置客户端功能。
- 引入 Crowdin：未来客户端将通过 Crowdin 进行多语言支持。
- 安卓高刷新率支持：客户端将支持安卓高刷新率设备，该支持可能对部分设备无效。
- 滑动面板优化：过去的滑动面板对水平手势过于灵敏，新版本添加了一些缓解措施。
- UI 调整
