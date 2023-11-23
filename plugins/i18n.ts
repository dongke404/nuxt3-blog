import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import zh from '../locales/zh.json'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'zh',
    messages: {
      en,
      zh,
    },
  })

  vueApp.use(i18n)
})
