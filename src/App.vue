<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
      <!-- <div class="list"> -->
      <span>请选择一个数字：</span>
      <button v-for="item in btnList" :key="item" style="margin-right: 10px" @click="clickBtn(item)">{{ item }}</button>
      <div>
        你选择的数字是{{selectNum}},字符串是{{copyNum}}
      </div>
      <div>结果是: {{overText}}</div>
      <div>
        <span>{{nowTime}}</span>
        <button @click="getNowTime">当前时间</button>
      </div>
      <Modal/>
  </div>
</template>

<script lang="ts">
// import { ref, reactive } from 'vue'
import { reactive, toRefs, onRenderTracked, onRenderTriggered, watch } from 'vue'
// 模块化
import { nowTime, getNowTime } from './hooks/useNowTime'
import Modal from './components/modal.vue'

export default {
  name: 'App',
  components: {
    Modal
  },
  setup () {
    // 使用ref定义响应式变量
    // const btnList = ref([1, 2, 3]) // 使用ref初始值，需要使用value来获取
    // const selectNum = ref(0)
    // const clickBtn = (item: number) => {
    //   selectNum.value = item
    // }
    // return { // 在模板中需要用的数据在这里return出去
    //   btnList,
    //   selectNum,
    //   clickBtn
    // }
    interface DataType { // 定义data的接口
      btnList: number[];
      selectNum: number;
      copyNum?: string;
      overText: string;
      clickBtn: (item: number) => void;
    }
    const data: DataType = reactive({
      btnList: [1, 2, 3],
      selectNum: 0,
      copyNum: '0',
      overText: '',
      clickBtn: (item: number) => {
        data.selectNum = item
        // data.copyNum = 'no' + item
      }
    })
    onRenderTracked((event): void => {
      console.log('状态跟踪')
      console.log(event)
    })
    // onRenderTriggered((event): void => {
    //   console.log('状态触发')
    //   console.log(event)
    // })
    // 监听多个数据使用数组，监听reactive中的值使用() => data.xxx ,监听ref定义的值直接监听
    watch([() => data.selectNum], (newV, oldV) => {
      console.log('监听新的值', newV)
      console.log('监听旧的值', oldV)
      data.overText = '哈哈哈哈' + newV[0]
      data.copyNum = 'no' + newV[0]
      document.title = data.overText
    })
    const refData = toRefs(data) // 方便使用解构符号，使其解构的时不会变成普通对象
    return {
      ...refData,
      nowTime,
      getNowTime
    }
    // vue3生命周期和钩子函数
    // setup() :开始创建组件之前，在beforeCreate和created之前执行。创建的是data和method
    // onBeforeMount() : 组件挂载到节点上之前执行的函数。
    // onMounted() : 组件挂载完成后执行的函数。
    // onBeforeUpdate(): 组件更新之前执行的函数。
    // onUpdated(): 组件更新完成之后执行的函数。
    // onBeforeUnmount(): 组件卸载之前执行的函数。
    // onUnmounted(): 组件卸载完成后执行的函数
    // onActivated(): 被包含在<keep-alive>中的组件，会多出两个生命周期钩子函数。被激活时执行。
    // onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行。
    // onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数。
    // onRenderTracked()： 状态跟踪,它会跟踪页面上所有响应式变量和方法的状态，用return返回去的值,并且在页面中使用到的值
    // onRenderTriggered(): 状态触发，只跟踪页面发生变化的值，并会显示变化前的值与变化后的值(在return中返回并且在页面中使用到的值)
  }
}
</script>

<style>
.list{
  color: red;
}
</style>
