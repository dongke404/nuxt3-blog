// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // 安装tailwindcss npm install @nuxtjs/tailwindcss
    '@nuxtjs/tailwindcss',
    // npm install --save-dev @nuxt/content https://content.nuxtjs.org/
    '@nuxt/content',
    // npm install --save-dev @nuxtjs/color-mode
    '@nuxtjs/color-mode',
    // npm install -D @nuxt/image-edge
    '@nuxt/image-edge',
    // npm install @nuxtjs/i18n@next --save
    '@nuxtjs/i18n-edge',
  ],

  content: {
    highlight: {
      theme: 'github-light',
    },
  },
  image: {
    // Options
  },
  i18n: {
    /* module options */
    // add `vueI18n` option to `@nuxtjs/i18n` module options
    vueI18n: {
      legacy: false,
      locale: 'en',
      messages: {
        en: {
          nav: {
            home: 'Home',
          },
        },
        zh: {
          nav: {
            home: '首页',
          },
        },
      },
    },
  },
  css: [
  ],
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
})
