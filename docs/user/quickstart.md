---
id: quickstart
title: 快速开始
sidebar_position: 2
---

:::danger
TuiHub尚未发布首个稳定版本，继续安装代表您同意承担任何未知漏洞的风险
:::

:::note
目前我们会出于测试目的提供短期删档服，*这可能也是最快速的开始方式*
:::

:::warning
本页面仅适用于有终端的操作系统
:::

## 启动服务端

1. 从[发布页](https://github.com/tuihub/librarian/releases)下载合适的二进制文件
1. 下载[服务端配置文件](https://docs.tuihub.org/templates/config.yml) **该配置文件仅用于测试**
1. 用命令行启动服务端，以 linux 为例 `CREATE_ADMIN=true librarian -conf ./config.yml -data ./data`

## 启动客户端

1. 从[发布页](https://github.com/tuihub/waiter/releases)下载合适的二进制文件
1. 启动客户端，填写以下信息登录
    - 服务端地址 `localhost` 
    - 端口 `10000` 
    - 用户名 `admin` 
    - 密码 `admin`