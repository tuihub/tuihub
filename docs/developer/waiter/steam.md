---
id: steam
title: Steam 集成
---

本文总结了在 Windows 系统中如何从已安装的 Steam 客户端获取信息，这些方法已经被稳定使用多年，可以预期在未来也将较为稳定

## 获取 Steam 安装路径

Steam 默认安装目录为`C:\Program Files (x86)\Steam`  

准确的安装目录可以从注册表获得，路径为`HKEY_LOCAL_MACHINE\Software\Wow6432Node\Valve\Steam`，键名为`InstallPath`，键值为绝对路径，大部分编程语言应该都具有能够读取注册表的函数库

## 获取 Steam 库路径

Steam 安装目录下`config\libraryfolders.vdf`文件储存了库文件夹信息，其中的`path`字段储存了各个库的绝对路径

## vdf 和 acf 文本文件解析

Steam 使用一种特殊的文本文件格式存储配置文件，这种格式形似去除了冒号和逗号的 JSON 文件，十分依赖格式字符，导致读取该文件需要专门的支持。  

本文提到的文件均使用这种格式存储，但也存在其他格式的扩展名相同的文件  

你可以在 GitHub 上找到多种语言的实现

## 读取游戏信息

在每个 Steam 库目录下`steamapps`文件夹内文件名为`appmanifest_*.acf`的每个文件储存了一个游戏的信息。文件内容不再赘述  

虽然格式相同，但有些解析库可能依赖特定文件内的魔法字符，需要注意在使用前测试你使用的解析库。  

### 过滤

目前在不访问网络的情况下无法获取 app 的类型，也就是说无法去除软件、工具等非游戏内容。若通过网络数据辅助过滤，那么具体实现就十分灵活了  

以下列出几个比较常见的 appid

- `228980`: Steamworks Common Redistributables
- `250820`: SteamVR

## 获取游戏图像

Steam 安装目录下 `appcache\librarycache` 文件夹储存了每个游戏的六种图像

- [APP_ID]_header.jpg
- [APP_ID]_icon.jpg
- [APP_ID]_library_600x900.jpg
- [APP_ID]_library_hero.jpg
- [APP_ID]_logo.jpg
