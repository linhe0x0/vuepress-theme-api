---
title: Built-in Components
---

<Block>

# Built-in Components

Thanks to [Using Vue in Markdown](https://vuepress.vuejs.org/guide/using-vue.html) feature of `VuePress`, we can directly use Vue components in Markdown files.

In order to better display the content of the document, the theme has built-in several useful components, which you can use directly in any Markdown file.

Built-in components are available out of the box, and you can still write Markdown syntax content in the components.

Currently, the following components are mainly built-in:

[[toc]]

</Block>

<Block>

## Block Component

The `Block` component is mainly used to divide the page structure. Each `Block` component is a content group. It is convenient for you to control the page structure freely and flexibly.

<Example>

Usage:

```vue
<Block>

Contents...

</Block>
```

</Example>

</Block>

<Block>

## API Component

The `API` component is the alias of `<Block>` component.

<Example>

Usage:

```vue
<API>

## Endpoint

GET https://api.github.com/users/:username

</API>
```

</Example>

</Block>

<Block>

## Example Component

The `Example` component is used to specify the content of the dark area on the right in the `<Block>` component. It can clearly identify the current part of the content as a use case.

<Example>

Usage:

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

## CURL Component

The `CURL` component is a very useful component for better displaying `curl` commands when writing APIs.

For example, the following content will be rendered into the form on the right:

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

The `CURL` component will automatically generate a button below the component. When the button is clicked, it will analyze the parameters in the `curl` command and send a request via `Ajax` to the corresponding url. And output its request information to the `console` panel. Convenient for quick test and preview.

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

e.g.：

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

In addition, the content of `curl` on the right can be directly edited and then sent the request with changes. The modification will take effect immediately. This is very useful when you want to modify some parameters temporarily.

</Block>

<Block>

## Button Component

The `Button` component can be used anywhere on any page. You can use it to point to a link or some special content.

The supported parameters are as follows:

| Name  |  Type   |              Description               | Default |
| :---: | :-----: | :------------------------------------: | :-----: | :--: |
|  to   | String  |               page link                |  `""`   |
| size  | String  | Set the size of button, values: `small | large`  | `""` |
| light | Boolean |       Whether to use light theme       | `false` |

Use the following code to render a button:

```vue
<Button>Default state</Button>
```

Rendered:

<Button>Default state</Button>

<br>
<br>

Page link:

```vue
<Button to="/">Homepage</Button>
```

Rendered:

<Button to="/">Homepage</Button>

<Example>

More use cases:

```vue
<Button light>Light theme</Button>
```

<Button light>Light theme</Button>

```vue
<Button to="https://github.com/sqrthree/vuepress-theme-api" light>Page link</Button>
```

<Button to="https://github.com/sqrthree/vuepress-theme-api" light>Page Link</Button>

```vue
<Button size="small" light>Other size</Button>
```

<Button size="small" light>Other size</Button>

</Example>

</Block>

<Block>

## Section Component

The `Section` component is a special layout form, mainly used in [Homepage Layout](/#build-for-restful-api). Refer to [Homepage | Build for RESTful API](/#build-for-restful-api) to preview.

|    Name     |  Type   |                 Description                  | Default  |
| :---------: | :-----: | :------------------------------------------: | :------: |
|    theme    | String  |        Set the theme `dark \| light`         | `"dark"` |
|   center    | Boolean | The specify which way that content is aligned |  `true`  |
| enhancedMode | Boolean |       Whether to enable enhanced mode        |  `true`  |

::: tip Enhanced mode
Enhanced mode means that the `Section` component breaks through the limit of the parent element width and achieves the same effect as the width of the browser window.
:::

<Example>

The configuration used in the homepage:

```vue
<Section>

## Build for RESTful API

A easy-to-use, minimalist theme for VuePress.

With out-of-the-box feature, all you need to do is install it and write something.

<br>

<Button type="light" to="/getting-started/">Getting Started</Button>

</Section>
```

</Example>

</Block>
