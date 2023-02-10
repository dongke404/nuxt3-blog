<script setup>
// const coverImgUrl = ref('https://kedong.me/static/images/app/background.jpg')
const colorMode = useColorMode()
const backgroundIMG = useChangebg()
if (colorMode.preference === 'dark')
  backgroundIMG.value = ''
else
  backgroundIMG.value = 'https://kedong.me/static/images/app/background.jpg'
</script>

<template>
  <div id="app-main" class="dark:bg-gray-800 dark:text-gray-200 h-full w-full">
    <div id="background" class="z-0">
      <client-only>
        <div class="background-image" :style="{ backgroundImage: `url(${backgroundIMG})`, backgroundSize: 'cover' }" />
      </client-only>
    </div>
    <LayoutPcHeader />
    <main id="main" class="main-container mx-auto min-h-screen">
      <LayoutPcNav />
      <div class="main-content">
        <slot />
      </div>
      <LayoutPcAside />
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
    opacity: 0.7;
    background-size:cover;
  }
}
#app-main {
  padding-top: $header-height + $lg-gap;
  .main-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: $container-width;

    .main-content {
      width: $main-width;
      position: relative;
      transition: none;
    }
  }
}
</style>

