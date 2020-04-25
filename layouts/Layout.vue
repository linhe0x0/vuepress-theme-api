<template>
  <div class="theme__container" :class="pageClasses">
    <div v-if="shouldShowSidebar" class="row">
      <div class="col-md-3 col-lg-2 sidebar__container">
        <Menubar :open.sync="isMenuOpened" />
        <Sidebar v-show="isMenuOpened" :items="sidebarItems">
          <slot slot="top" name="sidebar-top" />
          <slot slot="bottom" name="sidebar-bottom" />
        </Sidebar>
      </div>
      <div class="col-md-9 col-lg-10 content__container">
        <div v-if="$page.frontmatter.layout" class="custom__layout">
          <component :is="$page.frontmatter.layout" />
        </div>
        <Home v-else-if="$page.frontmatter.home" />
        <Page v-else></Page>
      </div>
    </div>
    <div v-if="!shouldShowSidebar">
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
      isMenuOpened: false,
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
          'no-sidebar': !this.shouldShowSidebar,
        },
        userPageClass,
      ]
    },
  },
  watch: {
    $route: function() {
      this.isMenuOpened = false
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
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
