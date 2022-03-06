<template>
  <h2>count: {{ counter }}</h2>
  <h2>msg: {{  msg }}</h2>
  <h2>reactive: </h2>
  <h3>name: {{ person.name }}</h3>
  <h3>age: {{ person.age }}</h3>
  <ul>hobbies: 
    <li v-for="hobby in hobbies">{{ hobby }}</li>
  </ul>
  <h2>son</h2>
  <!-- 在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除且仍在文档中的 attribute。新语法的由来可查阅这份 RFC。 -->
  <son :counter="counter" @hello="showHelloMsg" ref="son">
    <h1>测试默认插槽</h1>
    <!-- <h2 slot="header">具名插槽（该语法已被废弃）</h2> -->
    <template v-slot:header>
      <h2>具名插槽</h2>
    </template>
     <!-- 作用域插槽，数据在子组件，插槽内 -->
     <template v-slot:footer="scope">
        <ul>
          <li v-for="item in scope.games">{{ item }}</li>
        </ul>
     </template>
    
  </son>
</template>
<script>
import { ref, reactive, onMounted, watch } from 'vue'
import son from './son.vue'
export default {
  name: 'test',
  components: { son },
  setup() {
    // ref：定义基本类型
    // reactive: 定义对象、数组
    const counter = ref(0)
    const  msg = ref('sss')
    const person = reactive({
      name: '冰墩墩',
      age: 1
    })
    const son = ref()
    const hobbies = reactive(['1', '2', '3'])
    onMounted(
      () => {
        console.log(son.value.$refs)
        setTimeout(() => {
          msg.value = 'hello' // 操作数据需要.value
        }, 1000)
      }
    )
    watch(msg, (newValue, oldValue) => {
      // console.log('newValue----:', newValue, '-----oldValue-----:', oldValue)
    })
    function showHelloMsg(value) {
      alert(`触发了父组件hello事件，参数为：${value}`)
    }
    return {
      counter,
      msg,
      person,
      hobbies,
      showHelloMsg,
      son
    }
  }
}
</script>