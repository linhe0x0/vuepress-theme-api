---
title: 文件模板
---

<Block>

# 文件模板

大多数情况下，书写文档时都可采用右侧的结构：

除此之外，我们也为你准备了一个开箱即用的完整使用案例，方便你进行快速初始化一个文档项目。你可以在 [sqrthree/vuepress-theme-api-starter-kit](https://github.com/sqrthree/vuepress-theme-api-starter-kit) 获取更多信息。

<Example>

普通文档模板：

```md
---
title: 文档标题
---

<Block>

## 标题

主要内容...

<Example>

示例...

</Example>

</Block>
```

API 文档模板：

```md
---
title: 文档标题
---

<Block>

## API 名称

主要内容...

### 端点

### Parameters

| Name | Type | Description | Required |
| :-: | :-: | :-: | :-: |
| 必选参数 | String |  | :heavy_check_mark: |
| 可选参数 | String |  | :heavy_minus_sign: |

### Response

响应示例...

<Example>

<CURL>
curl...
</CURL>

</Example>

</Block>
```

</Example>

</Block>
