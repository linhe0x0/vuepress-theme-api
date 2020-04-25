<template>
  <div class="search search__container">
    <div class="search__heading">
      <input
        class="search__ipt"
        type="text"
        :value="value"
        @input="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <div class="search__body">
      <ul v-show="isFocused && result.length" class="search__list">
        <li
          v-for="item in result"
          :key="item.to"
          class="search__item"
          @click="clearKeyword"
        >
          <router-link :to="item.to">{{ item.text }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    value: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    searchMaxSuggestions: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      isFocused: false,
    }
  },
  computed: {
    result() {
      return this.options.slice(0, this.searchMaxSuggestions)
    },
  },
  methods: {
    handleFocus() {
      this.isFocused = true
    },
    handleBlur() {
      setTimeout(() => {
        this.isFocused = false
      }, 200)
    },
    handleChange(e) {
      this.$emit('input', e.target.value.trim())
    },
    clearKeyword() {
      this.$emit('input', '')
    },
  },
}
</script>

<style lang="stylus">
@import '../../styles/_variables.styl'

.search
  &__container
    width: 100%
    padding-left: 16px
    padding-right: 30px
    user-select: none

    input
      width: 100%
      padding: 8px 12px
      border: 1px solid $gray
      box-shadow: none
      border-radius: 4px
      appearance: none
      outline: none
      background-color: $gray

      &:hover
      &:focus
        border-color: #888

  &__body
    position: relative

  &__list
    position: absolute
    left: 0
    top: 5px
    width: 100%
    padding: 1.2em 1em
    box-shadow: 5px 5px 25px 0px rgba(46, 61, 73, 0.1)
    background-color: $white

  &__item
    width: 100%
    margin: 4px 0
    list-style: none
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis

    a
      display: block
      color: $textColor
</style>
