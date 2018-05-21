import globalComponents from './components/global'

export default ({ Vue, options, router, siteData }) => {
  // register components.
  Vue.use(globalComponents)
}
