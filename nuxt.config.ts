// https://nuxt.com/docs/api/configuration/nuxt-config

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
    // '@nuxt/image-edge',
    // https://github.com/nuxt-modules/icon
    'nuxt-icon',
    // https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // https://vuestic.dev/zh-cn/getting-started/nuxt
    'nuxt-lodash',
    '@pinia/nuxt',

  ],
  alias: {
    // pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  app: {
    head: {
      title: 'Kirk Dong 的博客',
      meta: [
        { charset: 'utf-8' },
        // <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
        // 谷歌爬虫
        {
          name: 'google-site-verification',
          content: '7wzBsyvulUETi8pO6N7wo7mZvkmdmhRFH6hcP0yBts4',
        },
        // 百度抓取验证
        {
          name: 'baidu-site-verification',
          content: 'codeva-MOOjhJKsk1',
        },
      ],
      script: [{
        // async
        async: true,
        src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6099675086497793',
        crossorigin: 'anonymous',
      }, {
        // async
        async: true,
        src: 'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
        crossorigin: 'anonymous',
      },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
      ],
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
  lodash: {
    prefix: '_',
  },
})

