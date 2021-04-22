# Getting Started

## Build with

The project is based on the following open source technologies:

- [Node.js](https://nodejs.org/)
- [VuePress](https://github.com/vuejs/vuepress)

## Dependencies

Before you start using this theme, please make sure that the following dependencies are installed.

- [Node.js](https://nodejs.org/)
- [VuePress](https://github.com/vuejs/vuepress)
- [vuepress-theme-api](https://github.com/sqrthree/vuepress-theme-api)

If you already have [Node.js](https://nodejs.org/), you can install `VuePress` and `vuepress-theme-api` with the following commands.

```bash
# Install VuePress
yarn global add vuepress # OR npm install -g vuepress

# Install theme
yarn global add vuepress-theme-api # OR npm install -g vuepress-theme-api
```

::: warning Local Dependencies
If you want to use `VuePress` in an existing project and manage documents in that project, you should install VuePress as a local dependency. It should be noted that you also need to install [vuepress-theme-api](https://github.com/sqrthree/vuepress-theme-api) as a local dependency.
:::

## How to use

`VuePress` will use its own default theme by default, so we need to configure the theme option in `.vuepress/config.js` to specify `vuepress-theme-api` to apply the theme. See [VuePress | Using a theme](https://vuepress.vuejs.org/theme/using-a-theme.html) to get more details.

```js{5}
// .vuepress/config.js
module.exports = {
  title: 'Hello, World.',
  description: '📦 🎨 A api-friendly theme for VuePress.',
  theme: 'api',
}
```
