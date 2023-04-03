<script setup>
import { APP_ICON, APP_IMAGES } from '@/config'
const colorMode = useColorMode()
const backgroundImg = useState('backgroundImg')
const dark = () => {
  colorMode.preference = 'dark'
  backgroundImg.value = APP_IMAGES.backgroundImgDark
}
const light = () => {
  colorMode.preference = 'light'
  backgroundImg.value = APP_IMAGES.backgroundImg
}
</script>

<template>
  <div class="flex items-center">
    <Icon v-if="$colorMode.value === 'dark'" :name="APP_ICON.sun" @click="light" />
    <Icon v-if="$colorMode.value === 'light'" :name="APP_ICON.moon" @click="dark" />
  </div>
</template>

