<script setup>
const articleList = ref([])
const carrList = ref([])
const tweets = ref([])
const totalCount = ref(0)
const pending = ref(true)
const tpending = ref(true)
useLazyrequest('/article', 'GET', (data) => {
  articleList.value = data.list
  carrList.value = data.list
  totalCount.value = data.pagination.count
  pending.value = false
})
useLazyrequest('/tweet?url=users/1214692705789513728/tweets', 'GET', (ndata) => {
  const reg = /https:\/\/t.co\/[a-zA-Z0-9]+/g
  tweets.value = ndata.map((item) => {
    item.urls = item.text.match(reg)
    return item
  })
  tpending.value = false
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
    <LazyCarrousel :data="carrList" :loading="pending" />
    <LazyTweets :data="tweets" :loading="tpending" />
    <LazyArticleList :data="articleList" :loading="pending" :total-count="totalCount" @loadart="loadmore" />
  </div>
</template>

<style>
pre {
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>
