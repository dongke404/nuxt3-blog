<script setup>
import { APP_IMAGES } from '@/config'
const colorMode = useColorMode()
const backgroundIMG = useChangebg()
if (colorMode.preference === 'dark')
  backgroundIMG.value = APP_IMAGES.backgroundImg
else
  backgroundIMG.value = APP_IMAGES.backgroundImg
</script>

<template>
  <div id="app-main1" class=" h-full w-full dark:text-gray-300 dark:bg-gray-800">
    <div id="background" class="-z-10">
      <client-only>
        <div class="background-image dark:opacity-10" :style="{ backgroundImage: `url(${backgroundIMG})`, backgroundSize: 'cover' }" />
      </client-only>
    </div>
    <LayoutPcHeader />
    <main>
      <slot />
    </main>
    <LayoutPcFooter />
  </div>
</template>

<style lang="scss" scoped>
#background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  > .background-image {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size:cover;
    // opacity: 0.5;
  }
}
#app-main1 {
  padding-top: $header-height;
}
</style>

