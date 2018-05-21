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
    <footer class="home__footer" v-html="footer">
    </footer>
  </div>
</template>

<script>
import Button from './components/Button'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

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
    footer() {
      return md.render(this.data.footer)
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
    padding: 0 20%
    margin-bottom: 5rem
    font-size: 18px
    line-height: 24px
    color: $black

  &__body
    justify-content: center

  &__content
    padding: 6rem 4rem
    border-top: 1px solid $divider-color

  &__footer
    margin: 2rem 0
    text-align: center
</style>
