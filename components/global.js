import Button from './Button'
import Section from './Section'
import Block from './Block'
import Example from './Example'
import CURL from './CURL'
import Message from './Message'
import Select from './Select'
import Menubar from './Menubar'
import Blank from './Blank'
import NetworkPanel from './NetworkPanel'
import Search from './Search'

const components = [
  Button,
  Section,
  Block,
  Example,
  CURL,
  Select,
  Menubar,
  Blank,
  NetworkPanel,
  Search,
]

const install = (Vue) => {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })

  // <API> is the alias of <Block> component.
  Vue.component('API', Block)

  Vue.prototype.$message = Message
}

export default {
  install,
}
