---
id: savedata
title: 游戏存档
---

schema 定义：[v1](https://tuihub.github.io/protos/schemas/savedata/v1.json)（[示例](https://tuihub.github.io/protos/schemas/savedata/v1-example.json)），[v2.1](https://tuihub.github.io/protos/schemas/savedata/v2.1.json)（[示例](https://tuihub.github.io/protos/schemas/savedata/v2.1-example.json)）  
推荐使用最新 schema

## Savedata Schema 说明

### Savedata Schema v1 说明

- 配置文件必须声明`$schema`，其值为该配置对应的 Json Schema URL
- 配置文件中不应出现 schema 定义以外的值
- 每个`entry`包含了一个特定路径的配置，通常情况下仅需要一个
  - `pathMode`路径模式否则必须为相对路径，相对路径的起始路径由具体设置决定
    - `absolute`路径必须为绝对路径
    - `game`路径必须为相对路径，以用户设置的游戏可执行文件所在路径为起始（该路径由客户端持久化存储，不是本配置文件的一部分）
    - `document`路径必须为相对路径，以用户文档目录为起始
    - `profile`路径必须为相对路径，以用户主目录为起始
  - `path`路径信息，内容必须为有效的路径（Windows 平台下使用 Windows 平台格式，相对路径分隔符使用正斜杠`/`），若为文件则以文件名结尾，若为文件夹则以`/`结尾
  - `id`唯一标识符，生成的备份文件中应当有一个同名文件夹，文件夹内容为依据本`entry`定义应当备份的文件

### Savedata Schema v2.1 说明

- 配置文件必须声明`$schema`，其值为该配置对应的 Json Schema URL
- 配置文件中不应出现 schema 定义以外的值
- 存档文件应为一个标准`zip`格式的压缩文件，其中包含配置文件本体
- `platform`项为存档使用的平台，目前只有`windows`
- `caseSensitive`项为在处理该存档时，路径是否大小写敏感（`windows`平台默认大小写不敏感）
- `entries`项包含该存档所有的处理规则，至少需有`1`个`entry`
  - `id`项为唯一标识 id，在`entries`中不可重复；生成的存档根目录中需有同名文件夹，包含符合本`entry`定义的文件
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

## 常见游戏引擎

### Ethornell/BGI

识别方法：

  - 文件说明`Ethornell - BURIKO General Interpreter`
  - 文件版本1.xxx.x.x（x为任意0-9数字）
  - 合法商标`BURIKO General Interpreter`
  - 原始文件名`BGI.exe`
  - 游戏安装目录下或安装目录下的`Archive`文件夹下有大量`data0xxxx.arc`文件（x为任意0-9数字），可能还有`BHVC.exe`，`system.arc`，`sysgrp.arc`，`sysprg.arc`等文件

程序化识别：

```csharp
using System.Diagnostics;
using System.Text.RegularExpressions;
// exePath 为游戏可执行文件路径, baseDirPath 为游戏根目录路径
public static bool IsBgi(string exePath, string? baseDirPath = null)
{
    var versionInfo = FileVersionInfo.GetVersionInfo(exePath);
    bool result = versionInfo.FileDescription == "Ethornell - BURIKO General Interpreter"
        || versionInfo.InternalName == "Ethornell"
        || versionInfo.LegalTrademarks == "BURIKO General Interpreter"
        || versionInfo.OriginalFilename == "BGI.exe";
    if (!result)
    {
        baseDirPath ??= Path.GetDirectoryName(exePath);
        if (baseDirPath == null) { return false; }
        var matches = 0;
        var files = Directory.EnumerateFiles(baseDirPath, "*.*", new EnumerationOptions
        {
            RecurseSubdirectories = true,
            MaxRecursionDepth = 1
        });
        var matchFileNames = new string[] { "BGI.exe", "BHVC.exe", "BGI.hvl", "sysgrp.arc", "sysprg.arc", "system.arc" };
        matches += files.Where(f => matchFileNames.Contains(Path.GetFileName(f))).Count();
        if (matches < 3)
        {
            Regex regex = new(@"^data[0-9]{3,5}\.arc$");
            matches += files.Where(f => (Path.GetDirectoryName(f) == baseDirPath || Path.GetFileName(baseDirPath) == "Archive")
                && regex.IsMatch(Path.GetFileName(f))).Count();
        }
        result = matches >= 3;
    }
    return result;
}
```

存档位置：

  - 一般为一个文件（储存进度、设置等）和一个文件夹（文件对应存档槽位）
  - 文件一般在游戏安装目录下的`BGI.gdb`，部分汉化程序可能会更改名称（如`BGI.chs`等）
  - 文件夹一般在游戏安装目录下`UserData`文件夹，部分汉化程序可能会更改名称（如`Data_CHS`等）

存档配置文件示例：[链接](https://docs.tuihub.org/savedata-configs/bgi.json)

### Kirikiri 2/Z

### SiglusEngine

### TyranoScript

### Artemis

### CatSystem2

识别方法：

  - 文件说明和产品名称为`cs2`
  - 原始文件名为`cs2.exe`
  - 游戏安装目录下有`cs2conf.dll`或`cs2conf.dll`，其文件说明和产品名称为`cs2conf`，原始文件名为`cs2conf.dll`
  - 游戏安装目录下有大量`int`文件，其中`config.int`、`bgm.int`、`image??.int`、`pcm_?.int`、`scene.int`等文件以`KIF`(`4B 49 46`)开头

### QLIE

### Entis GLS

### SoftPal

### YU-RIS

识别方法：

  - 文件说明或产品名称为`YU-RIS Script Engine`
  - 原始文件名可能为空或`yu-ris.exe`
  - 产品版本为`0, 2xx, x, x`、`0, 4xx, x, x`或`0, 5xx, x, x`
  - 游戏安装目录下可能有`YS???.DLL`文件
  - 游戏安装目录下的`pac`文件夹内有大量`ypf`文件，其中`bn.ypf`、`cg.ypf`等文件以`YPF`(`59 50 46`)开头

### Ren'Py

### AdvHD

### yuka script

识别方法：

  - 游戏安装目录下有`DATA0?.ykc`文件，以`YKC001`(`59 4B 43 30 30 31`)开头
  - 游戏安装目录下可能有`Start.yks`文件，以`YKS001`(`59 4B 53 30 30 31`)开头

### adv32/Circus

### Whale/mirai

### Silky Engine

### NeXAS/Giga

识别方法：

  - 文件说明和产品名称可能为空或`NeXAS`
  - 原始文件名可能为空或`NeXAS.exe`
  - 游戏安装目录下有`Script.pac`文件，以`PAC`(`50 41 43`)开头

### Shiina Rio

### RPG Maker MV/MZ

### RPG Maker XP/Vx/VxAce

### Wolf RPG
