---
title: "[归档] SmartDNS 一个智能分流的 DNS 服务"
date: 2021-01-02T09:41:20+08:00
image: banner.jpg
draft: false
categories:
  - Tutorial
tags:
  - DNS
---

## 介绍

> [项目地址](https://github.com/pymumu/smartdns)

### DNS

域名系统（英语：Domain Name System，缩写：DNS）是互联网的一项服务。它作为将域名和 IP 地址相互映射的一个分布式数据库，能够使人更方便地访问互联网。通常情况下本地的解析请求会发送到离你最近的 DNS 服务器，它可能是你的无线路由器、宿舍楼梯下的服务器或者运营商的地区性服务器等，但由于各种原因导致解析效果不理想，延迟高等问题，这时可以考虑换一个网络质量好的域名解析服务，错峰出行，减少拥堵。

### SmartDNS

SmartDNS 集成了多种出栈请求协议，包括常用的 `UDP` 和较为现代的 `DNS-Over-Https` 等，能够在给定的规则列表中挑选出一个延迟最低的域名解析服务，并向其发送请求。同时其内部也提供 DNS 缓存，如果缓存能够命中则直接从本地缓存中返回对应 IP 地址，如未能查找到则继续向上级 DNS 服务传播请求。

![structure](https://github.com/pymumu/smartdns/raw/master/doc/architecture.png)

## 配置

> [默认配置文件](https://github.com/pymumu/smartdns/blob/master/etc/smartdns/smartdns.conf)

> 推荐项目：[dnsmasq-china-list](https://github.com/felixonmars/dnsmasq-china-list)

作者肥猫在其项目中提供了几个较为常用的匹配规则列表，对于非 Arch Linux 用户而言可以把项目克隆到本地然后构建对应的配置文件，而 Arch 用户可以从 [CN 源](https://www.archlinuxcn.org/archlinux-cn-repo-and-mirror/) 里安装 `smartdns-china-list-git` 以获取自动更新。

生成对应的配置文件操作如下，[具体参考](https://github.com/archlinuxcn/repo/blob/c2fe2e155a35da76a879b6a9d0fe21975413bce2/archlinuxcn/dnsmasq-china-list-git/PKGBUILD#L22)，可见其生成形式为 `nameserver /<域名>/<组名>`，后面的组名就是对应我们后来需要的匹配规则而制定的。

```fish
$ cd dnsmasq-china-list
$ make smartdns SERVER=china
```

默认的配置文件中有很多不常用的项目，作为自己的配置文件一般精简到自己需要的功能配置即可。

```yaml
 # （可选）引入额外的规则列表，用绝对路径
conf-file /etc/smartdns/accelerated-domains.china.smartdns.conf
conf-file /etc/smartdns/apple.china.smartdns.conf
conf-file /etc/smartdns/google.china.smartdns.conf

# 本地监听端口
bind [::]:53

# 缓存大小
cache-size 4096

# 重启时读取之前的缓存
cache-persist yes

# 缓存文件存放位置
cache-file /var/cache/smartdns.cache

# 传统 UDP 协议（以阿里 DNS 为例）
server 223.5.5.5

# DNS Over TLS （以 CloudFlare DNS 为例）
server-tls 1.0.0.1

# DNS Over Https (以烧饼 DNS 为例)
server-https https://doh.dns.sb/dns-query -group china -group example
```

> 更多 DNS 服务地址：[dnscrypt.info](https://dnscrypt.info/public-servers/)

如果有多个分组需求，可以自定义规则配置文件，服务配置后面再添加 `-group [组名]`。

被 `-exclude-default-group` 标记为排除在默认组之内的服务需至少在一个组才可能被访问到。

## 启动

```fish
# smartdns -c smartdns.conf
or
# systemctl enable --now smartdns.service
```

默认在后台运行，推荐使用自带的 [`systemd service`](https://github.com/pymumu/smartdns/blob/master/systemd/smartdns.service.in) 来进行管理，如果 `/ect/resolv.conf` 没有被更改成监听本地的话可以检查一下文件是否有特殊标志位(`lsattr`)，手动修改即可(`chattr` )。

```fish
$ cat /etc/resolv.conf

# DNS managed by SmartDNS
nameserver 127.0.0.1
```

> [Banner Artwork](https://wallhaven.cc/w/0qx3x7)
