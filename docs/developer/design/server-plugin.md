---
title: 服务端插件系统
sidebar_position: 3
---

服务端插件是由服务器管理员配置的，能够通过 gRPC 扩展特定功能的独立进程，插件可以使用任何语言编写。

插件在代码中使用`Porter`作为代号，此代号继承了原有的同名服务端模块。

主服务与插件采取双向通信，默认插件可信并且处于可信网络内。通过 consul 服务发现机制获取实例列表。

1. `Sephirah` 设置 `Porter` 类型的特殊用户
1. 每个 `Porter` 实现应当有自己硬编码的`PorterName`（字符串），`Porter` 启动前由服务器管理员分配一个`PorterID`，`PorterName`相同视为源代码相同，`PorterID`不允许重复，不支持不同版本的 `Porter` 同时存在
1. `Porter` 注册实例时将`PorterName`和`PorterID`设为[node meta](https://developer.hashicorp.com/consul/docs/agent/config/cli-flags#_node_meta)
1. `Sephirah` 定时从服务发现获取 `Porter` 实例列表，遍历实例调用信息获取接口，将有效实例显示在管理员面板上
1. 管理员根据信息确认是否启用新 `Porter`
1. 管理员确认后服务端调用 `Porter` 启用接口分配 accessToken 和 refreshToken
1. `Porter` 应自行维护 accessToken，过期后可以要求 `Sephirah` 重新分配
1. 在之后的调用过程中
   - `Porter` 的信息获取接口中包含其支持的接口列表，`Sephirah` 根据列表在需要时调用 `Porter` 的接口
   - `Porter` 能够调用特定接口获取用户模拟 token，该 token 应包含 `Porter` 和用户的信息，能够以该用户的身份调用接口，必要时与真实用户调用做出不同的响应逻辑
   - 非用户模拟状态限制可调用接口
