| **This software is currently in alpha phase.**   |
|-----------------------------------------------------------------|

| English | [简体中文](README.zh-CN.md) |
|---------|-----------------------------|

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

TuiHub is a free and open-source toolkit for managing your data.

## Use Cases

*Some of the features are still under development.*

### Feed collect and distribute

TuiHub can collect feeds from various sources,
process them with user customize rules,
and distribute to various destinations.
**Collecting, processing, and distributing logic are all extensible.**

The Plugin mechanism allows you to deploy main service near you,
deploy collecting and distributing services at the far end.

```mermaid
graph LR
    subgraph Original[Original Source]
        RSS
        non-RSS
        Telegram
    end
    subgraph Generator
        RSSHub
        more
    end
    subgraph TuiHub
        subgraph User[User Device]
            Waiter[Client]
            WaiterOut[Client Built-in Reader]
        end
        subgraph Main[Local Server]
            subgraph Sephirah[main service]
                In[Input]
                Processing[Custom Processing]
                Out[Output]
                In-->Processing
                Processing-->Out
            end
            PorterRSS[tuihub-rss]
            PorterRSSOut[tuihub-rss]
        end
        subgraph Remote[Remote Server]
            PorterRSSRemote[tuihub-rss]
            PorterTelegram[tuihub-telegram]
            PorterRSSOutRemote[tuihub-rss]
            PorterTelegramOut[tuihub-telegram]
        end
    end
    subgraph Destination 
        RSSReader[RSS Reader]
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

### Game Library Management

TuiHub can manage your game (including install files and save files)
and provide a user interface similar to Steam.
**Especially for those who have a large storage for archiving games.**

The Plugin mechanism allows you to keep current storage method
or keep TuiHub read-only to your game storage.

```mermaid
graph LR
    subgraph Metadata[Metadata Source]
        Steam
        Metacritic
    end
    subgraph TuiHub
        subgraph User[User Device]
            Waiter[Client]
            Game[Game Install]
            SteamClient[Steam Client]
            Game2[Game Install]
        end
        subgraph Main[Local Server]
            subgraph Sephirah[main service]
                In[Input]
                Processing[Match Information]
                In-->Processing
            end
        end
        subgraph Remote[Remote Server]
            PorterSteam[tuihub-steam]
            PorterMetacritic[tuihub-metacritic]
        end
    end
    subgraph Storage[Storage Device]
        Sentinel[Data Watcher]
        Download[Download Server]
    end
    Sentinel-->Sephirah
    Download-->|Download|Waiter
    Waiter-->|Manage|Game
    Waiter-->|Call|SteamClient
    SteamClient-->Game2
    Sephirah-->Waiter
    Steam-->PorterSteam
    Metacritic-->PorterMetacritic
    PorterSteam-->Sephirah
    PorterMetacritic-->Sephirah
```

### What's more?

Some ideas that may be achieved or implemented in the future:

- Use Feed functions to sync chat history between different platforms in real-time?
- Use Feed functions to subscribe game news and updates that can display in the game library, just like Steam?
- Customize and export a private download feed to downloader that supports RSS? e.g. auto download telegram files?

## Documentation

Documentation available at **[https://docs.tuihub.org](https://docs.tuihub.org/)**.  
This site is built with [Docusaurus](https://docusaurus.io/).
The documentation is written in Markdown and located in the `docs/` directory.

## Star History

<a href="https://star-history.com/#tuihub/tuihub&tuihub/librarian&tuihub/waiter&tuihub/protos&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=tuihub/tuihub,tuihub/librarian,tuihub/waiter,tuihub/protos&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=tuihub/tuihub,tuihub/librarian,tuihub/waiter,tuihub/protos&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=tuihub/tuihub,tuihub/librarian,tuihub/waiter,tuihub/protos&type=Date" />
 </picture>
</a>
