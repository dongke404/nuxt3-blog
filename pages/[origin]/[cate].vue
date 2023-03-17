<script setup>
const articleList = ref([])
const totalCount = ref(0)
const route = useRoute()
const router = useRouter()
const params = {}
if (route.params.origin === 'search')
  params.keyword = route.params.cate
else if (route.params.origin === 'tag')
  params.tag = route.params.cate
else if (route.params.origin === 'category')
  params[route.params.origin] = route.params.cate
else
  router.push('/404')
const pending = ref(true)
http.get('/article', params).then(({ data }) => {
  articleList.value = data.list
  totalCount.value = data.pagination.count
  pending.value = false
})

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
    <HeaderImg />
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

