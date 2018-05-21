<template>
  <div class="home__container container">
    <div class="home__header">
      <h1 class="home__title">{{ data.title || $site.title || 'Hello, World.'}}</h1>
      <p class="home__description">{{ data.description || $site.description }}</p>
      <Button :to="action.link">{{ action.text }}</Button>
    </div>
    <div class="home__body row">
      <div class="home__content col-md-10">
        <Content custom />
      </div>
    </div>
  </div>
</template>

<script>
import Button from './components/Button'

export default {
  components: {
    Button,
  },
  computed: {
    data() {
      return this.$page.frontmatter
    },
    action() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      }
    },
  },
}
</script>

<style lang="stylus">
@import './styles/_variables.styl'

.home

  &__header
    margin: 10rem 0
    text-align: center

  &__title
    font-size: 46px
    font-weight: 400

  &__description
    margin-bottom: 5rem
    font-size: 18px
    line-height: 24px
    color: $black

  &__body
    justify-content: center
  &__content
    padding: 6rem 4rem
    border-top: 1px solid $divider-color
</style>
