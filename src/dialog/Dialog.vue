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
      ref="component">
    </component>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'

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

    // 返回jsx的函数
    component: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      visible: true,
    }
  },

  computed: {
    _component() {
      // 这一步很重要，让component收集到了这个计算属性的依赖，否则当component变化时不会重新渲染组件
      const fn = this.component
      let vNode

      // 返回vue选项对象
      const that = this
      return {
        name: 'dynamic-wrapper',

        render() {
          // fn的运行一定要在render函数中，也是为了挂载依赖
          vNode = fn()

          // 在vNode上手动添加done事件和cancel事件，使弹窗自动关闭
          if (that.closeAfterDone) {
            // 直接写jsx的
            if (!vNode.componentOptions) {
              return vNode
            }

            /* eslint-disable */
            let listeners = vNode.componentOptions.listeners

            if (!listeners) {
              listeners = {}
              vNode.componentOptions.listeners = listeners
            }

            // 添加done
            const orginDoneHandler = listeners.done
            /* eslint-disable func-names */
            listeners.done = function (...p) {
              if (orginDoneHandler) orginDoneHandler(...p)
              that.handleComponentDone(...p)
            }

            // 添加cancel
            const orginCancelHandler = listeners.cancel
            /* eslint-disable func-names */
            listeners.cancel = function (...p) {
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

      this.$refs.component.$destroy()
    },

    show() {
      this.visible = true
    },
  },
}
</script>
