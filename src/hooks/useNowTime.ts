import { ref } from 'vue'
const nowTime = ref('00:00:00')
const getNowTime = () => {
  const date = new Date()
  const hour = date.getHours().toString()
  const minute = date.getMinutes().toString()
  const second = date.getSeconds().toString()
  nowTime.value = hour.padStart(2, '0') + ':' + minute.padStart(2, '0') + ':' + second.padStart(2, '0')
  setInterval(getNowTime, 1000)
}
export { nowTime, getNowTime }
