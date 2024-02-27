---
title: 服务端插件系统
---

需要插件化的功能：

- Tiphereth 账号源
- Gebura 游戏信息源
- Yesod 订阅获取

原 porter 模块变更为插件模块，名称保持不变  

采取双向通信，管理员人工确认的方式

1. sephirah 设置 porter 类型的特殊用户
1. 每个 porter 实现应当有自己硬编码的`PorterName`（字符串），porter 启动前由服务器管理员分配一个`PorterID`，`PorterName`相同视为源代码相同，`PorterID`不允许重复，不支持不同版本的 porter 同时存在
1. porter 注册实例时将`PorterName`和`PorterID`设为[node meta](https://developer.hashicorp.com/consul/docs/agent/config/cli-flags#_node_meta)
1. sephirah 定时从服务发现获取 porter 实例列表，遍历实例调用信息获取接口，将有效实例显示在管理员面板上
1. 管理员根据信息确认是否启用新 porter
1. 管理员确认后服务端调用 porter 启用接口分配 accessToken 和 refreshToken
1. porter 应自行维护 accessToken，过期需要管理员手动续期（与启用流程相同）
1. 在之后的调用过程中
    - sephirah 应能识别到 porter 的 refreshToken 过期并将其停用，并且停止对其调用
    - 【用于 bot 开发】porter 能够调用特定接口获取用户模拟 token，该 token 应包含 porter 和用户的信息，能够以该用户的身份调用接口，必要时与真实用户调用做出不同的响应逻辑
    - 非用户模拟状态限制可调用接口
