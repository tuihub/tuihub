---
title: 版本选择
sidebar_position: 2
---

## 版本语义

librarian（服务端） 和 waiter（客户端）的版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范。  

:::warning
> 语义化版本控制规范  
> 4. 主版本号为零（0.y.z）的软件处于开发初始阶段，一切都可能随时被改变。这样的公共 API 不应该被视为稳定版。

目前双端主版本号均为零，只有按照下列推荐的组合使用才能获得最大的兼容性。
:::

## 可选版本

### Alpha

Alpha 版本是用于内部测试的版本，内部测试使用官方提供的服务器，面向开发人员和志愿者。

|librarian|waiter|状态|测试内容|
|---|---|---|---|
|||[查看公告预览](../../../blog/alpha/upcoming)|游戏管理首次测试|
|v0.1.16|v0.2.0-alpha.4|正在进行|RSS 订阅首次测试|

### Dev

Dev 版本是用于开发者测试的版本。
**所有未列于上方的版本均视为 dev 版本**，若非特殊情况不要使用。

|librarian|waiter|
|---|---|
|[![服务端最新版本](https://img.shields.io/github/v/release/tuihub/librarian.svg?include_prereleases)](https://github.com/tuihub/librarian/releases/latest)|[![客户端最新版本](https://img.shields.io/github/v/release/tuihub/waiter.svg?include_prereleases)](https://github.com/tuihub/waiter/releases/latest)|
