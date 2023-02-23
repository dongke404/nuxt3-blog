<script setup>
const route = useRoute()
const id = computed(() => route.params.id)
const article = ref({ content: '' })
const pending = ref(true)

useLazyrequest(`/article/${id.value}`, 'GET', (data) => {
  article.value = data
  pending.value = false
})
</script>

<template>
  <div class="bg-main bg-hover p-4">
    <ArticleContent :data="article.content" :loading="pending" />
  </div>
</template>
