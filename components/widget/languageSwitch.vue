<script setup>
</script>

<template>
  <div class="ml-4 flex items-center">
    <div v-if="$i18n.locale === 'en'" @click="$i18n.locale = 'zh'">
      zh
    </div>
    <div v-if="$i18n.locale === 'zh'" @click="$i18n.locale = 'en'">
      en
    </div>
  </div>
</template>

