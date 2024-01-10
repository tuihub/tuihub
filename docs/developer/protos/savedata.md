---
id: savedata
title: 游戏存档
---

schema定义：[v1](https://tuihub.github.io/protos/schemas/savedata/v1.json)（[示例](https://tuihub.github.io/protos/schemas/savedata/v1-example.json)），[v2.1](https://tuihub.github.io/protos/schemas/savedata/v2.1.json)（[示例](https://tuihub.github.io/protos/schemas/savedata/v2.1-example.json)）  
推荐使用最新schema

## Savedata Schema v1 说明

- 配置文件必须声明`$schema`，其值为该配置对应的Json Schema URL
- 配置文件中不应出现schema定义以外的值
- 每个`entry`包含了一个特定路径的配置，通常情况下仅需要一个
  - `pathMode`路径模式否则必须为相对路径，相对路径的起始路径由具体设置决定
    - `absolute`路径必须为绝对路径
    - `game`路径必须为相对路径，以用户设置的游戏可执行文件所在路径为起始（该路径由客户端持久化存储，不是本配置文件的一部分）
    - `document`路径必须为相对路径，以用户文档目录为起始
    - `profile`路径必须为相对路径，以用户主目录为起始
  - `path`路径信息，内容必须为有效的路径（Windows平台下使用Windows平台格式，相对路径分隔符使用正斜杠`/`），若为文件则以文件名结尾，若为文件夹则以`/`结尾
  - `id`唯一标识符，生成的备份文件中应当有一个同名文件夹，文件夹内容为依据本`entry`定义应当备份的文件

## Savedata Schema v2.1 说明

- 配置文件必须声明`$schema`，其值为该配置对应的Json Schema URL
- 配置文件中不应出现schema定义以外的值
- 存档文件应为一个标准`zip`格式的压缩文件，其中包含配置文件本体
- `platform`项为存档使用的平台，目前只有`windows`
- `caseSensitive`项为在处理该存档时，路径是否大小写敏感（`windows`平台默认大小写不敏感）
- `entries`项包含该存档所有的处理规则，至少需有`1`个`entry`
  - `id`项为唯一标识id，在`entries`中不可重复；生成的存档根目录中需有同名文件夹，包含符合本`entry`定义的文件
  - 该`entry`的起始路径由`baseDirMode`（路径模式）以及`baseDir`（路径）组成，`baseDirMode`有`4`种情况
    - `gameRoot`：以用户指定的游戏根目录为起始（该路径由客户端管理，不是本配置文件的一部分），此时`baseDir`需为相对路径，最终起始路径为用户指定的游戏根目录和`baseDir`拼接的结果
    - `userDocument`：以操作系统当前用户的`文档`目录为起始，此时`baseDir`需为相对路径，最终起始路径为`文档`目录和`baseDir`拼接的结果
    - `userProfile`：以操作系统当前用户的主目录为起始（`windows`平台为`%USERPROFILE%`目录，`linux`平台为`~`目录），此时`baseDir`需为相对路径，最终起始路径为用户主目录和`baseDir`拼接的结果
    - `absolute`: 绝对路径，此时`baseDir`需为绝对路径，最终起始路径`baseDir`
  - `filePatterns`为该`entry`处理的具体规则，至少需有`1`个`filePattern`
    - `type`有`2`种情况：`include`代表该规则为包含项，`exclude`代表该规则为排除项
    - `pattern`为匹配的具体规则，允许`*`和`?`，不支持正则表达式，具体规则和`.NET 5+`中`System.IO.Directory.EnumerateFiles`方法中`searchPattern`的处理规则相同（[文档链接](https://learn.microsoft.com/en-us/dotnet/api/system.io.directory.enumeratefiles?view=net-8.0)）
    - `exclude`项将会最后处理，以保证所有`exclude`项不会出现在最终存档中
  - `clearBaseDirBeforeRestore`项为是否在还原存档前清空该`entry`的起始路径目录