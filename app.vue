<script setup>
const { isMobile } = useDevice()

// const { isMobile } = useDevice()
// if (isMobile)
//   setPageLayout(isMobile ? 'mobile' : 'default')
// const layout = isMobile ? 'mobile' : 'default'
useState('isflash', () => false)
</script>

<template>
  <div>
    <WidgetMusicPlayer v-if="!isMobile" />
    <NuxtLayout v-if="isMobile" name="mobile">
      <NuxtPage />
    </NuxtLayout>
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@import "assets/styles/tailwind.css";
</style>
