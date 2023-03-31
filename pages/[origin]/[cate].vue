<script setup>
import { useArticleListStore } from '@/store/articleList'
definePageMeta({
  middleware: ['un-flash-page'],
})
const { isMobile } = useDevice()
const articleListStore = useArticleListStore()
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
const articleList = computed(() => articleListStore.articleList)
const isflash = useState('isflash')
if (isflash.value || articleList.value.length === 0) {
  articleListStore.$reset()
  articleListStore.getArticleList(params, () => {
    pending.value = false
  })
}
else {
  pending.value = false
}
</script>

<template>
  <div v-if="isMobile">
    <MobileArticleList :data="articleList" :loading="pending" :params="params" />
  </div>
  <div v-else>
    <HeaderImg />
    <LazyArticleList
      :data="articleList"
      :loading="pending"
      :params="params"
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

