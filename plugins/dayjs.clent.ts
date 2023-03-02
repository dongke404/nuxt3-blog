import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import { defineNuxtPlugin } from '#app'
import 'dayjs/locale/zh-cn'

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn')
  nuxtApp.provide('dayjs', dayjs)
})
declare module '#app' {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}
