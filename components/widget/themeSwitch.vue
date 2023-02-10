<script setup>
const colorMode = useColorMode()
const background = useChangebg()
const dark = () => {
  colorMode.preference = 'dark'
  background.value = ''
}
const light = () => {
  colorMode.preference = 'light'
  background.value = 'https://kedong.me/static/images/app/background.jpg'
}
</script>

<template>
  <div class="flex items-center">
    <Icon v-if="$colorMode.value === 'dark'" name="line-md:moon-alt-to-sunny-outline-loop-transition" @click="light" />
    <Icon v-if="$colorMode.value === 'light'" name="line-md:moon" @click="dark" />
  </div>
</template>

<style lang="scss">
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

