<script setup>
const route = useRoute()
function enableCustomLayout() {
  route.meta.layout = 'mobile'
}
</script>

<script>
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <button @click="enableCustomLayout">
    Update layout
  </button>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- <div class="mt-8 text-red-900 flex flex-col ">
    导航
    <div>
      {{ foo }}
    </div>
    <NuxtLink to="/">
      首页
    </NuxtLink>
    <NuxtLink to="/color-mode">
      color-mode插件
    </NuxtLink>
    <NuxtLink to="/content">
      content插件
    </NuxtLink>
  </div>
  <NuxtPage /> -->
</template>

<style>
pre {
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>
