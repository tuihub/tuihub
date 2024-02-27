---
id: grpc
title: gRPC
---

gRPC 是主要使用的传输协议

## Q&A

### 为什么不使用 REST

REST 仅仅规范了接口定义，而且它的接口定义方式很难用来描述一个抽象接口或者一个逻辑复杂的接口

### 为什么不使用 OpenAPI

可以参考谷歌的[这篇博客](https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them)

gRPC 和 OpenAPI 很相似，也有能够实现两种协议互相转换的工具，对于我们的使用需求来说 gRPC 有比较微小的优势：

- 接口定义上，gRPC 通过方法名区分接口，OpenAPI 通过路径区分接口，前者更符合一般函数调用的习惯
- payload 格式上，gRPC 是二进制，OpenAPI 是 json，前者效率更高

### 为什么不使用 thrift

- gRPC 的生态更成熟
- gRPC 基于 HTTP/2 协议，thrift 基于 TCP 协议，虽然后者性能更好，但前者在公网传输时更稳定
