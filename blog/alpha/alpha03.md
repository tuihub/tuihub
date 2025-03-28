---
title: Alpha03-订阅自动化
authors: muzhou233
date: 2024-09-28
---

本次测试的主要内容是订阅自动化

<!-- truncate -->

:::info
本次测试适用[通用内测规范](../../../docs/user/contributing/alpha-test)
:::

:::warning
本次测试为删档测试，没有数据迁移或导出功能。
:::

## 测试内容

在本次测试中，我们将会测试以下功能：

- 订阅输入
  - 输入源
    - `tuihub-rss` 从 RSS 源订阅内容
  - 自动化规则
    - `内置` 自定义白名单/黑名单词汇过滤
    - `内置` 截取正文开头生成摘要
- 订阅输出
  - 自定义多个订阅合并推送至多个输出
  - 输出目标
    - `tuihub-telegram` 使用机器人账号推送至指定 Telegram 频道/聊天
    - `tuihub-rss` 提供 RSS 订阅页面

## 值得关注的变化

### 服务端插件系统重制

经过重新设计的插件系统允许插件自定义配置字段，客户端会按照插件需求展示配置项。此项改进主要面向开发人员，对用户影响不大。

### 面向插件的静态服务发现

服务端增加支持静态服务发现，用户可以在服务端配置文件中指定插件地址，而不需要运行 consul 服务。

### 面向订阅的自动化规则

用户能够创建自定义规则来对订阅内容进行各种自动化处理。

### 服务端标准输出流日志

除了现有的文件输出日志，服务端将增加标准输出流日志，该日志展示了服务端的重要事件。

### 服务端通知

用户将能够接收到服务端的通知，以便及时了解服务端状态。例如，用户将能够查看自己每个 Feed 订阅的详细拉取报告。

### 客户端优化

- `Windows` 数据存储：客户端数据存储位置从 `%APPDATA%\TuiHub` 更改为安装路径。
- UI 调整
