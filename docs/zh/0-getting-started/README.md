# 起步

## 构建于

该项目基于以下开源技术构建：

- [Node.js](https://nodejs.org/)
- [VuePress](https://github.com/vuejs/vuepress)

## 环境依赖

在开始使用本主题之前，请确保安装有以上环境。

- [Node.js](https://nodejs.org/)
- [VuePress](https://github.com/vuejs/vuepress)
- [vuepress-theme-api](https://github.com/sqrthree/vuepress-theme-api)

如果你已经有了 [Node.js](https://nodejs.org/) 环境，可以通过以下命令安装 `VuePress` 和 `vuepress-theme-api`。

```bash
# 安装 vuepress
yarn global add vuepress # OR npm install -g vuepress

# 安装主题
yarn global add vuepress-theme-api # OR npm install -g vuepress-theme-api
```

::: warning 本地依赖
如果你想在一个现有项目中使用 `VuePress`，同时想要在该项目中管理文档，则应该将 `VuePress` 安装为本地依赖。需要注意的是，你同时需要将 [vuepress-theme-api](https://github.com/sqrthree/vuepress-theme-api) 安装为本地依赖。
:::

## 应用主题

`VuePress` 默认情况下将会使用自带的默认主题，因此我们需要在 `.vuepress/config.js` 中配置 theme 选项指定为 `vuepress-theme-api` 来应用主题。更多详情请参考 [VuePress | 自定义主题](https://vuepress.vuejs.org/zh/guide/custom-themes.html#%E4%BD%BF%E7%94%A8%E6%9D%A5%E8%87%AA-npm-%E7%9A%84%E4%B8%BB%E9%A2%98)。

```js{5}
// .vuepress/config.js
module.exports = {
  title: 'Hello, World.',
  description: '📦 🎨 A api-friendly theme for VuePress.',
  theme: 'api',
}
```
