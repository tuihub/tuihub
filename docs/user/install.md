---
id: install
title: 安装
sidebar_position: 4
---

:::danger
TuiHub尚未发布首个稳定版本，继续安装代表您同意承担任何未知漏洞的风险
:::

## 使用 docker-compose

[安装 docker-compose](https://docs.docker.com/compose/install/)

```bash
mkdir tuihub && cd tuihub
mkdir -p server/conf minio postgres
curl -o server/conf/config.yml https://docs.tuihub.org/templates/production.yml
nano server/conf/config.yml # Review and set password
curl -o docker-compose.yml https://docs.tuihub.org/templates/docker-compose.yml
nano docker-compose.yml # Review and set password
docker compose up -d
```

## 自定义安装

服务端的所有依赖都是可选的，除了上面使用的[生产环境配置文件](https://docs.tuihub.org/templates/production.yml)，我们还提供无依赖启动的[测试环境配置文件](https://docs.tuihub.org/templates/config.yml)，你可以根据需要进行修改