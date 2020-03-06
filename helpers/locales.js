// The file must be commonjs module due to /index.js.
exports.defaultLocales = {
  '/': {
    container: {
      tip: 'TIP',
      warning: 'WARNING',
      danger: 'DANGER',
    },
  },
  '/zh/': {
    container: {
      tip: '提示',
      warning: '注意',
      danger: '警告',
    },
  },
}

exports.getDefaultLocales = ($locale, scope, prop) => {
  try {
    return exports.defaultLocales[$locale][scope][prop]
  } catch (_err) {}

  try {
    return exports.defaultLocales['/'][scope][prop]
  } catch (_err) {}

  return ''
}
