<template>
  <div class="curl__container">
    <div ref="curl" class="curl__body" contenteditable>
      <slot></slot>
    </div>
    <Button :light="lightBtn" :loading="loading" @click="sendRequest"
      >Send request now</Button
    >
    <NetworkPanel :visible.sync="networkPanelVisible" v-bind="networkData" />
  </div>
</template>

<script>
import nprogress from 'nprogress'

import request from '../../helpers/request'
import curl from '../../helpers/curl'
import { isJSON, isQueryString } from '../../helpers/is'

// configure progress bar
nprogress.configure({
  showSpinner: false,
})

export default {
  name: 'CURL',
  data() {
    return {
      lightBtn: true,
      loading: false,
      networkPanelVisible: false,
      networkData: {
        method: '',
        url: '',
        headers: {},
        request: {},
        response: {},
        stautsCode: '',
        statusText: '',
      },
    }
  },
  mounted() {
    if (this.notInExampleBox()) {
      this.lightBtn = false
    }
  },
  methods: {
    openNetworkPanel() {
      this.networkPanelVisible = true
    },
    sendRequest() {
      const cmd = this.$refs.curl.outerText.trim()

      if (this.loading) return

      const options = curl(cmd)

      if (!options) {
        this.$message.error(
          'Got an invalid CURL command, please check it and try again.'
        )
        return
      }

      console.clear()
      console.log('====== DEBUG INFO BEGIN ======')
      console.info(`=> ${options.method.toUpperCase()} ${options.url}`)

      this.networkData.method = options.method.toUpperCase()
      this.networkData.url = options.url

      if (options.headers) {
        console.info('=> Headers:', options.headers)

        this.networkData.headers = options.headers
      }

      if (options.params) {
        console.info('=> Params:', options.params)
      }

      if (options.data) {
        console.info('=> Data:', options.data)

        this.networkData.data = options.data
      }

      this.openLoading()

      request(options)
        .then((data) => {
          this.closeLoading()

          this.$message.success(
            `${data.status} ${data.data.message || data.statusText}`
          )

          this.networkData.statusCode = `${data.status}`
          this.networkData.statusText = data.statusText
          this.networkData.response = data.data

          console.info('<=', data.status, data.statusText)
          console.info('<=', 'data:', data.data)
        })
        .catch((err) => {
          this.closeLoading()

          this.$message.error(`${err.status} ${err.message}`)

          this.networkData.statusCode = `${err.status}`
          this.networkData.statusText = err.message
          this.networkData.response = err.data

          console.error('<=', err)
        })
        .finally(() => {
          console.log('====== DEBUG INFO END ======')

          setTimeout(() => {
            this.openNetworkPanel()
          }, 300)
        })
    },
    notInExampleBox() {
      return this.$el.parentNode.getAttribute('type') !== 'example'
    },
    openLoading() {
      this.loading = true

      nprogress.start()
    },
    closeLoading() {
      this.loading = false

      nprogress.done()
    },
  },
}
</script>

<style lang="stylus">
.curl
  &__body
    outline: none
</style>
