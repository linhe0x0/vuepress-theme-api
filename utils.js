const isHomePage = (path, base) => {
  return path === base
}

const splitWithBasePath = (path, base) => {
  return path.startsWith(base) ? path.substring(base.length) : path
}

const matchGroupNameFromPath = (path, base) => {
  const relativePath = splitWithBasePath(path, base)

  return relativePath.split('/')[0]
}

const getTopLevelOfHeaders = headers => {
  let result = headers[0].level

  for (let i = 1, len = headers.length; i < len; i++) {
    if (headers[i].level < result) {
      result = headers[i].level
    }
  }

  return result
}

export function isExternalLink(path) {
  return /^(https?:)/.test(path)
}

export function resolveSidebarItems($page, $site) {
  const { base, pages } = $site

  const sidebars = {}

  pages.forEach(item => {
    if (isHomePage(item.path, base)) {
      sidebars[item.title] = {
        title: item.title,
        to: item.path,
        children: [],
      }

      return
    }

    const groupName = matchGroupNameFromPath(item.path, base)

    if (!sidebars[groupName]) {
      sidebars[groupName] = {
        children: [],
      }
    }

    const maxLevel = getTopLevelOfHeaders(item.headers)

    // index page in this group
    if (item.path === base + groupName + '/') {
      sidebars[groupName].title = item.title
      sidebars[groupName].to = item.path
      sidebars[groupName].headers = item.headers.filter(
        item => item.level === maxLevel
      )
    } else {
      sidebars[groupName].children.push({
        title: item.title,
        to: item.path,
        headers: item.headers.filter(item => item.level === maxLevel),
      })
    }
  })

  return sidebars
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
