<template>
  <div class="select select__container">
    <select class="select__item" :value="value" @change="handleChange">
      <option
        v-for="item in options"
        :key="item.value"
        class="select__option"
        :value="item.value"
      >
        {{ item.prop }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleChange(e) {
      this.$emit('change', e.target.value)
    },
  },
}
</script>

<style lang="stylus">
@import '../../styles/_variables.styl'

.select
  &__container
    width: 100%
    padding-left: 16px
    padding-right: 30px
    user-select: none

    select
      width: 100%
      padding: 8px 12px
      border: 1px solid $white
      box-shadow: none
      border-radius: 4px
      appearance: none
      outline: none
      cursor: pointer
      background-color: $gray

      &:hover
        border-color: #888
</style>
