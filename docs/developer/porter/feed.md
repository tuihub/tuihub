---
id: feed
title: Feed 相关接口
---

完整的 Feed 数据传输流程涉及 `Yesod` 和 `Netzach` 两个模块，`Yesod` 包含数据导入和处理功能，`Netzach` 包含数据导出功能。

## 概览

以官方插件为例，数据处理过程如图

```mermaid
sequenceDiagram
    participant W as waiter
    participant S as sephirah
    participant R as tuihub-rss
    participant G as tuihub-gpt
    participant T as tuihub-telegram
    
    rect rgba(0, 0, 0, 0.3)
        note left of T: initialization
        R-)S: GetPorterInformation
        G-)S: GetPorterInformation
        T-)S: GetPorterInformation
        S->>W: GetServerInformation
    end
    
    W-->S: configure
    
    loop Background Task
        note over S: feed update time arrives
        R->>S: PullFeed
        note over S: save to db
        rect rgba(0, 0, 0, 0.3)
            note left of T: Over each item
            S->>S: Exec Built-in Actions
            S->>+G: ExecFeedItemAction
            G-->>-S: return
            note over S: save changes to db
            S->>S: Exec Notify Router
            S->>T: PushFeedItems
        end
    end
    
    W-->S: list feed
```

## 接口

### 获取

官方`tuihub-rss`插件提供了拉模式输入 Feed 数据的例子

### 处理

官方`tuihub-gpt`插件提供了处理 Feed 数据的例子

### 通知

官方`tuihub-telegram`插件提供了推模式输出 Feed 数据的例子
