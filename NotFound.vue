<template>
  <div class="container notfound-page">
    <div class="content">
      <h1>Not Found</h1>
      <p>{{ getMsg() }}</p>
      <router-link to="/">Take me home.</router-link>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`,
  `Please try your request again or contact support.`,
]

export default {
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)]
    },
  },
}
</script>

<style lang="stylus" scoped>
.notfound-page
  display: flex
  align-items: center
  justify-content: center
  height: 100vh
  text-align: center

.content
  display: flex
  align-items: center
  margin-bottom: 24px

  h1
    margin-bottom: 0
    font-size: 20px
    font-weight: 500

    &::after
      margin: 0 10px
      content: "·"

  p
    margin: 0
    margin-right: 10px;
    font-size: 14px
</style>
