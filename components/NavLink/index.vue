<template>
  <a v-if="isExternal" :href="to" target="_blank" rel="noopener noreferrer"
    ><slot></slot
  ></a>
  <router-link v-else :to="to"><slot></slot></router-link>
</template>

<script>
import { isExternalLink } from '../../helpers/is'

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    isExternal() {
      return isExternalLink(this.to)
    },
  },
}
</script>
