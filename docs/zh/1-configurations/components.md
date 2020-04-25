---
title: 内置组件
---

<Block>

# 内置组件

得益于 `VuePress` 的 [组件支持特性](https://vuepress.vuejs.org/zh/guide/using-vue.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84-api-%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6)，我们可以在 Markdown 文件中直接使用 Vue 组件。

为了更好的展示文档内容，主题内置了几个非常有用的组件，你可以在任一 Markdown 文件中直接使用。

内置组件开箱即用，并且在组件内仍旧可以写 Markdown 语法的内容。

目前主要内置了以下组件：

[[toc]]

</Block>

<Block>

## Block 组件

`Block` 组件主要用于在本页所使用的布局中划分页面结构。每个 `Block` 组件为一个内容分组。方便你能够自由灵活地把控页面结构。

<Example>

使用方式：

```vue
<Block>

Contents...

</Block>
```

</Example>

</Block>

<Block>

## Example 组件

`Example` 组件用于在 `<Block>` 组件中指定右侧深色区域的内容。可以清晰地标识当前部分内容为使用案例。

<Example>

使用方式：

```vue
<Block>

Contents...

<Example>

Some examples...

</Example>

</Block>
```

</Example>

</Block>

<Block>

## CURL 组件

`CURL` 组件是一个非常有用的组件。主要用于在编写 API 时更好的显示 `curl` 命令时使用。

例如下面的内容将会渲染成右侧的形式：

````vue
<CURL>
```bash
curl -X POST https://api.example.com/v1/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <const name="MOCK_TOKEN" />' \
  --data '{
    "username": "my-username",
    "password": "my-password"
  }'
```
</CURL>
````

`CURL` 组件会在组件下方自动生成一个按钮，当点击按钮时，会通过分析 `curl` 命令内的参数，通过 `Ajax` 发送请求到对应的地址上。并将其请求信息输出到信息面板上。方便进行快速测试和预览。

<Example>

<CURL>

```bash
curl -X POST http://api.example.com/api/auth/login \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <const name="MOCK_TOKEN" />' \
  --data '{
    "username": "my-username",
    "password": "my-password"
  }'
```
</CURL>

</Example>


例如：

````vue
<CURL>
```bash
curl -X GET https://api.github.com/users/sqrthree
```
</CURL>
````

<Example>

<Blank height="148px" />

<CURL>
```bash
curl -X GET https://api.github.com/users/sqrthree
```
</CURL>

</Example>

</Block>

<Block>

## Button 组件

Button 组件可以使用在任何页面的任何地方。你可以用来指向一个链接，或是一些特殊的内容。

支持的参数如下：

| Name | Type | Description | Default |
| :-: | :-: | :-: | :-: | :-: |
| to | String | 链接地址 | `""` |
| size | String | 按钮大小，可选值有 `small | large` | `""` |
| light | Boolean | 是否采用亮色主题 | `false` |

使用下面的代码即可放置一个按钮：

```vue
<Button>默认状态</Button>
```

效果如下：

<Button>默认状态</Button>

<br>
<br>

站内跳转：

```vue
<Button to="/zh/">首页</Button>
```

效果如下：

<Button to="/zh/">首页</Button>

<Example>

更多使用案例：

```vue
<Button light>亮色主题</Button>
```

<Button light>亮色主题</Button>

```vue
<Button to="https://github.com/sqrthree/vuepress-theme-api" light>指定为一个链接</Button>
```

<Button to="https://github.com/sqrthree/vuepress-theme-api" light>指定为一个链接</Button>

```vue
<Button size="small" light>不同的 size</Button>
```

<Button size="small" light>不同的 size</Button>

</Example>

</Block>

<Block>

## Section 组件

`Section` 组件是一种特殊的布局形式，主要用于 [首页](/zh/#%E4%B8%BA-restful-api-%E8%80%8C%E7%94%9F)。具体效果可参考 [首页 | 为 RESTful API 而生](/zh/#%E4%B8%BA-restful-api-%E8%80%8C%E7%94%9F)。

| Name | Type | Description | Default |
| :-: | :-: | :-: | :-: | :-: |
| theme | String | 主题颜色，可选值有 `dark | light` | `"dark"` |
| center | Boolean | 内容是否居中 | `true` |
| enhanceMode | Boolean | 是否启用增强模式 | `true` |

::: tip 增强模式
增强模式是指该 `Section` 组件突破父级元素宽度限制，达到和浏览器窗口宽度一致的效果。
:::

<Example>

首页中使用的配置案例为：

```vue
<Section>

## 为 RESTful API 而生

一个简洁易用的 VuePress 主题。

开箱即用，你需要做的只是安装它，然后写吧。

<Button type="light" to="/getting-started/">开始出发</Button>

</Section>
```

</Example>

</Block>
