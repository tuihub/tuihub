---
title: 前置知识
sidebar_position: 1
---

在您安装之前，您需要了解一些基本情况，必要时请查阅相应软件的文档。

## 操作系统

服务端支持的操作系统及架构如下：

- Windows `x86_64` `arm64`
- Linux `x86_64` `arm64` （提供 Docker 镜像）
- macOS `x86_64` `arm64`

## 依赖服务

服务端运行需要如下依赖：

:::info
您会发现服务端可以在没有任何依赖的情况下运行，您可以用这种方式进行测试，但请在生产环境中选择合适依赖来保护您的数据。
:::

### SQL 数据库

SQL 数据库用于保存服务端数据，
目前支持的数据库有：

- [PostgreSQL](https://www.postgresql.org/)
- SQLite（内置） - 性能差
- SQLite in memory（默认） - 无法保存数据，仅用于测试

### 消息队列

消息队列用于消除请求尖峰，提高服务端稳定性，
目前支持的消息队列有：

- [Redis](https://redis.io/) - 仅在使用 Redis 缓存时可用
- [PostgreSQL](https://www.postgresql.org/) - 仅在使用 PostgreSQL 数据库时可用，严重影响数据库性能
- memory（默认）

### 缓存

缓存用于提高服务端性能，
目前支持的缓存有：

- [Redis](https://redis.io/)
- memory（默认）

### 对象存储

对象存储用于保存文件，
目前支持的对象存储有：

- [MinIO](https://min.io/)
- file（内置） - 保存在服务端数据目录
- memory（内置） - 无法保存数据，仅用于测试
- 关闭（默认） - 将会禁用文件相关功能

### 服务发现

服务发现用于服务端与插件的通信，
目前支持的服务发现有：

- [Consul](https://www.consul.io/)
- 静态（内置） - 需要重启服务端才能应用更改
- 关闭（默认） - 将会禁用插件相关功能

### 全文搜索引擎

全文搜索引擎用于搜索功能，
目前支持的全文搜索引擎有：

- [MeiliSearch](https://www.meilisearch.com/)
- bleve（内置）- 效果差
- 关闭（默认） - 将会禁用搜索相关功能

### 反向代理

反向代理用于将静态 HTTP 服务、Grpc 服务和 Grpc-Web 服务聚合为一个端口，
目前提供以下反向代理服务器的模板文件：

- [Caddy](https://caddyserver.com/) v2
- [Nginx](https://nginx.org/)（不开启 TLS 需要 Nginx 1.25.1 以上）
