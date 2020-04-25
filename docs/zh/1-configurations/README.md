---
title: '基本配置'
---

<Block>
# 基本配置
</Block>

<Block>

## 配置文件

`VuePress` 项目必要的配置文件是 `.vuepress/config.js`。

参考 [VuePress | 配置文件](https://vuepress.vuejs.org/zh/guide/basic-config.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6) 来查看详细信息。

<Example>

```js{4}
module.exports = {
  title: 'Hello, World.',
  description: '📦 🎨 A api-friendly theme for VuePress.',
  theme: 'api',
}
```

</Example>

</Block>

<Block>

### VuePress 配置

我们尽可能的打造一个开箱即用的主题，让你摈弃复杂的配置项，真正专注于编写文档。

但仍然提供了一些基本的配置项用于个性化配置，这些配置并不是必须的。

参考 [VuePress | 配置](https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE) 来查看 `VuePress` 支持的基本配置项。所有 `VuePress` 文档中的支持的基本配置在本主题中同样适用。

</Block>

<Block>

## 首页配置

主题内提供了一个首页（Homepage）的布局。正如你在 [这个文档](/zh/) 中所看到的那样。

想要使用它，需要在你的根级 `README.md` 的 `YAML front matter` 指定 `home: true`。

以下是这个网站实际使用的数据：

```yaml
---
home: true
title: Hello, World.
description: 不知道从哪里开始？我们准备了一些你可以用来开始构建的便捷指南和参考文档。
actionText: 开始出发
actionLink: /getting-started
footer: Open Source on [GitHub](https://github.com/sqrthree/vuepress-theme-api), Made by [@sqrthree](https://github.com/sqrthree), Power by [vuepress](https://github.com/vuejs/vuepress).
---
```

<Example>

- `home` - 标记当前页面是否应用首页布局。
- `title` - 首页的标题。
- `description` - 首页描述。
- `actionText`: 首页按钮的文字。
- `actionLink`: 点击按钮访问的页面地址。
- `footer`: 首页底部信息。

</Example>

</Block>

<Block>

## 侧边导航配置

文档页面的侧边导航默认按照文件目录结构自动生成。

侧边栏的生成规则如下：

- 检索目录，按照 **目录/文件夹** 进行分组；
- 如果目录下有 `README.md` 文件，则读取其标题作为该分组下第一个导航项。如果文件 `YAML front matter` 中配置了 `title` 项，会采用其值作为标题，否则分析出文章中的第一个标题作为文章标题。如果存在该文件但未配置其标题，则降级为文件目录作为其标题；
- 分析出文章中的所有最 `top` 级标题，作为该分组的导航项；
- 检索该目录下的其他文件，作为该分组的剩余导航项；
- 分析文件中的最 `top` 级标题，做为该文件对应的导航项中的子导航项（默认折叠）。

### 自定义侧边栏顺序

默认情况下，导航栏的分组是按照文件夹首字母排序的，有时候可能不是你想要的顺序，这时，你可以通过配置 `themeConfig.sidebarGroupOrder` 来控制侧边栏的排序方式。

配置的方式如下：

```js
themeConfig: {
  sidebarGroupOrder: [
    'getting-started', // 分组名称，即文件夹名称
    'configurations'
  ],
}
```

如果有多语言配置需求，可以配置 `themeConfig.locales[LANG].sidebarGroupOrder` 项：

```js
themeConfig: {
  locales: {
    '/': {
      sidebarGroupOrder: [
        'getting-started',
        'configurations',
      ]
    },
    '/zh/': {
      sidebarGroupOrder: [
        'getting-started',
        'configurations',
      ]
    },
  },
},
```

### 自定义侧边栏内容

如果不满意默认的侧边栏，你也可以通过配置 `themeConfig.sidebar` 来控制侧边栏。

配置时 `themeConfig.sidebar` 的值请参考以下结构：

```js
themeConfig: {
  sidebar: {
    '分组名称': {
      title: '基本配置', // 导航项文字。
      to: '/zh/configurations/', // 导航项链接地址。

      // 该分组下的其他导航项，默认展示。
      children: [
        {
          title: '内置组件',
          to: '/zh/configurations/components.html',

          // 该导航项所包含的子导航项，默认被折叠。用于展示某个页面的所有标题导航。
          headers: [
            {
              title: 'Block 组件',
              slug: 'block-组件', // 当前页面的 id 锚点。
            },
          ],
        },
      ],
    },
  },
},
```

如果有多语言配置需求，可以配置 `themeConfig.locales[LANG].sidebar` 项：

```js
themeConfig: {
  locales: {
    '/': {
      sidebar: {
        'getting-started': {
          title: 'Getting Started',
          to: '/getting-started/',
          children: [],
        },
      },
    },
    '/zh/': {
      '分组名称': {
        title: '基本配置', // 导航项文字。
        to: '/zh/configurations/', // 导航项链接地址。

        // 该分组下的其他导航项，默认展示。
        children: [
          {
            title: '内置组件',
            to: '/zh/configurations/components.html',

            // 该导航项所包含的子导航项，默认被折叠。用于展示某个页面的所有标题导航。
            headers: [
              {
                title: 'Block 组件',
                slug: 'block-组件', // 当前页面的 id 锚点。
              },
            ],
          },
        ],
      },
    },
  },
},
```

<Example>

### 自定义侧边栏顺序：

```js
// .vuepress/config.js
themeConfig: {
  sidebarGroupOrder: [
    'getting-started', // 分组名称，即文件夹名称
    'configurations'
  ],
}
```

多语言下的自定义侧边栏顺序：

```js
// .vuepress/config.js
themeConfig: {
  locales: {
    '/': {
      sidebarGroupOrder: [
        'getting-started',
        'configurations',
      ]
    },
    '/zh/': {
      sidebarGroupOrder: [
        'getting-started',
        'configurations',
      ]
    },
  },
}
```

### 自定义侧边栏内容：

```js
// .vuepress/config.js
themeConfig: {
  sidebar: {
    configurations: {
      title: '基本配置',
      to: '/zh/configurations/',
      children: [
        {
          title: '内置组件',
          to: '/zh/configurations/components.html',
          headers: [
            {
              title: 'Block 组件',
              slug: 'block-组件'
            }
          ]
        },
        {
          title: '文件模板',
          to: '/zh/configurations/template.html',
          headers: []
        }
      ]
    }
  }
}
```

多语言下的自定义侧边栏内容：

```js
// .vuepress/config.js
themeConfig: {
  locales: {
    '/': {
      sidebar: {
        'getting-started': {
          title: 'Getting Started',
          to: '/getting-started/',
          children: [],
        },
      },
    },
    '/zh/': {
      sidebar: {
        '分组名称': {
          title: '基本配置',
          to: '/zh/configurations/',
          children: [
            {
              title: '内置组件',
              to: '/zh/configurations/components.html',
              headers: [
                {
                  title: 'Block 组件',
                  slug: 'block-组件',
                },
              ],
            },
          ],
        },
      },
    },
  },
},
```

</Example>

</Block>

<Block>

## 页面布局

文档页默认采用普通形式（通栏）的布局结构，例如 [起步页面](/zh/getting-started/)。同时得益于 `VuePress` 的 [组件支持特性](https://vuepress.vuejs.org/zh/guide/using-vue.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84-api-%E8%AE%BF%E9%97%AE%E9%99%90%E5%88%B6)，我们可以在 Markdown 文件中直接使用 Vue 组件。因此，我们可以轻松构造出本页面这种 `RESTful API` 友好的页面布局。

要使用这种布局，需要了解主题内提供的几个组件。具体使用方式请参考 [内置组件](/zh/configurations/components.html)。

如果你觉得内置组件过于繁琐，也可以通过在文件顶部的 `YAML front matter` 中配置 `enhance: true` 启用**增强模式**。

::: tip
在增强模式下，JS 会在**运行时**自动分析提取页面内容，并结构化应用布局。
:::

::: warning
增强模式目前仍处于实验性阶段。
:::

<Example>

启用增强模式（实验性功能）：

```yaml
---
enhance: true
---
```

</Example>

</Block>

<Block>

## 多语言配置

主题支持 `VuePress` 配置文件中的多语言配置。具体配置项请参考 [VuePress | 多语言支持](https://vuepress.vuejs.org/zh/guide/i18n.html#%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%94%AF%E6%8C%81)。

::: tip 扩展字段
我们在 `VuePress` 标准配置中扩展了 `text` 字段，作为左侧导航栏中对应语言的标识。如果该字段不存在，则自动降级使用 `lang` 字段的值。
:::

<Example>

本站使用的配置：

```js{6-31}
module.exports = {
  title: 'Hello, World.',
  description: '📦 🎨 A api-friendly theme for VuePress.',
  theme: 'api',
  base: '/vuepress-theme-api/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Hello, World.',
      text: 'english',
      description: '📦 🎨 A api-friendly theme for VuePress.',
    },
    '/zh/': {
      lang: 'zh-hans',
      title: 'Hello, World.',
      text: '中文',
      description: '📦 🎨 一个面向 RESTful API 设计的开箱即用主题。',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
      }
    }
  }
}

```

</Example>

</Block>
