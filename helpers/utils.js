import config from './config'

const matchFileName = path => {
  if (/\/$/.test(path)) return 'README'

  const arr = path.split('/')

  if (/\.html$/.test(path)) return arr[arr.length - 1].slice(0, -5)

  return ''
}

export function title(str) {
  const regex = /(?:(?:(\s?(?:^|[.\(\)!?;:"-])\s*)(\w))|(\w))(\w*[’']*\w*)/g
  const specials = ['http', 'https', 'cli', 'api']

  return str
    .toLowerCase()
    .replace(regex, (m, lead = '', forced, lower, rest) => {
      if (specials.includes(m)) return m.toUpperCase()

      return lead + (lower || forced).toUpperCase() + rest
    })
}

export function isExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isJSON(str) {
  try {
    const obj = JSON.parse(str)
    return !!obj && typeof obj === 'object'
  } catch (e) {
    /* ignore */
  }

  return false
}

export function isQueryString(str) {
  return /^(\w+(=\'?\"?[\w-]?\'?\"?)?(&\w+(=\'?\"?[\w-]*\'?\"?)?)*)+$/.test(str)
}

export function parseQueryString(str) {
  const result = {}

  str.split('&').forEach(item => {
    const [attr, rawValue] = item.split('=')

    let value

    if (/^\d+$/g.test(rawValue)) {
      // convert number-like rawValue to a number
      value = parseInt(rawValue)
    } else if (rawValue === 'true') {
      // convert bookean-like rawValue to boolean
      value = true
    } else if (rawValue === 'false') {
      value = false
    } else if (/^[\'\"]\w+[\'\"]$/.test(rawValue)) {
      // remove unnecessary quotes
      value = rawValue.slice(1, -1)
    } else {
      value = rawValue
    }

    result[attr.trim()] = value
  })

  return result
}

export function isAbsolute(path) {
  return path.charAt(0) === '/'
}

export function normalize(path) {
  const trailingSlash = path.substr(-1) === '/'

  let p = path
    .split('/')
    .filter(item => !!item)
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
