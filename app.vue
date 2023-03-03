<script setup>
// const { isMobile } = useDevice()
// const layout = isMobile ? 'mobile' : ''
// if (isMobile)
//   setPageLayout(isMobile ? 'mobile' : 'default')

// setPageLayout(isMobile ? 'mobile' : 'default')

http.get('/article', { sort: 1, limit: 10 }).then((res) => {
  useState('rankArticle', () => res.data.value.list)
})
http.get('/tag').then((res) => {
  useState('tags', () => res.data.value)
})
http.get('/statistics').then((res) => {
  useState('statistics', () => res.data.value)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import "assets/styles/tailwind.css";
</style>
