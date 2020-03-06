module.exports = {
  plugins: [
    '@vuepress/active-header-links',
    [
      'container',
      {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示',
        },
      },
    ],
    [
      'container',
      {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意',
        },
      },
    ],
    [
      'container',
      {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告',
        },
      },
    ],
    [
      'container',
      {
        type: 'details',
        before: info =>
          `<details class="custom-block details">${
            info ? `<summary>${info}</summary>` : ''
          }\n`,
        after: () => '</details>\n',
      },
    ],
    ['smooth-scroll', true],
  ],
}
