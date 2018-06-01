<template>
  <div :class="pageClasses">
    <Content custom />
    <div class="content__footer-container">
      <div class="content__footer">
        <time v-if="lastUpdated" class="last-updated">
          <span class="prefix">{{ lastUpdatedText }}: </span>
          <span class="time">{{ lastUpdated }}</span>
        </time>
      </div>
    </div>
  </div>
</template>

<script>
const isHeading = el => {
  const tagname = el.tagName.toLowerCase()

  return tagname === 'h1' || tagname === 'h2'
}

export default {
  data() {
    return {
      blocks: [],
    }
  },
  computed: {
    isEnchanceMode() {
      return !!this.$page.frontmatter.enhance
    },
    isBlockLayout() {
      return this.isEnchanceMode || !!this.blocks.length
    },
    pageClasses() {
      return {
        page__container: true,
        'page--block-layout': this.isBlockLayout,
      }
    },
    lastUpdated() {
      if (this.$page.lastUpdated) {
        return new Date(this.$page.lastUpdated).toLocaleString(this.$lang)
      }
    },
    lastUpdatedText() {
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }

      return 'Last Updated'
    },
  },
  watch: {
    $route(to, from) {
      if (to.path === from.path) return

      // Reset blocks when route changes.
      this.blocks.length = 0

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
    addBlock(block) {
      this.blocks.push(block)
    },
  },
  mounted() {
    if (this.isEnchanceMode) {
      this.$nextTick(this.resolveLayout)
    }
  },
  created() {
    this.$on('addBlock', this.addBlock)
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

.content__footer
  display: flex
  justify-content: space-between
  padding: 2em 0
  font-size: 14px
  color: #999

.page--block-layout
  .content__footer-container
    margin: 0 -3rem
    background-color: #000

  .content__footer
    width: 50%;
    padding: 0 3rem 2rem
    background-color: #fafafa

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

    .btn
      margin: 2em 0

    p
      font-size: 12px

    // reset style
    blockquote
      border-left-color: $white

      p
        color: #888
</style>
