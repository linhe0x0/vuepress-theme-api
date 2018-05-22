<template>
  <div class="sidebar">
    <div class="group" v-for="value, attr in items">
      <div class="group__title">{{ attr }}</div>
      <div class="group__body">

        <!-- render README.md in this folder -->
        <div v-if="value.to" :class="[
          'group__category',
          'category',
          {
            'category--selected': $route.fullPath === value.to,
            'category--active': $route.fullPath === value.to,
          }
        ]">
          <div class="category__label">
            <NavLink :to="value.to">{{ title(value.title || attr) }}</NavLink>
          </div>
        </div>

        <!-- render headers of README.md in this folder -->
        <div v-if="value.headers && value.headers.length" v-for="header in value.headers" :class="[
          'group__category',
          'category',
          {
            'category--selected': $route.fullPath === `${value.to}#${header.slug}`,
            'category--active': $route.fullPath === `${value.to}#${header.slug}`,
          }
        ]">
          <div class="category__label">
            <NavLink :to="`${value.to}#${header.slug}`">{{ title(header.title) }}</NavLink>
          </div>
        </div>

        <!-- render other files in this folder -->
        <div v-if="value.children && value.children.length" v-for="child in value.children" :name="`${child.to}`" :class="[
          'group__category',
          'category',
          {
            'category--selected': $route.path === child.to,
            'category--active': $route.fullPath === child.to,
          }
        ]">
          <div class="category__label">
            <NavLink :to="child.to">{{ title(child.title) }}</NavLink>
          </div>
          <div v-if="child.headers && child.headers.length" v-for="header in child.headers" :class="[
            'category__headers',
            {
              'category--active': $route.fullPath === `${child.to}#${header.slug}`,
            }
          ]">
            <div class="category__header-item">
              <NavLink :to="`${child.to}#${header.slug}`">{{ title(header.title) }}</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { title } from '../../utils'
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
  methods: {
    title,
  },
}
</script>

<style lang="stylus">
@import '../../styles/_variables.styl'

.sidebar
  position: fixed
  top: 0
  bottom: 0
  width: 100%
  padding-top: 3rem
  overflow: auto
  background: $white

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
    height: 2em
    margin: 0.6em 0
    line-height: 2em

  &__label,
  &__headers
    border-left: 4px solid $white

  &__label
    padding-left: 26px

  &__headers
    display: none

  &--active,
  &--selected
    & ^[0]__headers
      display: block

  &--active &__label,
  &--active&__headers
      font-weight: 600
      border-color: $black

  &__header-item
    padding-left: 30px

    &::before
      margin-right: 4px
      color: #979797
      content: "-"
</style>
