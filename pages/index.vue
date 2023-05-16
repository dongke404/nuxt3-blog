<script setup>
import { meta } from '@/config'
import { useArticleListStore } from '@/store/articleList'
const { isMobile } = useDevice()

definePageMeta({
  middleware: ['un-flash-page'],
  // or middleware: 'auth'
})
useHead(
  () => ({
    title: meta.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: meta.description,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: meta.keywords,
      },
    ],
  }),
)
const articleListStore = useArticleListStore()
const tweets = ref([])
const pending = ref(true)
const tpending = ref(true)

const carrList = computed(() => articleListStore.articleList)
const articleList = computed(() => articleListStore.articleList)
const isflash = useState('isflash')
if (isflash.value || articleList.value.length === 0) {
  articleListStore.$reset()
  articleListStore.getArticleList({}, () => {
    pending.value = false
  })
}
else {
  pending.value = false
}

http.get('/tweet?url=users/1214692705789513728/tweets').then(({ data }) => {
  const reg = /https:\/\/t.co\/[a-zA-Z0-9]+/g
  tweets.value = data.map((item) => {
    item.urls = item.text.match(reg)
    return item
  })
  tpending.value = false
})
</script>

<template>
  <div v-if="isMobile">
    <MobileArticleList :data="articleList" :loading="pending" />
  </div>
  <div v-else>
    <LazyCarrousel :data="carrList" :loading="pending" />
    <LazyTweets :data="tweets" :loading="tpending" />
    <ArticleList :data="articleList" :loading="pending" />
  </div>
</template>

<style>
pre {
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>
