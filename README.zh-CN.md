| **本软件目前处于 alpha 阶段。** |
|---------------------|

| [English](README.md) | 简体中文 |
|----------------------|------|

<h1 align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="static/img/main-dark.webp" width="480">
  <img alt="TuiHub" src="static/img/main.webp" width="480">
</picture>
</h1>

[![QQ](https://img.shields.io/badge/QQ-737582680-EB1923?logo=tencent-qq&logoColor=white)](https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=lQezO1qvG0iGMi5PjhIlJo_mzCkXsNmV&group_code=737582680)
[![Telegram](https://img.shields.io/badge/Telegram-@TuiHub-2CA5E0.svg?logo=telegram&logoColor=white)](https://t.me/TuiHub)
![Self-Hosting](https://img.shields.io/badge/Self--Hosting-Preferred-green)
![Hosted](https://img.shields.io/badge/Hosted-For_Alpha_Test-yellow)
[![docs](https://github.com/tuihub/tuihub/actions/workflows/deploy.yml/badge.svg)](https://docs.tuihub.org/)
![License](https://img.shields.io/github/license/tuihub/tuihub)

[![Go Server](https://img.shields.io/badge/Go-Server-00ADD8.svg?logo=go&logoColor=white)](https://github.com/tuihub/librarian)
[![Server Version](https://img.shields.io/github/v/release/tuihub/librarian.svg?include_prereleases)](https://github.com/tuihub/librarian/releases/latest)
![arm Supported](https://img.shields.io/badge/arm-Supported-00ADD8?logo=arm&logoColor=white)
![linux](https://img.shields.io/badge/linux-FCC624?logo=linux&logoColor=black)
![Windows](https://img.shields.io/badge/Windows-0078D6?logo=windows&logoColor=white)

[![Flutter Client](https://img.shields.io/badge/Flutter-Client-02569B.svg?logo=flutter&logoColor=white)](https://github.com/tuihub/waiter)
[![Client Version](https://img.shields.io/github/v/release/tuihub/waiter.svg?include_prereleases)](https://github.com/tuihub/waiter/releases/latest)
![Windows](https://img.shields.io/badge/Windows-0078D6?logo=windows&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)
![Web](https://img.shields.io/badge/Web-4285F4?logo=google-chrome&logoColor=white)

TuiHub 是一个用于管理数据的免费开源工具集。

## 用例

*某些功能仍在开发中。*

### 信息流收集和分发

TuiHub 可以从各种来源收集信息流，
使用用户自定义规则处理它们，
并将其分发到各种目的地。
**收集、处理和分发逻辑都是可扩展的。**

插件机制允许您在您附近部署主要服务，
在远端部署收集和分发服务。

```mermaid
graph LR
    subgraph Original[原始来源]
        RSS
        non-RSS[非RSS]
        Telegram
    end
    subgraph Generator[RSS生成器]
        RSSHub
        more[其他]
    end
    subgraph TuiHub
        subgraph User[用户设备]
            Waiter[客户端]
            WaiterOut[客户端内置阅读器]
        end
        subgraph Main[本地服务器]
            subgraph Sephirah[主服务]
                In[输入]
                Processing[自定义处理]
                Out[输出]
                In-->Processing
                Processing-->Out
            end
            PorterRSS[tuihub-rss]
            PorterRSSOut[tuihub-rss]
        end
        subgraph Remote[远程服务器]
            PorterRSSRemote[tuihub-rss]
            PorterTelegram[tuihub-telegram]
            PorterRSSOutRemote[tuihub-rss]
            PorterTelegramOut[tuihub-telegram]
        end
    end
    subgraph Destination[目的地]
        RSSReader[RSS阅读器]
        TelegramOut[Telegram]
    end
    non-RSS-->RSSHub
    non-RSS-->more
    RSS-->PorterRSS
    RSSHub-->PorterRSS
    more-->PorterRSS
    RSS-->PorterRSSRemote
    RSSHub-->PorterRSSRemote
    more-->PorterRSSRemote
    Telegram-->PorterTelegram
    PorterRSS-->Sephirah
    PorterRSSRemote-->Sephirah
    PorterTelegram-->Sephirah
    Waiter-->Sephirah
    Sephirah-->WaiterOut
    Sephirah-->PorterRSSOut
    Sephirah-->PorterRSSOutRemote
    Sephirah-->PorterTelegramOut
    PorterRSSOut-->RSSReader
    PorterRSSOutRemote-->RSSReader
    PorterTelegramOut-->TelegramOut
```

### 游戏管理

TuiHub 可以管理你的游戏(包括安装文件和保存文件)，
并提供类似于 Steam 的用户界面。
**特别是对于那些准备了大量存储空间存档游戏的用户。**

插件机制允许你保持当前的存储方法或使 TuiHub 对你的游戏存储只读。

```mermaid
graph LR
    subgraph Metadata[元数据来源]
        Steam
        Metacritic
    end
    subgraph TuiHub
        subgraph User[用户设备]
            Waiter[客户端]
            Game[游戏]
            SteamClient[Steam客户端]
            Game2[游戏]
        end
        subgraph Main[本地服务器]
            subgraph Sephirah[主服务]
                In[输入]
                Processing[匹配信息]
                In-->Processing
            end
        end
        subgraph Remote[远程服务器]
            PorterSteam[tuihub-steam]
            PorterMetacritic[tuihub-metacritic]
        end
    end
    subgraph Storage[存储设备]
        Sentinel[数据监视]
        Download[下载服务器]
    end
    Sentinel-->Sephirah
    Download-->|下载|Waiter
    Waiter-->|管理|Game
    Waiter-->|调用|SteamClient
    SteamClient-->Game2
    Sephirah-->Waiter
    Steam-->PorterSteam
    Metacritic-->PorterMetacritic
    PorterSteam-->Sephirah
    PorterMetacritic-->Sephirah
```

### 更多

未来可能实现或实施的一些想法：

- 使用 Feed 功能在不同平台之间实时同步聊天记录？
- 使用 Feed 功能来订阅可以在游戏库中显示的游戏新闻和更新，就像 Steam 一样？
- 自定义和导出一个私人下载 RSS 到支持的下载器？比如自动下载 Telegram 文件？

## 文档

文档位于 **[https://docs.tuihub.org](https://docs.tuihub.org/)**。
该站点使用 [Docusaurus](https://docusaurus.io/) 构建。
文档使用 Markdown 编写，位于 `docs/` 目录。

## Star 历史

<a href="https://star-history.com/#tuihub/tuihub&tuihub/librarian&tuihub/waiter&tuihub/protos&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=tuihub/tuihub,tuihub/librarian,tuihub/waiter,tuihub/protos&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=tuihub/tuihub,tuihub/librarian,tuihub/waiter,tuihub/protos&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=tuihub/tuihub,tuihub/librarian,tuihub/waiter,tuihub/protos&type=Date" />
 </picture>
</a>
