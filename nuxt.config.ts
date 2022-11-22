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
  ],
  content: {
    highlight: {
      theme: 'github-light',
    },
  },
  image: {
    // Options
  },
})
