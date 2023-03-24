<script setup>
// const { isMobile } = useDevice()
// const layout = isMobile ? 'mobile' : ''
// if (isMobile)
//   setPageLayout(isMobile ? 'mobile' : 'default')

// setPageLayout(isMobile ? 'mobile' : 'default')

http.get('/article', { sort: 1, limit: 10 }).then(({ data }) => {
  useState('rankArticle', () => data.list)
})
http.get('/tag').then(({ data }) => {
  useState('tags', () => data)
})
http.get('/statistics').then(({ data }) => {
  useState('statistics', () => data)
})
</script>

<template>
  <WidgetMusicPlayer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@import "assets/styles/tailwind.css";
</style>
