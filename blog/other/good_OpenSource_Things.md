---
title: 好用的开源东西
authors: [zwz6666]
tags: [技术]
date: 2025-8-20
#description: 
#slug: 
unlisted: true
---
*尚未完成*

rt，本文主要记录一些好用的开源东东，包括但不限于：底层架构、编程语言、实用工具、好用或有趣的软件甚至一些另类的开源作品。

<!-- truncate -->

## 第一部分 前言

### 1.1 开源的定义

开源（Open Source）通常是指源代码公开，任何人都可以查看并在一定的限制下修改和分发的模式，不止局限于软件的开发，主体也可以是一些纯文字的资料。它通常遵循某些开源许可证，如GPL、MIT、Apache等，这些许可证规定了使用、修改和分发的规则。

开源的核心理念是共享与协作，通过开放代码促进技术进步和创新。

（*以上内容采取 AI 辅助编写*)

### 1.2 常见开源许可证

首先，无论哪种许可证，几乎都有几点共同点：

1. 需要保留原作品的版权声明和许可声明；
2. 按原样（AS IS）提供，原作者不承担任何因此带来的风险；

![部分常见许可证对比](https://www.runoob.com/wp-content/uploads/2018/03/da68b98e404578126b87c5afd9ba9bc3.png "部分常见许可证对比图")
上图：部分常见许可证对比图（图源：[菜鸟教程](https://www.runoob.com/wp-content/uploads/2018/03/da68b98e404578126b87c5afd9ba9bc3.png)）

### 1.2.1 MIT[^1]

几乎是最宽松的许可证，要求几乎就是：

- 需包含原版权声明和许可声明。

其余的，包括你是不是商业使用、衍生作品开不开源以及如何使用、分发、修改等都没有限制。  
特别地，修改后可以以其它任何许可证发布。

[Github](https://github.com) 上的解释：
>A short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.
>
> 一种短而简单的许可证，仅需要保留版权和许可声明。被许可的作品、修改作品和更大的作品可以在不同的条款下分发，并且无需提供源代码。

### 1.2.2 Apache License[^2]

Apache License（Apache许可证），是Apache软件基金会发布的一个自由软件许可证。

Apache Licence 是著名的非盈利开源组织 Apache 采用的协议。该协议和 BSD 类似，同样鼓励代码共享和最终原作者的著作权，同样允许源代码修改和再发布。但是也需要遵循以下条件：

- 需要给代码的用户一份 Apache Licence。
- 如果修改了代码，需要在被修改的文件中说明。
- 在衍生的代码中（修改和有源代码衍生的代码中）需要带有原来代码中的协议，商标，专利声明和其他原来作者规定需要包含的说明。
- 如果再发布的产品中包含一个Notice文件，则在Notice文件中需要带有Apache Licence。你可以再Notice中增加自己的许可，但是不可以表现为对Apache Licence构成更改。
- Apache Licence也是对商业应用友好的许可。使用者也可以再需要的时候修改代码来满足并作为开源或商业产品发布/销售。

使用这个协议的好处是:

- 永久权利。一旦被授权，永久拥有。
- 全球范围的权利。在一个国家获得授权，适用于所有国家。假如你在美国，许可是从印度授权的，也没有问题。
- 授权免费。无版税， 前期、后期均无任何费用。
- 授权无排他性。任何人都可以获得授权
- 授权不可撤消。一旦获得授权，没有任何人可以取消。比如，你基于该产品代码开发了衍生产品，你不用担心会在某一天被禁止使用该代码

### 1.2.3 GPL

GPL （GNU General Public License） ：GNU通用公共许可协议。

特点：要求基于 GPL 软件的衍生作品也**必须遵循 GPL 协议**。~~传染性和流行性~~

### 1.2.4 LGPL

### 1.2.5 CC

详细的请自行搜索。

[^1]: <https://baike.baidu.com/item/MIT%E8%AE%B8%E5%8F%AF%E8%AF%81/6671281>
[^2]: <https://www.runoob.com/w3cnote/open-source-license.html>
