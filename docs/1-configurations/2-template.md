---
title: File template
---

<Block>

# File template

In most cases, the structure on the right can be used when writing a document:

In addition, we have also prepared a complete use case out of the box for you, which is convenient for you to quickly initialize a document project. You can get more information at [sqrthree/vuepress-theme-api-starter-kit](https://github.com/sqrthree/vuepress-theme-api-starter-kit)

<Example>

General document template:

```md
---
title: Page Title
---

<Block>

## Title

Main content...

<Example>

Example...

</Example>

</Block>
```

API document template:

```md
---
title: Page Title
---

<Block>

## API name

API description...

### Endpoint

### Parameters

|        Name         |  Type  | Description |      Required      |
| :-----------------: | :----: | :---------: | :----------------: |
| Required parameters | String |             | :heavy_check_mark: |
| Optional parameters | String |             | :heavy_minus_sign: |

### Response

Response case...

<Example>

<CURL>
curl...
</CURL>

</Example>

</Block>
```

</Example>

</Block>
