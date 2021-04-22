<template>
  <div class="content-block">
    <div ref="heading-box" class="content-block__heading"></div>
    <div class="content-block__body">
      <div ref="cont-box" class="content-block__cont">
        <slot></slot>
      </div>
      <div ref="example-box" class="content-block__examples">
        <slot name="example"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Block',
  mounted() {
    this.resolveLayout()

    this.$parent.$parent.$emit('addBlock', this)
  },
  methods: {
    resolveLayout() {
      const heading = this.$el.querySelector('h1, h2, h3, h4, h5, h6')

      if (heading) {
        this.$refs['heading-box'].appendChild(heading)
      }

      const examples = this.$refs['cont-box'].querySelectorAll('.examples')

      if (examples) {
        examples.forEach((item) => {
          this.$refs['example-box'].appendChild(item)
        })
      }
    },
  },
}
</script>
