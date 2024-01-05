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

认证采用双token机制，`access_token`用于每次调用的鉴权，`refresh_token`用于续期

- 除登录接口外的接口，除特殊规定，均需要`access_token`
- 在需要认证的请求中设置 Bearer Token，值为该接口要求使用的token
- 【**需要考虑Web平台的安全性**】客户端可以持久化储存token，但不应尝试解析token

#### 客户端

1. 客户端通过`GetToken`接口获取`access_token`和`refresh_token`。`access_token`的有效期大约为几个小时，`refresh_token`的有效期大约为几天，客户端不需要关心准确的过期时间
2. 客户端使用`access_token`访问其他接口
3. 【**需确认实现难度**】若服务端因`access_token`过期拒绝访问接口，则客户端通过`RefreshToken`接口获取新的`access_token`和`refresh_token`
4. 若服务端因`refresh_token`过期拒绝给出新token，则客户端回到第一步。若成功获取到新token，则客户端回到第二步
- 提前调用`RefreshToken`接口不会使旧的`access_token`立即失效，但更旧的`access_token`可能立即失效（根据服务端的安全策略而定）

#### 服务端

JWT是一个token生成规范，是通过将一个包含数字签名的明文json序列化生成的，服务端依靠数字签名保证其不可伪造。服务端所有种类的token都通过jwt生成，遵循以下要求

- jwt是明文，所以不应包含敏感信息
- `access_token` 可以不在服务端存储，token中需要设置字段以使服务端能够识别用户和token有效期
- `refresh_token` 必须在服务端存储，使用时以服务端存储的数据为准，token中只需要设置必要的字段
- 由于jwt中的json没有字段规范，任何功能都不应依赖于让客户端解析jwt中的字段

### 安全性

#### 暴力破解

- 登录接口需要通过必要的手段防止暴力破解，由于系统设计是私有化部署，可以选择封禁ip等较激进的措施
- 其他接口由于只需要通过计算验证签名即可验证token的有效性，验证过程不需要访问存储服务，所以可以有效地保护

#### 中间人攻击

- 强制使用tls加密连接，可以避免大多数的攻击
- `access_token` 由于每次传输都会携带，所以最有可能泄露，但其有效期短，且不能用于生成新token，造成的影响有限
- `refresh_token` 由于是在服务端存储，仅能使用一次，若泄露后到用户刷新token这段时间内没有被使用，则token失效；若被使用了，则用户能够从服务端得知可能存在泄露
