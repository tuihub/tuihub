---
title: 客户端代理
---

受到客户端所使用的[Flutter 框架的限制](https://github.com/flutter/flutter/issues/26359)，客户端对系统代理支持有限。如果你的客户端无法正常使用系统代理，可以参考以下几种解决方案。

## 环境变量

在启动 flutter 应用时，可以通过`HTTP_PROXY`和`HTTPS_PROXY`环境变量设置代理。

对于 Windows 系统，可以通过以下步骤设置环境变量：

1. 右键客户端程序`waiter.exe`，选择「创建快捷方式」
1. 右键快捷方式，选择「属性」
1. 在「快捷方式」选项卡中，找到「目标」输入框，修改如下：`C:\Windows\System32\cmd.exe /c "set HTTP_PROXY=http://127.0.0.1:xxxx && set HTTPS_PROXY=http://127.0.0.1:xxxx && start "waiter" "原始路径"`

## 启用实验性系统代理支持

客户端引入了社区提供的实验性系统代理支持。你可以在客户端设置中启用该功能并重启客户端。

启用后可能会出现：

- 客户端无法联网且无法登录服务器
- 系统代理依然无效
- 客户端成功应用系统代理

欢迎您进行广泛尝试，以便我们提供更详细的支持文档。

## 使用无需客户端支持的代理方式

目前有很多不需要客户端支持就可以工作的方法，但它们的详细用法已经超出了本文的范围。下面提供一些思路，请量力而行：

- [Proxifier](https://www.proxifier.com/) - `Windows` `macOS` 能够拦截进程的网络请求
- [netch](https://github.com/netchx/netch) - `Windows` 能够拦截进程的网络请求
- [v2rayA](https://github.com/v2rayA/v2rayA) - `Windows` `macOS` `OpenWrt` `Linux` 能够拦截进程的网络请求或充当网关

## 使用网页版客户端

网页版客户端在功能上受到限制，但在使用系统代理方面没有问题。
