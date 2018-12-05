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

**注意： 如果你的项目中没有使用element-ui，import语句需要改为**

```javascript
import Dialog from 'create-dialog/dist/create-dialog.common.js'
```

## API

## 控制弹窗关闭

## 组件生命周期