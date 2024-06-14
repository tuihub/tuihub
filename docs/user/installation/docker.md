---
title: 使用 Docker 安装
sidebar_position: 4
---

:::danger
TuiHub 尚未发布首个稳定版本，继续安装代表您同意承担任何未知漏洞的风险
:::

TuiHub 在 GitHub 上提供了 Docker 镜像，在使用 Docker 安装之前请检查您的服务器能够访问 [ghcr](https://ghcr.io)。

## 安装 Docker 及 Docker Compose

请遵循官方文档安装 Docker 及 Docker Compose：

- [安装 Docker](https://docs.docker.com/get-docker/)
- [安装 Docker Compose](https://docs.docker.com/compose/install/)

## 下载模板

```bash
mkdir tuihub && cd tuihub
mkdir -p server/conf minio postgres meili
curl -o docker-compose.yml https://docs.tuihub.org/templates//librarian/v0.2.9/docker-compose.yml
curl -o server/conf/config.yml https://docs.tuihub.org/templates//librarian/v0.2.9/config.yml
curl -o .env https://docs.tuihub.org/templates//librarian/v0.2.9/.env
nano docker-compose.yml # Review and set password
nano server/conf/config.yml # Review and set password
nano .env # Review and set client env
```

## 启动服务

```bash
docker compose up -d
```
