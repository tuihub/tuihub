---
id: grpc
title: gRPC
---

gRPC是主要使用的传输协议

## Q&A

### 为什么不使用REST

REST仅仅规范了接口定义，而且它的接口定义方式很难用来描述一个抽象接口或者一个逻辑复杂的接口

### 为什么不使用OpenAPI

可以参考谷歌的[这篇博客](https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them)

gRPC和OpenAPI很相似，也有能够实现两种协议互相转换的工具，对于我们的使用需求来说gRPC有比较微小的优势：

- 接口定义上，gRPC通过方法名区分接口，OpenAPI通过路径区分接口，前者更符合一般函数调用的习惯
- payload格式上，gRPC是二进制，OpenAPI是json，前者效率更高

### 为什么不使用thrift

- gRPC的生态更成熟
- gRPC基于HTTP/2协议，thrift基于TCP协议，虽然后者性能更好，但前者在公网传输时更稳定