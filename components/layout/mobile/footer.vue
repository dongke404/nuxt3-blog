<script setup>
const title = ref('')
const year = ref(new Date().getFullYear())
</script>

<template>
  <footer class="footer module-bg dark:dark-module-bg">
    <div class="footer-content">
      ©{{ year }}&nbsp;&nbsp;{{ title }}
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
    margin: 0;
    .footer-content {
        width: 100%;
        height: $mobile-footer-height;
        line-height: $mobile-footer-height;
        font-size: $font-size-h6;
        text-align: center;
        text-transform: uppercase;
    }
}
</style>

