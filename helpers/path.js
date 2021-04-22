import { isAbsolute } from './is'

export function isHomePage(path, base) {
  return path === base
}

export function normalize(path) {
  const trailingSlash = path.substr(-1) === '/'

  let p = path
    .split('/')
    .filter((item) => !!item)
    .join('/')

  if (p && trailingSlash) {
    p += '/'
  }

  return isAbsolute ? '/' + p : p
}

export function padTrailingSlash(path) {
  return path.endsWith('/') ? path : path + '/'
}

export function localizePath(path, localeBase) {
  const result = path.startsWith(localeBase)
    ? path
    : normalize(localeBase + path)

  return padTrailingSlash(result)
}

export function splitWithBasePath(path, base) {
  return path.startsWith(base) ? path.substring(base.length) : path
}

export function matchGroupNameFromPath(path, base) {
  return splitWithBasePath(path, base).split('/')[0].split('.')[0]
}

export function matchFileName(path) {
  if (/\/$/.test(path)) return 'README'

  const arr = path.split('/')

  if (/\.html$/.test(path)) return arr[arr.length - 1].slice(0, -5)

  return ''
}

export function matchLocalePathFromPath(path, locales) {
  const localeList = Object.keys(locales).filter((item) => item !== '/') // omit '/'

  for (let i = 0, len = localeList.length; i < len; i++) {
    const localePath = localeList[i]

    if (path.startsWith(localePath)) {
      return localePath
    }
  }

  return '/'
}
