<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :show-close="showClose"
    :before-close="close"
    :lock-scroll="lockScroll">
    <component
      :is="_component"
      @done="handleComponentDone"
      @cancel="handleComponentCancel">
    </component>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'

function noop() {}

export default {
  components: {
    [Dialog.name]: Dialog,
  },

  props: {
    title: {
      type: String,
    },

    width: {
      type: String,
      default: '50%',
    },

    closeOnClickModal: {
      type: Boolean,
      default: true,
    },

    showClose: {
      type: Boolean,
      default: true,
    },

    beforeClose: {
      type: Function,
    },

    lockScroll: {
      type: Boolean,
      default: false,
    },

    // 动态component完成自己的任务后是否关闭弹窗，默认为是
    closeAfterDone: {
      type: Boolean,
      default: true,
    },

    afterSubmit: {
      type: Function,
      default: noop,
    },

    /*
      * 支持4种方式
      * 1、直接传入component
      * 2、异步import
      * 3、返回jsx的函数
      * 4、jsx形式的组件
     */
    component: {
      type: [Object, Function],
      default: () => {},
    },
  },

  data() {
    return {
      visible: true,
    }
  },

  computed: {
    /*
      * 异步import和直接传入component，直接返回
      * 直接传入jsx和返回jsx的函数，需要手动创建vue选项对象
    */
    _component() {
      let vNode

      /*
        * 如果是vNode，返回vue选项对象; 如果是vue选项对象，直接返回
        * 通过对象的原型来判断是否为vNode对象
      */
      if (typeof this.component === 'object') {
        if (Object.getPrototypeOf(this.component) === Object.prototype) return this.component

        vNode = this.component
      }

      if (typeof this.component === 'function') {
        // 通过运行一次来判断是异步import，还是返回jsx的函数
        const fnResult = this.component()
        const isPromise = o => Object.prototype.toString.call(o) === '[object Promise]'
        if (isPromise(fnResult)) return this.component

        vNode = fnResult
      }

      // 返回vue选项对象
      const that = this
      return {
        render() {
          // 在vNode上手动添加done事件和cancel事件，使弹窗自动关闭
          if (that.closeAfterDone) {
            /* eslint-disable */
            let listeners = vNode.componentOptions.listeners

            if (!listeners) {
              listeners = vNode.componentOptions.listeners = {}
            }

            // 添加done
            const orginDoneHandler = listeners.done
            /* eslint-disable func-names */
            listeners.done = function () {
              if (orginDoneHandler) orginDoneHandler()
              that.handleComponentDone()
            }

            // 添加cancel
            const orginCancelHandler = listeners.cancel
            /* eslint-disable func-names */
            listeners.cancel = function () {
              if (orginCancelHandler) orginCancelHandler()
              that.close()
            }
          }

          return vNode
        },
      }
    },
  },

  methods: {
    // 组件处理完自己的事情触发，默认关闭弹窗
    handleComponentDone() {
      if (this.closeAfterDone) this.close()
      this.afterSubmit()
    },

    handleComponentCancel() {
      this.close()
    },

    close(done) {
      if (this.beforeClose) this.beforeClose()

      // 从handleComponentDone处调用的close没有done参数
      if (done) {
        done()
      } else {
        this.visible = false
      }
    },

    show() {
      this.visible = true
    },
  },
}
</script>
