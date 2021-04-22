<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="network network__container"
      :class="{
        'network--shown': visible,
      }"
    >
      <div class="network__mask" @click="close"></div>
      <div class="network__box">
        <div class="network__heading">
          <div class="network__title" @click="toggleCollapseStatus">
            Network
          </div>
          <div class="network__close-btn" @click="close">&times;</div>
        </div>
        <div class="network__body">
          <div
            class="network__cont network__request"
            :class="{
              'network__request--collapse': collapse,
            }"
          >
            <div class="network__url network-section">
              <div class="network-section__title">Request</div>
              <div class="network-section__body">
                <span class="network__method">{{ method }}</span>
                <span class="network__url">{{ url }}</span>
              </div>
            </div>
            <div class="network__header network-section">
              <div class="network-section__title">Header</div>
              <div class="network-section__body">
                <div class="network-section__cont">{{ headerTexts }}</div>
              </div>
            </div>
            <div class="network__payload network__section">
              <div class="network-section__title">Payload</div>
              <div class="network-section__body">
                <div class="network-section__cont">
                  <!-- display: inline -->{{ formatJSON(request)
                  }}<!-- display: inline -->
                </div>
              </div>
            </div>
          </div>
          <div class="network__cont network__response">
            <div class="network__status network-section">
              <div class="network-section__title">Response</div>
              <div class="network-section__body">
                <span class="network__code">{{ statusCode }}</span>
                <span class="network__text">{{ statusText }}</span>
              </div>
            </div>
            <div class="network__response-body network__section">
              <div class="network-section__title">Body</div>
              <div class="network-section__body">
                <div class="network-section__cont">
                  <!-- display: inline -->{{ formatJSON(response)
                  }}<!-- display: inline -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NetworkPanel',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    method: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    headers: {
      type: Object,
      default: () => null,
    },
    request: {
      type: Object,
      default: () => null,
    },
    response: {
      type: [Object, Array, String, null],
      default: () => null,
    },
    statusCode: {
      type: String,
      default: '',
    },
    statusText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      collapse: true,
    }
  },
  computed: {
    headerTexts() {
      return Object.keys(this.headers)
        .map((item) => `${item}: ${this.headers[item]}`)
        .join('\n')
    },
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.className = `${
          document.body.className ? document.body.className + ' ' : ''
        }global-style__body__scroll-disabled`
      } else {
        document.body.className = document.body.className
          .split(' ')
          .filter((item) => item !== 'global-style__body__scroll-disabled')
          .join(' ')
      }
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false)

      this.collapse = true
    },
    formatJSON(data) {
      return data === null || data === undefined
        ? ''
        : JSON.stringify(data, null, 4)
    },
    toggleCollapseStatus() {
      this.collapse = !this.collapse
    },
  },
}
</script>

<style lang="stylus">
@import '../../styles/_variables.styl'

.global-style__body__scroll-disabled
  height: 100%
  overflow: hidden

.fade-enter-active, .fade-leave-active
  transition: opacity .3s ease-in-out
.fade-enter, .fade-leave-to
  opacity: 0

.network
  &__container
    position: fixed
    top: 0
    left: 0
    z-index: 10
    width: 100%
    height: 100%
    text-align: left

  &__mask
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.3)

  &__box
    position: absolute
    top: 6rem
    left: 50%
    max-width: 90%
    padding: 1.625rem 2rem
    transform: translateX(-50%)
    border-radius: 0.25rem
    color: #000
    background-color: #fff

    @media screen and (max-width: $container-max-widths.md)
      width: 90%

  &__heading
    position: relative
    font-size: 1.25rem
    user-select: none
    cursor: ew-resize

  &__close-btn
    position: absolute
    top: 0
    right: 0
    width: 26px
    height: 26px
    font-size: 26px
    line-height: 22px
    text-align: center
    transition: all 0.6s ease-in-out
    cursor: pointer

    &:hover
      transform: rotateZ(360deg)

  &__body
    display: flex
    margin-top: 2rem
    margin-left: -1rem
    margin-right: -1rem

  &__cont
    flex: 1 1 auto
    width: 50%
    padding: 0 1rem

    @media screen and (max-width: $container-max-widths.md)
      width: 100%

  &__request
    @media screen and (max-width: $container-max-widths.md)
      display: none

    &--collapse
      display: none
      flex: 0 0 auto
      width: 0
      padding: 0

.network-section
  &__title
    user-select: none

  &__body
    max-width: 34rem
    padding: 0.875rem
    margin: 0.5rem 0
    overflow: auto
    border-radius: 4px
    background-color: #f6f8fa

  &__cont
    white-space: pre

    @media screen and (min-width: $container-max-widths.md)
      min-width: 38rem

.network__header .network-section__body
  height: 4rem
.network__payload .network-section__body
  height: 18rem
.network__response-body .network-section__body
  height: 24rem
</style>
