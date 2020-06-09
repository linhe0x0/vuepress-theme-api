<template>
  <div
    ref="container"
    class="sidebar"
    :style="{ width: containerWidth }"
    @click="savePosition"
  >
    <div class="group">
      <div class="group__title">Search</div>
      <div class="group__body">
        <Search v-model="searchKeyword" :options="searchedOptions" />
      </div>
    </div>
    <div v-if="shouldShowLangSelect" class="group">
      <div class="group__title">{{ languageSelectText }}</div>
      <div class="group__body">
        <div class="sidebar__lang">
          <Select
            :options="localePathList"
            :value="currentPagePath"
            @change="toggleLocale"
          ></Select>
        </div>
      </div>
    </div>
    <div
      v-for="(sidebarGroupItem, index) in sidebars"
      :key="sidebarGroupItem.to || index"
      class="group"
    >
      <div class="group__title">
        {{ sidebarGroupOrder[index].replace(/^\d+[_-]*/g, '') }}
      </div>
      <div class="group__body">
        <!-- render README.md in this folder -->
        <div
          v-if="sidebarGroupItem.to"
          :class="[
            'group__category',
            'category',
            {
              'category--selected':
                currentRouteFullPath === sidebarGroupItem.to,
              'category--active': currentRouteFullPath === sidebarGroupItem.to,
            },
          ]"
        >
          <div class="category__label">
            <NavLink
              class="category__link sidebar-link"
              :to="sidebarGroupItem.to"
              >{{
                title(sidebarGroupItem.title || sidebarGroupOrder[index])
              }}</NavLink
            >
          </div>
        </div>

        <!-- render headers of README.md in this folder -->
        <div v-if="sidebarGroupItem.headers && sidebarGroupItem.headers.length">
          <div
            v-for="header in sidebarGroupItem.headers"
            :key="`${sidebarGroupItem.to}#${header.slug}`"
            :class="[
              'group__category',
              'category',
              {
                'category--selected':
                  currentRouteFullPath ===
                  `${sidebarGroupItem.to}#${header.slug}`,
                'category--active':
                  currentRouteFullPath ===
                  `${sidebarGroupItem.to}#${header.slug}`,
              },
            ]"
          >
            <div class="category__label">
              <NavLink
                class="category__link sidebar-link"
                :to="`${sidebarGroupItem.to}#${header.slug}`"
                >{{ title(header.title) }}</NavLink
              >
            </div>
          </div>
        </div>

        <!-- render other files in this folder -->
        <div
          v-if="sidebarGroupItem.children && sidebarGroupItem.children.length"
        >
          <div
            v-for="child in sidebarGroupItem.children"
            :key="`${child.to}`"
            :class="[
              'group__category',
              'category',
              {
                'category--selected':
                  !child.isLangNav && $route.path === child.to,
                'category--active':
                  !child.isLangNav && currentRouteFullPath === child.to,
              },
            ]"
          >
            <div class="category__label">
              <NavLink class="category__link sidebar-link" :to="child.to">{{
                title(child.title)
              }}</NavLink>
            </div>
            <div v-if="child.headers && child.headers.length">
              <div
                v-for="header in child.headers"
                :key="`${child.to}#${header.slug}`"
                :class="[
                  'category__headers',
                  {
                    'category--active':
                      currentRouteFullPath === `${child.to}#${header.slug}`,
                  },
                ]"
              >
                <div class="category__header-item">
                  <NavLink
                    class="category__link sidebar-link"
                    :to="`${child.to}#${header.slug}`"
                    >{{ title(header.title) }}</NavLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../helpers/config'
import title from '../../helpers/title'
import NavLink from '../NavLink'

