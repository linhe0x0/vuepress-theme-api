<template>
  <div class="theme__container" :class="pageClasses">
    <div class="menu__container">
      <a v-show="shouldShowSidebar" @click="openMenu()">
        <img v-show="shouldContentSeen" src="../assets/menu.png" />
        <img v-show="shouldMenuOpen" src="../assets/close.png" />
      </a>
    </div>
    <div v-if="shouldShowSidebar" class="row">
      <div v-show="shouldMenuOpen" class="col-md-3 col-lg-2 sidebar__container">
        <Sidebar :items="sidebarItems">
          <slot slot="top" name="sidebar-top" />
          <slot slot="bottom" name="sidebar-bottom" />
        </Sidebar>
      </div>
      <div
        v-show="shouldContentSeen"
        class="col-md-9 col-lg-10 content__container"
      >
        <div v-if="$page.frontmatter.layout" class="custom__layout">
          <component :is="$page.frontmatter.layout" />
        </div>
        <Home v-else-if="$page.frontmatter.home" />
        <Page v-else></Page>
      </div>
    </div>
    <div v-else>
      <div v-if="$page.frontmatter.layout" class="custom__layout">
        <component :is="$page.frontmatter.layout" />
      </div>
      <Home v-else-if="$page.frontmatter.home" />
      <Page v-else></Page>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'

import Sidebar from '../components/Sidebar'
import Home from './Home'
import Page from './Page'

import { getDirTree } from '../helpers/tree'

export default {
  components: {
    Home,
    Sidebar,
    Page,
  },
  data() {
    return {
      isSidebarOpen: true,
      shouldMenuOpen: false,
      shouldContentSeen: true,
    }
  },
  computed: {
    sidebarItems() {
      return getDirTree(this.$site, this.$localePath)
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page

      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        Object.keys(this.sidebarItems).length
      )
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass

      return [
        {
          'sidebar-open': this.shouldShowSidebar && this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
        },
        userPageClass,
      ]
    },
  },
  watch: {
    $route: function() {
      this.isSidebarOpen = false
      this.shouldMenuOpen = false
      this.shouldContentSeen = true
    },
  },
  mounted() {
    // configure progress bar
    nprogress.configure({ showSpinner: false })

    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start()
      }

      next()
    })

    this.$router.afterEach(() => {
      nprogress.done()
    })
  },
  created() {
    if (this.$ssrContext) {
      this.$ssrContext.title = this.$title
      this.$ssrContext.lang = this.$lang
      this.$ssrContext.description = this.$page.description || this.$description
    }
  },
  methods: {
    openMenu: function() {
      this.shouldMenuOpen
        ? (this.shouldMenuOpen = false)
        : (this.shouldMenuOpen = true)
      this.shouldContentSeen
        ? (this.shouldContentSeen = false)
        : (this.shouldContentSeen = true)
      this.isSidebarOpen
        ? (this.isSidebarOpen = false)
        : (this.isSidebarOpen = true)
    },
  },
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
<style lang="stylus">
@import '../styles/_variables.styl'

@media screen and (max-width: $container-max-widths.md)
  img
    width: 100%
    height: 100%

  .menu__container
    display: block
    position: sticky
    padding: 2rem 2rem 0
    text-align: right

    img
      width: 30px

@media screen and (min-width: $container-max-widths.md)
  img
    width: 50%
    height: 50%

  .menu__container
    display: none

  .content__container, .sidebar__container
    display: block !important
</style>
