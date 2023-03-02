<script setup>
const colorMode = useColorMode()
const background = useChangebg()
const dark = () => {
  colorMode.preference = 'dark'
  background.value = 'https://kedong.me/static/images/app/background.jpg'
}
const light = () => {
  colorMode.preference = 'light'
  background.value = 'https://kedong.me/static/images/app/background.png'
}
</script>

<template>
  <div class="flex items-center">
    <Icon v-if="$colorMode.value === 'dark'" name="line-md:moon-alt-to-sunny-outline-loop-transition" @click="light" />
    <Icon v-if="$colorMode.value === 'light'" name="line-md:moon" @click="dark" />
  </div>
</template>