export default {
  name: 'Sidebar',
  components: {
    NavLink,
  },
  props: {
    items: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      containerWidth: '100%',
      searchKeyword: '',
    }
  },
  computed: {
    searchedOptions() {
      const results = []

      this.sidebars.forEach((item) => {
        if (item.to) {
          results.push({
            to: item.to,
            text: item.title,
          })
        }

        if (item.headers) {
          item.headers.forEach((header) => {
            results.push({
              to: `${item.to}#${header.slug}`,
              text: header.title,
            })
          })
        }

        if (item.children) {
          item.children.forEach((child) => {
            results.push({
              to: child.to,
              text: child.title,
            })

            if (child.headers) {
              child.headers.forEach((h) => {
                results.push({
                  to: `${child.to}#${h.slug}`,
                  text: h.title,
                })
              })
            }
          })
        }
      })

      return results.filter((item) =>
        (item.text || '')
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase())
      )
    },
    shouldShowLangSelect() {
      return Object.keys(this.$site.locales || {}).length > 1
    },
    languageSelectText() {
      return (
        config.get(this.$site, 'selectText', this.$localePath) || 'languages'
      )
    },
    currentPagePath() {
      return this.$page.path
    },
    currentRouteFullPath() {
      return decodeURIComponent(this.$route.fullPath)
    },
    localePathList() {
      return Object.keys(this.$site.locales || {}).map((locale) => {
        const item = this.$site.locales[locale]
        const languageTitle =
          config.get(this.$site, 'label', locale) || item.text || item.lang

        let path = ''

        if (item.path === this.$localePath) {
          path = this.$page.path // Stay on the current page
        } else {
          path = this.$page.path.replace(this.$localePath, item.path) // Try to stay on the same page

          const notFound = !this.$site.pages.some((page) => page.path === path)

          if (notFound) {
            path = item.path // Fallback to homepage
          }
        }

        return {
          prop: languageTitle,
          value: path,
        }
      })
    },
    sidebarGroupOrder() {
      const groupOrderConfig = config.get(
        this.$site,
        'sidebarGroupOrder',
        this.$localePath
      )

      const order = groupOrderConfig
        ? groupOrderConfig.filter((item) => !!this.items[item])
        : Object.keys(this.items)

      const index = order.indexOf('home')

      if (index !== -1) {
        order.splice(index, 1)
      }

      order.sort()
      order.unshift('home')

      return order
    },
    sidebars() {
      return this.sidebarGroupOrder
        .map((item) => {
          return this.items[item]
        })
        .filter((item) => item)
    },
  },
  mounted() {
    this.refreshContainerWidth()
    this.checkActiveSidebarItem()

    window.addEventListener('resize', this.refreshContainerWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.refreshContainerWidth)
  },
  methods: {
    title,
    toggleLocale(path) {
      this.$router.push(path)
    },
    refreshContainerWidth() {
      const width = this.$refs.container.parentNode.getBoundingClientRect()
        .width

      this.containerWidth = width ? `${width}px` : '100%'
    },
    savePosition() {
      if (!this.$refs.container) {
        return
      }

      const top = this.$refs.container.scrollTop

      window.localStorage.setItem('vuepress_theme_api_sidebar_position', top)
    },
    restorePosition() {
      const lastPosition = parseInt(
        window.localStorage.getItem('vuepress_theme_api_sidebar_position'),
        10
      )

      if (lastPosition) {
        this.$refs.container.scrollTop = lastPosition
        return
      }
    },
    checkActiveSidebarItem() {
      const el = this.$refs.container.querySelector('.category--active')

      if (!el) {
        this.restorePosition()

        return
      }

      const viewPortHeight = document.documentElement.clientHeight
      const { top } = el.getBoundingClientRect()

      const visible = top < viewPortHeight

      if (visible) {
        this.restorePosition()
      } else {
        this.$refs.container.scrollTop = top - 100

        this.savePosition()
      }
    },
  },
}
</script>

<style lang="stylus">
@import '../../styles/_variables.styl'

.sidebar
  position: fixed
  top: 0
  bottom: 0
  z-index: 2
  width: 100%
  margin-left 1px
  padding-top: 3rem
  overflow: auto
  background: $white
  user-select: none

.group
  margin-bottom: 4rem

  &__title
    padding-left: 30px
    margin-bottom: 1em
    font-size: 14px
    font-weight: 300
    letter-spacing: 1.3px
    text-transform: uppercase
    color: #888

.category
  a,
  a:hover
    color: $black

  &__label,
  &__header-item
    margin: 0.6em 0
    line-height: 2em

  &__label,
  &__headers
    border-left: 4px solid $white
    border-right: 4px solid $white

  &__link
    display: block
    padding: 0 26px

  &__headers
    display: none

  &--active,
  &--selected
    & ^[0]__headers
      display: block

  &:hover &__label,
  &__headers:hover,
  &--active &__label,
  &--active&__headers,
  .router-link-exact-active
    font-weight: 600
    border-left-color: $black

  &__header-item
    position: relative
    padding-left: 30px
    margin: 0.1em 0

    & ^[0]__link
      padding-left: 20px

    &::before
      position: absolute;
      margin-right: 4px
      color: #979797
      content: "-"
</style>
