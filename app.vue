<script setup>
const { isMobile } = useDevice()
const layout = isMobile ? 'mobile' : 'default'
// setPageLayout(isMobile ? 'mobile' : 'default')
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">
.bg-main {
  @apply bg-white bg-opacity-60 dark:bg-gray-700 dark:bg-opacity-60;
}
.bg-hover {
  @apply hover:bg-opacity-90  dark:hover:bg-opacity-80;
}
.color-gray {
  @apply text-gray-500 dark:text-gray-100;
}
</style>
