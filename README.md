# 一个非常简洁的弹窗组件

```javascript
this.$dialog({
  title: '不错哦',
  component: () => <Test name={ this.name } onConfirm={ this.handleComfirm }/>,
})
```

## 使用

```shell
npm i create-dialog
```

```javascript
import Dialog from 'create-dialog'

Vue.use(Dialog, { store, router }) // 如果没有路由和Vuex，就不传
```

然后就可以愉快的使用了

```javascript
this.$dialog({
  title: '不错哦',
  component: () => <Test name={ this.name } onConfirm={ this.handleComfirm }/>,
})
```

**注意： 如果你的项目中没有使用element-ui，或者你的babel配置excludes掉了node_modules，import语句需要改为**

```javascript
import Dialog from 'create-dialog/dist/create-dialog.common.js'
import 'create-dialog/dist/create-dialog.css'
```

这是因为默认的import路径是源码的版本，你可以引用打包之后的版本

## API

Dialog基于element-ui的Dialog组件二次封装，因此拥有[el-dialog的所有props](http://element-cn.eleme.io/#/zh-CN/component/dialog#attributes),这些props都通过参数传递

```Javascript
this.$dialog({
  title: '哎哟不错哦',
  width: '600px',
  showClose: false,
  component: () => <Test />,
  ...
})
```

## 控制弹窗关闭

Dialog自动监听了组件的cancel和done事件，组件里$emit这两个事件都可以使弹窗关闭

```javascript
// in Test.vue
...
methods: {
  async someMethods() {
    await postSomeData()
    this.$emit('done') // 弹窗关闭
  },
}

// in Index.vue
...
this.$dialog({
  title: '哎哟不错哦',
  // 你可以监听done事件来刷新数据，当然你也可以使用其它的任何事件，或者回调
  component: () => <Test onDone={ this.fetchSomeData }/>,
})
```

## 组件名称首字母大写

由于使用了jsx，所以你必须使用首字母大写的形式来使用组件。   [React的jsx文档](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

但是，如果你已经在Vue中注册过了这个组件，那就可以突破jsx的这个限制

```javascript
import Text from './Text.vue'

...
  components: {
    text: Text
  },
...

this.$dialog({
  title: '哎哟不错哦',
  // 注册了之后就可以使用注册之后的组件名作为tag
  component: () => <test onDone={ this.fetchSomeData }/>,
})
```

## 组件生命周期

当弹窗消失（隐藏）时，传入的组件会被销毁

Enjoy.