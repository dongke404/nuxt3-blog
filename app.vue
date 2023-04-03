<script setup>
import { useAppStore } from '@/store'
const { isMobile } = useDevice()
const appStore = useAppStore()
// const { isMobile } = useDevice()
// if (isMobile)
//   setPageLayout(isMobile ? 'mobile' : 'default')
// const layout = isMobile ? 'mobile' : 'default'
useState('isflash', () => false)
useState('backgroundImg', () => '')
await appStore.getTags()
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
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.7);
}

.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}

.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
