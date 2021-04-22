---
title: 'Config Reference'
---

<Block>

# Config Reference

</Block>

<Block>

## Config File

The essential file for configuring a VuePress site is `.vuepress/config.js`。

See [VuePress | Config File](https://vuepress.vuejs.org/guide/basic-config.html) to get more details.

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

### Configuration

We try our best to create an out-of-the-box theme, let you forget about complex configuration items and really focus on writing.

But we still provide some basic configuration items for personalized configuration, these configurations are not necessary.

Go to [VuePress | Config Reference](https://vuepress.vuejs.org/config/) to get the basic configuration items supported by `VuePress`. All the basic configurations supported in the `VuePress` document are also applicable in this theme.

</Block>

<Block>

## Homepage

A Homepage layout is provided in the theme. As you can see in [this document](/).

To use it, you need to specify `home: true` in the `YAML front matter` of your root `README.md`.

The following is the actual configuration used by this website:

```yaml
---
home: true
title: Hello, World.
description: Not sure where to start? We’ve put together some handy guides and reference documentation you can use to start building.
actionText: Getting Started
actionLink: /zh/0-getting-started/
footer: Open Source on [GitHub](https://github.com/sqrthree/vuepress-theme-api), Made by [@sqrthree](https://github.com/sqrthree), Power by [vuepress](https://github.com/vuejs/vuepress).
---
```

<Example>

- `home` - Whether the current page uses the homepage layout.
- `title` - The title of the homepage.
- `description` - The description of the homepage。
- `actionText`: The text of the home button.
- `actionLink`: The url where the page jumps after clicking the button.
- `footer`: Information at the bottom of the homepage.

</Example>

</Block>

<Block>

## Sidebar

The side navigation of the document page is automatically generated according to the file directory structure with following rules by default:

- Retrieve directories and group them according to folders;
- If there is a `README.md` file in the directory, read its title as the first navigation item in the group. If the `title` item is configured in `YAML front matter`, its value will be used as the title, otherwise the first title in the file will be analyzed as the page title. If the file exists but its title is not configured, it will be downgraded to the file directory as its title;
- Analyze all the top headings in the file as the navigation item of the group.
- Retrieve other files in the directory as the remaining navigation items of the group;
- Analyze the top headers in other files as sub-navigation items in the navigation items corresponding to the file;

### Customize the order of sidebar items

By default, the grouping of the navigation bar is sorted by the first letter of the folder name. Sometimes it may not be the order you want. You can configure the `themeConfig.sidebarGroupOrder` to control the sorting of the sidebar.

The configuration is as follows:

```js
themeConfig: {
  sidebarGroupOrder: [
    'getting-started', // Group name, that is, folder name
    'configurations'
  ],
}
```

Or with i81n due to `themeConfig.locales[LANG].sidebarGroupOrder`:

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

### Customize sidebar content

You can also control the sidebar by configuring `themeConfig.sidebar` with the following structure:

```js
themeConfig: {
  sidebar: {
    'Group Name': {
      title: 'Config Reference', // Text of navigation item.
      to: '/configurations/', // Url of navigation item.

      // Other navigation items.
      children: [
        {
          title: 'Built-in Components',
          to: '/configurations/components.html',

          // The sub-navigation items contained in this navigation item are collapsed by default.
          headers: [
            {
              title: 'Block Component',
              slug: 'block-component', // The id anchor of the current sub-navigation item.
            },
          ],
        },
      ],
    },
  },
},
```

Or with i18n due to `themeConfig.locales[LANG].sidebar`:

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
      'Group Name': {
        title: 'Config Reference', // Text of navigation item.
        to: '/configurations/', // Url of navigation item.

        // Other navigation items.
        children: [
          {
            title: 'Built-in Components',
            to: '/configurations/components.html',

            // The sub-navigation items contained in this navigation item are collapsed by default.
            headers: [
              {
                title: 'Block Component',
                slug: 'block-component', // The id anchor of the current sub-navigation item.
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

### Customize the order of sidebar items:

```js
// .vuepress/config.js
themeConfig: {
  sidebarGroupOrder: [
    'getting-started',
    'configurations'
  ],
}
```

Customize the order of sidebar items with i18n:

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

### Customize sidebar content:

```js
// .vuepress/config.js
themeConfig: {
  sidebar: {
    'Group Name': {
      title: 'Config Reference', // Text of navigation item.
      to: '/configurations/', // Url of navigation item.

      // Other navigation items.
      children: [
        {
          title: 'Built-in Components',
          to: '/configurations/components.html',

          // The sub-navigation items contained in this navigation item are collapsed by default.
          headers: [
            {
              title: 'Block Component',
              slug: 'block-component', // The id anchor of the current sub-navigation item.
            },
          ],
        },
      ],
    },
  },
},
```

Customize sidebar content with i81n:

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
      'Group Name': {
        title: 'Config Reference', // Text of navigation item.
        to: '/configurations/', // Url of navigation item.

        // Other navigation items.
        children: [
          {
            title: 'Built-in Components',
            to: '/configurations/components.html',

            // The sub-navigation items contained in this navigation item are collapsed by default.
            headers: [
              {
                title: 'Block Component',
                slug: 'block-component', // The id anchor of the current sub-navigation item.
              },
            ],
          },
        ],
      },
    },
  },
},
```

</Example>

</Block>

<Block>

## Page Layout

By default, the document page adopts the general form (wide column) layout structure, such as the [Getting Started](/0-getting-started/) page. And thanks to [Using Vue in Markdown](https://vuepress.vuejs.org/guide/using-vue.html) feature of `VuePress`, we can directly use Vue components in Markdown files. Therefore, we can easily construct a `RESTful`  API-friendly page layout of this page.

To use API layout, you need to understand several components provided within the theme. For details, please refer to [Built-in Components](/configurations/components.html).

</Block>

<Block>

## i81n

The theme supports i18n config in the VuePress configuration file. For details, please go to [VuePress | Internationalization](https://vuepress.vuejs.org/guide/i18n.html).

::: tip Extra field
We have expanded the `text` field in the standard configuration of `VuePress` as the indicator of the corresponding language in the left navigation bar. If the field does not exist, the value of the `lang` field will be used.
:::

<Example>

Configuration used on this site:

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
      text: 'English',
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
