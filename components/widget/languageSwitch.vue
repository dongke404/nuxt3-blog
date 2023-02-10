<script setup>
// 框架本身会保存
const { locale, setLocaleCookie } = useI18n()
const changeLanguage = (localeCode) => {
  locale.value = localeCode
  setLocaleCookie(localeCode)
}
</script>

<template>
  <div class="ml-4 flex items-center">
    <div v-if="locale === 'en'" @click="changeLanguage('zh')">
      zh
    </div>
    <div v-if="locale === 'zh'" @click="changeLanguage('en')">
      en
    </div>
  </div>
</template>

