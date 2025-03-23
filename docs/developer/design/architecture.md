---
id: architecture
title: 系统结构
sidebar_position: 0
---

## 按耦合度区分

- `Librarian` 服务端
  - `Sephirah` 核心逻辑，`Librarian`的访问入口，不会向外部系统发出连接
  - `Porter` 外部系统接口封装
- `Waiter` 客户端
- `Sentinel` 监控端，用于特定功能

## 按功能区分

功能模块名取自《废墟图书馆》，仅作为区分，没有实际含义  
功能模块之间可能存在无法避免的代码耦合  
**区分功能模块的目的不是为了让每个模块都能独立运行，而是从宏观上划分系统中的各种功能**

- `Tiphereth` 用户与账户模块，提供用户信息存储、登录令牌的生成、身份校验等功能
- `Gebura` 游戏商店模块，为任何游戏或应用提供游戏信息存储、游戏时长统计、存档备份等功能
- `Yesod` 信息流阅读器模块，在实现 RSS 阅读器的基础上，提供更加丰富的信息流获取与展示功能
- `Binah` 二进制传输模块，所有二进制数据均通过此模块传输
- `Netzach` 通知与推送模块，提供推送端点配置，通知路由等功能
- `Chesed` 截图管理模块，提供截图管理与搜索功能
- `Kether` 当功能逻辑需要跨越不同模块实现时，放入此模块中以标识该部分代码具有较高的耦合度

## 架构总览

```mermaid
graph
    subgraph Librarian
        subgraph Sephirah[Sephirah Service]
            Tiphereth[Tiphereth \n handles account data and provides permission verification]
            Gebura[Gebura \n handles application data]
            Binah[Binah \n handles file transfer]
            Yesod[Yesod \n handles feed data]
            Netzach[Netzach \n handles notification data]
            SQL[SQLDatabase]
            MQ[MessageQueue]
            OSS[ObjectStorage]
            Modules --> Tiphereth
            Modules --> Gebura
            Modules --> Binah
            Modules --> Yesod
            Modules --> Netzach
            Tiphereth --> SQL
            Gebura --> SQL
            Binah --> SQL
            Yesod --> SQL
            Netzach --> SQL
            Tiphereth --> MQ
            Gebura --> MQ
            Binah --> MQ
            Yesod --> MQ
            Netzach --> MQ
            Binah --> OSS
        end
    end
    subgraph Client
        Waiter[Waiter \n client application]
    end
    subgraph Porter Plugin
        Porter[Porter \n encapsulate input&output operations]
        ThirdPartyAPI
    end
    Sephirah --> Porter
    Porter --> Sephirah
    Client --> Sephirah
```

## 数据实体关系

```mermaid
graph
    subgraph Tiphereth
        User[User]
        Account[Account]
        Sentinel[Sentinel]
        Device[Device]
        User -->|Link| Account
        User --> Sentinel
        User <-.-> Device
    end

    subgraph Gebura
        subgraph AppInfo
        AppInfoInternal[AppInfo \n internal]
        AppInfoExternal[AppInfo \n external]
        AppInfoInternal -->|Bind| AppInfoExternal
        end

        App[App]
        AppInst[AppInst]
        AppBinary[AppBinary]
        AppInstRunTime[AppInstRunTime]
        AppSaveFile[AppSaveFile]
        AppCategory[AppCategory]
        AppInfoInternal --> App
        AppInfoInternal --> AppBinary
        App --> AppInst
        App --> AppSaveFile
        AppInst --> AppInstRunTime
        AppCategory <-.-> AppInfoInternal
        AppCategory <-.-> App
    end

    subgraph Yesod
        FeedConfig[FeedConfig]
        Feed[Feed]
        FeedItem[FeedItem]
        FeedItemCollection[FeedItemCollection]
        FeedConfig <--> Feed
        Feed --> FeedItem
        FeedItemCollection --> FeedItem
    end

    subgraph Netzach
        NotifySource[NotifySource]
        NotifyTarget[NotifyTarget]
        NotifyFlow[NotifyFlow]
        NotifyFlow --> NotifySource
        NotifyFlow --> NotifyTarget
    end

    subgraph Binah
        File[File]
    end

    Account --> AppInfoExternal
    User -->|Own| App
    User --> AppInfo
    Sentinel --> AppBinary
    User -->|Own| FeedConfig
    User -->|Own| NotifyFlow
    Feed <-.-> NotifySource
    FeedItemCollection <-.-> NotifySource
    AppSaveFile <--> File
    Device --> AppInst

    
    subgraph Signs
        OneWay[One-way arrow] -->|means| oneToN[1:N]
        TwoWay[Two-way arrow] <-->|means| nToN[1:1]
        TwoWayDotted[Two-way dotted arrow] <-.->|means| oneToNDotted[N:N]
    end
```
