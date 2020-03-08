<template>
  <div class="menu menu__container">
    <div class="menu__box">
      <a class="menu__btn" @click="toggleMenu">
        <div
          class="hamburger"
          :class="{
            'is-active': open,
          }"
        >
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
        </div>
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

.hamburger
  position: relative
  display: inline-block
  width: 30px
  height: 30px

  &:before
    position: absolute
    top: 50%
    left: 50%
    width: 100%
    height: 100%
    border: 2px solid #0000
    content: ""
    transform: translate(-50%, -50%)
    border-radius: 100%
    transition: all 0.3s ease-in-out

  .line
    width: 24px;
    height: 2px;
    background-color: #121212;
    display: block;
    margin: 6px auto;
    transition: all 0.3s ease-in-out;

  &.is-active
    transform: rotate(45deg);

    &:before
      border-color: #121212;

    & .line
      width: 16px;

      &:nth-child(1)
        transform: translateY(8px);

      &:nth-child(2)
        opacity: 0;

      &:nth-child(3)
        transform: translateY(-8px) rotate(90deg);

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
      padding: 0.625rem 2rem
      font-size: 0
      text-align: right

@media screen and (min-width: $container-max-widths.md)
  .menu__container
    display: none
  .sidebar
    display: block !important
</style>
