import config from './config'
import {
  isHomePage,
  matchFileName,
  matchGroupNameFromPath,
  matchLocalePathFromPath,
} from './path'

const getTopLevelOfHeaders = (headers) => {
  if (!headers.length) return -1

  let result = headers[0].level

  for (let i = 1, len = headers.length; i < len; i++) {
    if (headers[i].level < result) {
      result = headers[i].level
    }
  }

  return result
}

export function getDirTree($site, $localePath) {
  const sidebars = {}

  const sidebarConfig = config.get($site, 'sidebar', $localePath)

  if (sidebarConfig) {
    return Object.assign(sidebars, sidebarConfig)
  }

  $site.pages
    .filter((item) => {
      // Only show current locales in sidebar
      return $site.locales
        ? matchLocalePathFromPath(item.path, $site.locales) === $localePath
        : true
    })
    .forEach((item) => {
      if (isHomePage(item.path, $localePath)) {
        sidebars['home'] = {
          title: item.title,
          to: item.path,
          children: [],
        }

        return
      }

      const groupName = matchGroupNameFromPath(item.path, $localePath)

      if (!sidebars[groupName]) {
        sidebars[groupName] = {
          children: [],
        }
      }

      if (item.headers === undefined) {
        item.headers = []
      }

      const maxLevel = getTopLevelOfHeaders(item.headers)

      // index page in this group
      if (item.path === `${$localePath}${groupName}/`) {
        sidebars[groupName].title = item.title
        sidebars[groupName].to = item.path
        sidebars[groupName].headers = item.headers.filter(
          (item) => item.level === maxLevel
        )
      } else {
        sidebars[groupName].children.push({
          title: item.title || matchFileName(item.path),
          to: item.path,
          headers: item.headers.filter((item) => item.level === maxLevel),
        })
      }
    })

  return sidebars
}
