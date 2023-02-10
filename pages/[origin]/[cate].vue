<script setup>
const articleList = ref([])
const totalCount = ref(0)
const route = useRoute()
const cate = computed(() => route.params.cate)
const params = {}
params[route.params.origin] = route.params.cate
const pending = ref(true)
useLazyrequest('/article', 'GET', (ndata) => {
  articleList.value = ndata.list
  totalCount.value = ndata.pagination.count
  pending.value = false
}, params)

const loadmore = (v) => {
  articleList.value = articleList.value.concat(v)
  const old_scrollHeight = document.body.scrollHeight
  nextTick(() => {
    scrollTo({
      top: old_scrollHeight - 200,
      behavior: 'smooth',
    })
  })
}
</script>

<template>
  <div>
    <LazyHeaderImg :cate="cate" />
    <LazyArticleList
      :data="articleList"
      :loading="pending"
      :params="params"
      :total-count="totalCount"
      @loadart="loadmore"
    />
  </div>
</template>

<style>
pre {
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>

