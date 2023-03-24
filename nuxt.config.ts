// https://nuxt.com/docs/api/configuration/nuxt-config
import en from './config/i18nConfig/en'
import zh from './config/i18nConfig/zh'
export default defineNuxtConfig({
  // ssr: process.env.NODE_ENV !== "development",
  modules: [
    // 安装tailwindcss npm install @nuxtjs/tailwindcss
    '@nuxtjs/tailwindcss',
    // npm install --save-dev @nuxt/content https://content.nuxtjs.org/
    // '@nuxt/content',
    // npm install --save-dev @nuxtjs/color-mode
    '@nuxtjs/color-mode',
    // npm install -D @nuxt/image-edge
    '@nuxt/image-edge',
    // npm install @nuxtjs/i18n@next --save
    '@nuxtjs/i18n',
    // https://github.com/nuxt-modules/icon
    'nuxt-icon',
    // https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // https://vuestic.dev/zh-cn/getting-started/nuxt
    'nuxt-lodash',
    '@pinia/nuxt',

  ],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  devServer: {
    port: 4000,
  },
  app: {
    head: {
      title: 'Kirk Dong 的博客',
      meta: [
        { charset: 'utf-8' },
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // 谷歌爬虫
        {
          name: 'google-site-verification',
          content: '7wzBsyvulUETi8pO6N7wo7mZvkmdmhRFH6hcP0yBts4',
        },
      ],
      script: [],
      link: [],
      style: [],
      noscript: [],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 配置全局css
          additionalData: '@import "assets/styles/app.scss";',
        },
      },
    },
  },
  typescript: {
    strict: true,
  },
  router: {
    // 可设置当前路由按钮的class
    options: {
      linkActiveClass: 'link-active',
    },

  },
  image: {
    // Options
  },
  css: [],
  tailwindcss: {
    // add '~tailwind.config` alias
    exposeConfig: true,
  },
  postcss: {
    plugins: {
      // https://tailwindcss.com/docs/using-with-preprocessors#nesting
      'postcss-import': {},
      'tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },
  colorMode: {
    // remove -mode suffix for Tailwind Dark mode support
    classSuffix: '',
  },
  i18n: {
    /* module options */
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    defaultLocale: 'zh',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
    locales: ['zh', 'en'],
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'zh',
      messages: { en, zh },
    },
  },
  lodash: {
    prefix: '_',
  },
})

