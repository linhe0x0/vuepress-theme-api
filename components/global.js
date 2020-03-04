import Button from './Button'
import Section from './Section'
import Block from './Block'
import Example from './Example'
import CURL from './CURL'
import Message from './Message'
import Select from './Select'

const components = [Button, Section, Block, Example, CURL, Select]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$message = Message
}

export default {
  install,
}
