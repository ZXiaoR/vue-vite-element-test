<template>
  <button @click="test">测试触发父组件hello事件</button>
  <div ref="son2">1111</div>
  <!-- 默认插槽 -->
  <slot>默认插槽</slot>
  <!-- 具名插槽 -->
  <slot name="header">header 具名插槽</slot>
  <!-- 作用域插槽, 数据该组件 -->
  <slot name="footer" :games="games"></slot>
</template>
<script>
import { onMounted, reactive, ref } from "vue"

export default {
  name: 'son',
  props: {
    counter: Number
  }, // 需要声明接收哪些props
  // 需要定义抛出的事件名称（浏览器控制台会warning）
  emits: ['hello'],
  /**
   * props: 对象，包含组件外部传递过来的，且组件内部声明接收了的属性
   * context: 上下文对象
   * attrs: 组件外部传递过来，但没有在props配置中声明的属性，相当于this.$attrs
   * slots:收到的插槽内容，相当于this.$slots
   * emit: 分发自定义事件的函数，相当于this.$emit
   */
  setup(props, context) {
    // console.log(props, context.attrs, context.slots.header)
    function test() {
      context.emit('hello', 666)
    }
    const games = reactive(['1111', '2222'])
    const son2 = ref()
    onMounted(() => {
      console.log('----son2', son2)
    })
    return {
      test,
      games,
      son2
    }
  }
}
</script>
