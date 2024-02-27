---
id: authority
title: 权限模型
sidebar_position: 1
---

## 用户权限

权限设计使用简单的硬编码的“用户-角色-权限”结构

用户分`Admin`、`Normal`、`Sentinel`三种角色：

- `Admin` 能够访问除个人敏感数据外的所有数据
- `Normal` 能够访问自己的和其他人公开的数据
- `Sentinel` 扫描器专用，仅能访问非常有限的接口

## 用户鉴权

### 认证流程

认证采用双 token 机制，`access_token`用于每次调用的鉴权，`refresh_token`用于续期

- 除登录接口外的接口，除特殊规定，均需要`access_token`
- 在需要认证的请求中设置 Bearer Token，值为该接口要求使用的 token
- 客户端可以持久化储存 token，但不应尝试解析 token

#### 客户端

1. 客户端通过`GetToken`接口获取`access_token`和`refresh_token`。`access_token`的有效期不超过一小时，`refresh_token`的有效期不少于一天，客户端不应关心准确的过期时间
2. 客户端使用`access_token`访问其他接口
3. 若使用`access_token`时拒绝访问，则客户端使用`refresh_token`访问`RefreshToken`接口获取新的`access_token`和`refresh_token`，旧`refresh_token`应被视为失效
4. 若使用`refresh_token`时拒绝访问，则客户端回到第一步。若成功获取到新 token，则客户端回到第二步

#### 服务端

JWT 是一个 token 生成规范，是通过将一个包含数字签名的明文 json 序列化生成的，服务端依靠数字签名保证其不可伪造。服务端所有种类的 token 都通过 jwt 生成，遵循以下要求

- jwt 是明文，所以不应包含敏感信息
- `access_token` 可以不在服务端存储，token 中需要设置字段以使服务端能够识别用户和 token 有效期
- `refresh_token` 必须在服务端存储，使用时以服务端存储的数据为准，token 中只需要设置必要的字段
- 由于 jwt 中的 json 没有字段规范，任何功能都不应依赖于让客户端解析 jwt 中的字段

### 安全性

#### 暴力破解

- 登录接口需要通过必要的手段防止暴力破解，由于系统设计是私有化部署，可以选择封禁 ip 等较激进的措施
- 其他接口由于只需要通过计算验证签名即可验证 token 的有效性，验证过程不需要访问存储服务，所以可以有效地保护

#### 中间人攻击

- 强制使用 tls 加密连接，可以避免大多数的攻击
- `access_token` 由于每次传输都会携带，所以最有可能泄露，但其有效期短，且不能用于生成新 token，造成的影响有限
- `refresh_token` 由于是在服务端存储，仅能使用一次，若泄露后到用户刷新 token 这段时间内没有被使用，则 token 失效；若被使用了，则用户能够从服务端得知可能存在泄露
