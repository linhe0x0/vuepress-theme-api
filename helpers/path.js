export function isHomePage(path, base) {
  return path === base
}

export function splitWithBasePath(path, base) {
  return path.startsWith(base) ? path.substring(base.length) : path
}

export function matchGroupNameFromPath(path, base) {
  const relativePath = splitWithBasePath(path, base)

  return relativePath.split('/')[0]
}

export function matchLocalePathFromPath(path, locales) {
  const localeList = Object.keys(locales).filter(item => item !== '/') // omit '/'

  for (let i = 0, len = localeList.length; i < len; i++) {
    const localePath = localeList[i]

    if (path.startsWith(localePath)) {
      return localePath
    }
  }

  return '/'
}
