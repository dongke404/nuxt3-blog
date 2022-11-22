<script setup>
const { data } = await useAsyncData('hello', () =>
  queryContent('/hello').findOne(),
)
</script>

<template>
  <div class="mt-8 text-red-900">
    开始使用nuxt
    <!-- <ContentDoc /> -->
    <h1>首页</h1>
    <!-- <NuxtLink to="/color-mode">
      color-mode插件
    </NuxtLink>
    <NuxtLink to="/content">
      content插件
    </NuxtLink> -->
    <a href="https://nuxtjs.org">其他应用里的链接</a>
    <ContentRenderer :value="data" />
  </div>
</template>

<style>
pre {
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>
