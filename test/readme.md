组合式API:https://v3.cn.vuejs.org/guide/composition-api-introduction.html
ref: 定义基本类型 操作时需要.value
reactive: 定义对象、数组

使用props需要提前声明需要接收哪些
需要定义抛出的事件名称（否则控制台会warning）
```
emits: ['hello']
```
setup函数：
```
 /**
   * props: 对象，包含组件外部传递过来的，且组件内部声明接收了的属性
   * context: 上下文对象
   *    attrs: 组件外部传递过来，但没有在props配置中声明的属性，相当于this.$attrs
   *    slots:收到的插槽内容，相当于this.$slots
   *    emit: 分发自定义事件的函数，相当于this.$emit
*/
setup(props, context){}

```

