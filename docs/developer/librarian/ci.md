---
id: ci
title: 持续集成
---

## 版本发布

使用 Pull Request 控制  
版本发布后使用 [goreleaser](https://goreleaser.com/) 编译二进制文件，并打包 `linux-amd64` 的 docker 镜像

## 其他

### [Go Report](https://goreportcard.com/)

代码静态扫描，不需要配置

### [golangci-lint](https://github.com/golangci/golangci-lint)

Go 语言的 linter 大集合，~~你想要的这里都有~~，通过 CI 运行，需要花一些时间配置，配置好以后可以解决很多问题，配置参考[Golden config for golangci-lint](https://gist.github.com/maratori/47a4d00457a92aa426dbd48a18776322)

### [Codecov](https://about.codecov.io/)

测试覆盖率追踪器，很多项目都用，所以我也用

### [Renovate](https://github.com/renovatebot/renovate)

自动依赖更新，需要花时间配置，比起 GitHub 的 Dependabot 好用很多

### [CodeQL analysis](https://github.com/github/codeql-action/)

GitHub 提供的全自动安全扫描，一键配置
