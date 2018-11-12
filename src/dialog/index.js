import Dialog from './Dialog'

let dialog
export default function createDialog(Vue, { store = {}, router = {} }, options) {
  if (dialog) {
    dialog.options = {
      ...options,
    }

    dialog.$children[0].visible = true
  } else {
    dialog = new Vue({
      name: 'dialog',
      router,
      store,
      data() {
        return {
          options: { ...options },
        }
      },
      render(h) {
        return h(Dialog, {
          props: this.options,
        })
      },
    })

    dialog.$mount()
    document.body.appendChild(dialog.$el)
  }

  // 暴露close方法
  return {
    close: () => dialog.$children[0].close(),
  }
}
