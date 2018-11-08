import createDialog from './dialog'

/* eslint-disable */
export default {
  install(Vue, options = {}) {
    Vue.prototype.$dialog = createDialog.bind(this, Vue, options)
  },
}
