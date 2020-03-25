<template>
  <div
    class="blank"
    :style="{
      height: h,
    }"
  ></div>
</template>

<script>
export default {
  name: 'Blank',
  props: {
    height: {
      type: [String, Number],
      default: 20,
    },
  },
  computed: {
    h() {
      return typeof this.height === 'number' ? `${this.height}px` : this.height
    },
  },
}
</script>

<style lang="stylus">
.blank
  width: 100%
</style>
