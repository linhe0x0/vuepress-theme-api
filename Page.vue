<template>
  <div class="page__container">
    <Content custom />
  </div>
</template>

<script>
const isHeading = el => {
  const tagname = el.tagName.toLowerCase()

  return tagname === 'h1' || tagname === 'h2'
}

export default {
  computed: {
    isEnchanceMode() {
      return !!this.$page.frontmatter.enhance
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === from.path) return

      if (this.isEnchanceMode) {
        this.$nextTick(this.resolveLayout)
      }
    },
  },
  methods: {
    resolveLayout() {
      const contentContainer = this.$el.children[0]

      let html = ''

      Array.from(contentContainer.children).forEach(el => {
        if (isHeading(el)) {
          if (html) {
            html += `
                </div>
                <div class="content-block__examples">
                </div>
              </div>
            </div>
            `
          }

          html += `
            <div class="content-block">
              <div class="content-block__heading">
                ${el.outerHTML}
              </div>
              <div class="content-block__body">
                <div class="content-block__cont">
          `
        } else {
          html += el.outerHTML
        }
      })

      html += `
                </div>
                <div class="content-block__examples">
                </div>
              </div>
            </div>
      `

      contentContainer.innerHTML = html
    },
  },
  mounted() {
    if (this.isEnchanceMode) {
      this.$nextTick(this.resolveLayout)
    }
  },
}
</script>

<style lang="stylus">
@import './styles/_variables.styl'

.page__container
  min-height: 100vh
  padding: 4rem 3rem 0

  .curl__container
    text-align: center

.content-block
  margin: -4rem -3rem 4rem
  background-color: $black

  &:last-child
    margin-bottom: 0

  &:after
    height: 1px
    display: block
    content: ''
    width: 100%
    background-image: linear-gradient(90deg,#eaeaea 50%,#333 50%)

  &:last-child:after
    display: none

  &__heading
    width: 50%
    padding: 4rem 3rem 0
    overflow: auto
    background-color: #fafafa

  &__body
    display: flex

  &__cont,
  &__examples
    width: 50%
    padding: 0 3rem 2rem

  &__cont
    background-color: #fafafa

  &__examples
    color: $white

    pre
      border: 1px solid #333
      background-color: $black !important

    .btn
      margin: 2em 0

    p
      font-size: 12px
</style>
