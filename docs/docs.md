---
title: 写给自己看到教程
date: 2000-1-1T0:0
authors: [zwz6666]
tags: []
---
rt，这个文章主要是写给自己看的，记叙一些杂七杂八的东西，防止太零散了不好找。
<!-- truncate -->
## 文档编写

1. ```<!-- truncate -->``` 标签  

用来截断主要内容也就是摘要，一般来讲每个文章都要有，不然有的地方就显示老长一串。

```.mdx``` 文件中是 ```{/* truncate */}```。

2. 元数据  
比如本文章的：

```yml  
---
title: 写给自己看到教程
date: 2000-1-1T0:0
authors: [zwz6666]
tags: []
---
```

还有别的的：

```yml title="blog/authors.yml"
zwz6666:
  name: Zhong WZ
  description: 网站所有者
  title: 一个普通中学生
  url: https://zhongwz.top/wordpress
  image_url: https://cdn.luogu.com.cn/upload/usericon/1053876.png
  page:
    permalink: '/me'
  socials:
    luogu: https://luogu.com.cn/user/1053876
    github: CN-zwz
```

```yml title="blog/tags.yml
hello:
  label: Hello
  permalink: /hello
  description: Hello tag description
```

这个的 ```permalink``` 似乎是把 ```@site/tags/``` 当作根目录,有没有开头的斜杠似乎也不影响，但可以再在前面加文件夹。

3. 防爬（文明地设置规则）

```text title="static/robots.txt"
User-agent: *
Disallow: /
```
