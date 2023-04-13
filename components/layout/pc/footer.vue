<script  setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer bg-main dark:bg-gray-700  ">
    ©{{ year }}&nbsp;&nbsp;|&nbsp;&nbsp;Powered by NUXT3
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  height: $footer-height;
  line-height: $footer-height;
  margin-top: $lg-gap;
  user-select: none;
  text-align: center;
}
</style>
