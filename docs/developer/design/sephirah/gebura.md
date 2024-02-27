---
id: gebura
title: 游戏商店（Gebura）
sidebar_position: 2
---

*基本功能与 steam 等游戏商店相同，以游戏为主软件工具为辅*

涉及页面：商店、库存、游戏文件管理、游戏存档管理（可能会在同一个页面上，以实际 UI 设计为准）

## 游戏信息（App）

有以下两种来源：

- 用户手动填写的 `InternalApp`
- 系统自动收集的 `ExternalApp`
  - 例如：用户绑定 Steam 账户后，系统自动获取该 Steam 账户拥有的游戏并将游戏信息存入系统
  - 【**需细化**】在系统新增了与游戏有关的内容时尝试自动匹配

`App`仅存储游戏的基本信息，这里主要需要解决不同来源的游戏信息的匹配问题：
`InternalApp`和`ExternalApp`都各自存入数据库中，然后通过自动或手动的方式进行绑定（类似于前文中用户与账户的关系）。
对于拥有绑定关系的`App`，客户端需要合并为同一个`App`显示。在合并时，通过固定优先级或用户自定义优先级的方式选择显示哪个来源的 App 的信息

一个`ExternalApp`最多且**必须**绑定一个`InternalApp`，一个`InternalApp`每个平台最多绑定一个`ExternalApp`。

用户权限：

- `ExternalApp`的信息禁止编辑
- `Normal`和`Sentinel`可以通过一些操作触发系统的自动行为
- `InternalApp`的编辑、绑定关系的编辑仅限`Admin`

## 游戏文件（AppPackage）

有以下两种来源：

- 用户手动填写
- Sentinel 上报（不涉及客户端，将在 Sentinel 部分详细解释）

`AppPackage`存储了一个游戏文件的信息，这些信息指向一个具体的二进制文件或“最新版本”，
但系统内并不会存储这个文件，所以无法保证文件的可访问性。  
`App`与`AppPackage`是一对多的关系，每个`AppPackage`最多从属于一个`App`，多个`AppPackage`表示一个`App`的多个版本

用户权限：

- 所有用户均可拥有自己的`AppPackage`，可以绑定到任意一个`InternalApp`上，可以选择公开给其他用户
- `Admin`和`Normal`能够管理自己创建的`Sentinel`拥有的`AppPackage`
- `Admin`和`Normal`具有同等权限，不可管理他人的`AppPackage`

## 时长统计（AppPackageRunTime）

- 客户端记录每个`AppPackage`的运行时间，每次运行生成一条`AppPackageRunTime`信息，包含原始启动及关闭时间， 记录的准确性完全依靠客户端维护及验证，服务端不做任何校验  
- 服务端在`App`及`AppPackage`维度上统计总时长、最后启动时间

用户权限：

- `Admin`和`Normal`能够增加或删除自己的`AppPackageRunTime`，不能修改，可以选择公开给其他用户

## 游戏存档配置文件（AppPackageSaveDataConfig）

- 用户在客户端生成配置文件，公共配置文件由其他项目管理
- `AppPackage`与`AppPackageSaveDataConfig`是一对多的关系
- `AppPackageSaveDataConfig`在创建时必须指定所关联的`AppPackage`并且不能修改（客户端可以为复用配置文件提供便利）

用户权限：

- `Admin`和`Normal`能够创建自己的`AppPackageSaveDataConfig`，可以选择公开给其他用户

配置文件为有效的 json 字符串，schema 定义：[v1](https://tuihub.github.io/protos/schemas/savedata/v1.json)（[示例](https://tuihub.github.io/protos/schemas/savedata/v1-example.json)），[v2.1](https://tuihub.github.io/protos/schemas/savedata/v2.1.json)（[示例](https://tuihub.github.io/protos/schemas/savedata/v2.1-example.json)）  
推荐使用最新 schema

## 游戏存档（AppPackageSaveData）

### 服务端

- 一份存档为一个有效的 zip 文件，上传时服务端进行文件大小和 checksum 检查，但不检查文件内容
- 除二进制文件外，还需要储存每份存档的生成时间、checksum 等基本信息
- 对于每个用户的每个`AppPackage`，支持有限数量的滚动存档，上传时只能上传一份新存档，自动覆盖最旧的备份，下载时不设限制。删除旧存档时，可以仅删除二进制文件但保留基本信息
- 对于每个用户的每个`AppPackage`，支持有限数量的固定存档，可以将任意可用的滚动存档设为固定存档，设置后即使滚动存档被覆盖，仍然可以通过固定存档入口获取

### 客户端

- 滚动存档
  - 支持启动游戏前检查存档更新，游戏关闭后上传存档
  - 游戏进程未正常退出时，询问用户是否上传本次存档
  - 支持下载还原
- 固定存档
  - 支持设置与下载还原

存档生成与还原规则：

- 文件
  - 备份文件必须是一个有效的 zip 文件
  - 备份文件中的所有文件名、文本文件等文本内容均**使用 UTF-8 编码**
  - 备份文件中必须有一个名为`tuihub_savedata_config.json`的配置文件，内容参考[v1-example](https://tuihub.github.io/protos/schemas/savedata/v1-example.json)，[v2.1-example](https://tuihub.github.io/protos/schemas/savedata/v2.1-example.json)
  - 备份文件中的其他内容必须遵循配置文件的设置
- 备份
  - 依据用户预先设置的配置文件生成备份
  - 不应出现除读取之外的任何 io 操作
- 还原
  - 依据待还原文件中的配置文件执行
  - 当出现无法修复的错误导致无法完成还原时应当自动回滚

### 传输

传输的实际操作由`Binah`执行，在客户端需要上传或下载文件时

1. 客户端请求存档传输，服务端进行权限校验和字段验证
2. 服务端通过`Binah`生成`upload_token`或`download_token`，返回给客户端
3. 客户端调用`Binah`的接口执行传输过程
4. 在传输的过程中和结束时通过服务端内部逻辑，`Binah`调用与存档相关的后处理逻辑。服务端应正确设置 token 内容以便可以从中读出需要执行的后处理逻辑

## 游戏二进制下载（AppPackageBinary）（暂定）

### 服务端

- 推荐将游戏二进制文件打包为 zip 文件并分块（64MiB / chunk），分块方案和 7-zip 相同（直接按照 chunk 大小依次拆分文件）
- 每个具体的文件作为一个 chunk，具有单独的`PublicURL`、大小及校验和
- 使用`ES256`或其他非对称算法，签发独立的 jwt token 供静态文件服务器验证，有效期**不超过 24 小时**
- 使用`openresty`或其他 web 服务器，作为具有验证 token 功能的静态文件服务器（可使用[lua-resty-jwt](https://github.com/cdbattags/lua-resty-jwt)）
- 静态文件服务器使用`Librarian`的公钥验证其签发的 jwt token，并在验证通过后给出新的 jwt token 用于实际 chunk 下载
- 静态文件服务器可以有别名，可由`Sentinel`或`Librarian`指定

### 客户端

- 使用`Librarian`签发的 jwt token，通过静态文件服务器的签发 URL，获取下载使用的 jwt token
- 下载时可以使用多线程下载，但同一服务器连接数应**小于等于 8**
- 单个 chunk 下载完成后使用该 chunk 校验和进行校验，若校验失败应视为文件下载错误并重新下载该 chunk
- （可选）全部 chunk 下载并校验完成后进行解压
- （可选）解压完成后交由用户手动操作或执行安装脚本（未定）
