const normalize = args => {
  const shortMap = {
    X: 'request',
    A: 'user-agent',
    e: 'referer',
    G: 'get',
    F: 'form',
    H: 'header',
    d: 'data',
  }

  const result = []

  args.forEach((item, index) => {
    if (isURL(item)) {
      result.push('--url', item)
    } else if (item.length > 1 && item[0] === '-' && item[1] !== '-') {
      result.push(`--${shortMap[item.substring(1)]}`)
    } else if (/^[\'\"](.*\s*)*[\'\"]$/.test(item)) {
      result.push(item.slice(1, -1))
    } else {
      result.push(item)
    }
  })

  return result
}

const parseOptions = args => {
  const result = {}
  let lastOption = ''

  args.forEach(item => {
    if (/^--/.test(item)) {
      lastOption = item.substring(2)
    } else if (parametersSupportingMultipleValues.includes(lastOption)) {
      if (!result[lastOption]) {
        result[lastOption] = []
      }

      result[lastOption].push(item)
    } else {
      result[lastOption] = item
    }
  })

  return result
}

export const parametersSupportingMultipleValues = ['header']

export function isCURL(cmd) {
  return cmd.startsWith('curl')
}

export function isURL(url) {
  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) return false

  // ensure URL starts with HTTP/HTTPS
  const urlRegexp = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
  const localhost = /^(https?:\/\/)?localhost(\:\d+)*(?:[^\:?\d]\S*)?$/

  return urlRegexp.test(url) || localhost.test(url)
}

export function resolveArgs(cmd) {
  const rawArgs = cmd.substring(5)
  const argsList = rawArgs
    .match(/"[^"]+"|'[^']+'|\S+/g)
    .filter(item => item.trim() !== '\\')

  return parseOptions(normalize(argsList))
}

export function resolveHeaders(headers) {
  const result = {}

  headers.forEach(item => {
    const [attr, value] = item.split(':')

    result[attr.trim()] = value.trim()
  })

  return result
}
