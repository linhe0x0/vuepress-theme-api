// The file must be commonjs module due to /index.js.
exports.defaultLocales = {
  '/': {
    lastUpdated: 'Last Updated',
    editLinkText: 'Edit this page',
    container: {
      tip: 'TIP',
      warning: 'WARNING',
      danger: 'DANGER',
    },
  },
  '/zh/': {
    lastUpdated: '上次更新',
    editLinkText: '编辑此页面',
    container: {
      tip: '提示',
      warning: '注意',
      danger: '警告',
    },
  },
}

exports.getDefaultLocales = ($locale, path) => {
  let value = exports.defaultLocales[$locale] || exports.defaultLocales['/']

  path.split('.').forEach((item) => {
    value = value[item]
  })

  return value
}
