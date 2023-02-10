<script  setup name="footer">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer bg-white bg-opacity-60 dark:bg-gray-700  ">
    ©{{ year }}&nbsp;&nbsp;
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
