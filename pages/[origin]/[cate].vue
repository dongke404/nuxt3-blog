<script setup>
import { meta } from '@/config'
import { categoryMap, routerMap } from '@/config/maps'
import { useArticleListStore } from '@/store/articleList'
import { useAppStore } from '@/store'

definePageMeta({
  middleware: ['un-flash-page'],
})
const { isMobile } = useDevice()
const appStore = useAppStore()
const tags = computed(() => appStore.tags)
const articleListStore = useArticleListStore()
const route = useRoute()
const params = {}
const headInfo = {}
if (route.params.origin === 'search') {
  params.keyword = route.params.cate
  headInfo.title = `${route.params.cate}|${meta.title}`
  headInfo.description = `搜索与 ${route.params.cate} 相关的文章`
  headInfo.keywords = route.params.cate
}
else if (route.params.origin === 'tag') {
  const tag = tags.value.find(t => t.name === route.params.cate)
  params.tag = route.params.cate
  headInfo.title = `${route.params.cate}|${meta.title}`
  headInfo.description = tag.description
  headInfo.keywords = route.params.cate
}
else if (route.params.origin === 'category') {
  params.category = route.params.cate
  headInfo.title = `${categoryMap[route.params.cate]}|${route.params.cate}|${meta.title}`
  headInfo.description = routerMap.category[route.params.cate].text
  headInfo.keywords = route.params.cate
}

useHead(
  () => ({
    title: headInfo.title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: headInfo.description,
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: headInfo.keywords,
      },
    ],
  }),
)
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

