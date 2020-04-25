export function isExternalLink(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function isJSON(str) {
  try {
    const obj = JSON.parse(str)
    return !!obj && typeof obj === 'object'
  } catch (_e) {
    /* ignore */
  }

  return false
}

export function isQueryString(str) {
  return /^(\w+(=\'?\"?[\w-]?\'?\"?)?(&\w+(=\'?\"?[\w-]*\'?\"?)?)*)+$/.test(str)
}

export function isURL(url) {
  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) return false

  // ensure URL starts with HTTP/HTTPS
  const urlRegexp = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
  const localhost = /^(https?:\/\/)?localhost(\:\d+)*(?:[^\:?\d]\S*)?$/

  return urlRegexp.test(url) || localhost.test(url)
}

export function isAbsolute(path) {
  return path.charAt(0) === '/'
}
