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
      },
    },

    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'sqrthree/vuepress-theme-api',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'sqrthree/vuepress-theme-api',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    // editLinkText: 'Help us improve this page',
    // lastUpdated: 'Last Updated', // string | boolean
    lastUpdated: true, // string | boolean

    // sidebarGroupOrder: [
    //   'getting-started',
    //   'configurations',
    // ],
  },
}
