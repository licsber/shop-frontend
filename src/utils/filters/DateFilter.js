// https://juejin.im/post/5d4901af51882523942f669e
export function dateFilter (time) {
  if (!time) {
    return '无'
  } else {
    const date = new Date(time)
    const dateNumFun = (num) => num < 10 ? `0${num}` : num
    const [Y, M, D, h, m, s] = [
      date.getFullYear(),
      dateNumFun(date.getMonth() + 1),
      dateNumFun(date.getDate()),
      dateNumFun(date.getHours()),
      dateNumFun(date.getMinutes()),
      dateNumFun(date.getSeconds())
    ]
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  }
}

export default {dateFilter}
