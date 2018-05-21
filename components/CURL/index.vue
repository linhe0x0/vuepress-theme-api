<template>
  <div class="curl__container">
    <div ref="curl">
      <slot></slot>
    </div>
    <Button :light="lightBtn" :loading="loading" @click="sendRequest">Send request now</Button>
  </div>
</template>

<script>
import nprogress from 'nprogress'

import request from '../../request'
import { isJSON, isQueryString, parseQueryString } from '../../utils'
import { isCURL, resolveArgs, resolveHeaders } from '../../curl'

// configure progress bar
nprogress.configure({ showSpinner: false })

export default {
  name: 'CURL',
  data() {
    return {
      lightBtn: true,
      loading: false,
    }
  },
  methods: {
    sendRequest() {
      const cmd = this.$refs.curl.outerText.trim()

      if (!isCURL(cmd)) return

      if (this.loading) return

      const args = resolveArgs(cmd)

      const options = {
        url: args.url,
        method: args.request ? args.request.toLowerCase() : 'get',
      }

      if (args.header) {
        options.headers = resolveHeaders(args.header)
      }

      if (args.data) {
        let data

        if (isJSON(args.data)) {
          data = JSON.parse(args.data)
        } else if (isQueryString(args.data)) {
          data = parseQueryString(args.data)
        }

        if (options.method === 'get' || options.method === 'delete') {
          options.params = data
        } else {
          options.data = data
        }
      }

      console.clear()
      console.log('====== DEBUG INFO ======')
      console.info(`=> ${options.method.toUpperCase()} ${options.url}`)
      console.info('=> Headers:', options.headers)

      if (options.params) {
        console.info('=> Params:', options.params)
      }

      if (options.data) {
        console.info('=> Data:', options.data)
      }

      this.openLoading()

      request(options)
        .then(data => {
          this.closeLoading()
          this.$message.success(
            'Request success. Open console to get more details.'
          )

          console.info('<=', data)
        })
        .catch(err => {
          this.closeLoading()
          this.$message.error(
            `${err.status} ${err.message}. Open console to get more details.`
          )

          console.error('<=', err)
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
  mounted() {
    if (this.notInExampleBox()) {
      this.lightBtn = false
    }
  },
}
</script>
