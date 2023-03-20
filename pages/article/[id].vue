<script setup>
import { useStorage } from '@vueuse/core'
import voteInit from '@/utils/vote-handler'
import { COMMENT_NUM } from '@/config'
import { useArticleStore } from '@/store/article'



const route = useRoute()
const id = computed(() => Number(route.params.id))
const article = ref({})
const pending = ref(true)
const { isMobile } = useDevice()

const pending_commit = ref(true)
const comments = ref([])
const count = ref('')
const showPlus1 = ref(false)
const user_blog_likes = useStorage('user_blog_likes', [])
useHead(
  () => ({
    title: article.value.title,
  }),
)
// http.get(`/article/${id.value}`).then(({ data }) => {
//   pending.value = false
//   article.value = data
//   articleDetail.value = data
// })
const articleStore = useArticleStore()
articleStore.getArticleDetail(id.value,(data)=>{
  pending.value = false
  article.value =data
})

http.get('/comment', {
  page: 1,
  limit: COMMENT_NUM,
  sort: -1,
  post_id: id.value,
}).then(({ data }) => {
  count.value = data.count
  comments.value = data.comments
  pending_commit.value = false
})

const loadComemntList = ({ sort, page, callback, show_skeleton }) => {
  if (show_skeleton)
    pending.value = true
  http.get('/comment', {
    page,
    limit: COMMENT_NUM,
    sort,
    post_id: id.value,
  }).then(({ data }) => {
    count.value = data.count
    comments.value = data.comments
    pending_commit.value = false
    callback && callback()
  })
}

const vote = () => {
  const localUser = useStorage('userInfo', {})
  const data = {
    article_id: id.value,
  }
  if (localUser.value.user_id)
    data.user_id = localUser.value.user_id
  http.post('/vote_article', data).then(({ res }) => {
    user_blog_likes.value.push(id.value)
    article.value.likes += 1
    showPlus1.value = true
    setTimeout(() => {
      showPlus1.value = false
    }, 2000)
  })
}
onUpdated(() => {
  comments.value = voteInit(comments.value)
})
</script>

<template>
  <div>
    <Placeholder :loading="pending" :data="article">
      <template #loading>
        <ClientOnly>
          <article-skeleton :social-count="isMobile ? 3 : 8" :related-count="isMobile ? 2 : 3" />
        </ClientOnly>
      </template>
      <template #default>
        <div>
          <div class="bg-main bg-hover rounded mb-3">
            <ArticleContent :data="article" :loading="pending" />
            <div class=" border-dotted border-gray-400 border-t-[1px]" />
            <div class="h-24 flex items-center justify-center">
              <div>
                <button
                  type="button"
                  class="relative border-2 hover:border-0 rounded flex
                    bg-gradient-to-r
                    hover:from-pink-500
                      hover:to-yellow-500
                      p-2
                      hover:text-red-600
                      "
                  :class="{
                    'from-pink-500 to-yellow-500 text-red-600 border-0': user_blog_likes.includes(article.article_id),
                    'text-gray-500': !user_blog_likes.includes(article.article_id),
                  }"
                  @click.stop="vote"
                >
                  <Icon name="icon-park-solid:good-two" class="mr-2" />
                  <span class="">文章真棒! {{ article.likes }}</span>
                  <div v-if="showPlus1" class="floating-element text-red-500">
                    +1
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div class="bg-main bg-hover rounded mb-3">
            <ArticleShare />
          </div>
          <ArticleRecommend :data="article.related" />
        </div>
      </template>
    </Placeholder>
    <!-- <div class="bg-main bg-hover rounded mb-3">
        <article-content :data="article" :loading="pending" />
      </div> -->
    <!-- <LazyComment
      :post-id="Number(id)" :pending="pending_commit" :comments="comments" :count="Number(count)"
      :init-page="Number(1)" @flash-comments="loadComemntList"
    /> -->
  </div>
</template>

<style scoped>
.floating-element {
  position: absolute;
  bottom:0;
  right: -1rem;
  transform: translateX(-50%);
  animation: floating 2s ease-in-out forwards;
}

@keyframes floating {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 50px;
    opacity: 1;
    font-size: large;
  }
}
</style>
