<template>
  <div class="menu menu__container">
    <div class="menu__box">
      <a class="menu__btn" @click="toggleMenu">
        <img v-show="!open" src="./menu.png" />
        <img v-show="open" src="./close.png" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggleMenu() {
      this.$emit('update:open', !this.open)
    },
  },
}
</script>

<style lang="stylus">
@import '../../styles/_variables.styl'

@media screen and (max-width: $container-max-widths.md)
  .menu
    &__container
      height: 3rem

    &__box
      position: fixed
      top: 0
      left: 0
      z-index: 3
      display: block
      width: 100%
      padding: 0.875rem 2rem
      text-align: right
      background-color: $white

    img
      width: 24px

@media screen and (min-width: $container-max-widths.md)
  .menu__container
    display: none
  .sidebar
    display: block !important
</style>
