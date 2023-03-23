<script setup>
const colorMode = useColorMode()
const backgroundIMG = useChangebg()
if (colorMode.preference === 'dark')
  backgroundIMG.value = 'https://kedong.me/static/images/app/background.jpg'
else
  backgroundIMG.value = 'https://kedong.me/static/images/app/background.png'
</script>

<template>
  <div id="app-main" class="h-full w-full dark:text-gray-300 dark:bg-gray-800 ">
    <div id="background" class="z-0">
      <client-only>
        <div class="background-image dark:opacity-10" :style="{ backgroundImage: `url(${backgroundIMG})`, backgroundSize: 'cover' }" />
      </client-only>
    </div>
    <client-only>
      <WidgetToolbox />
    </client-only>

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
    background-size:cover;

    // filter: brightness(50%)
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

