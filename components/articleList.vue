<script setup>
import { APP_ICON } from '@/config'
import {
  categoryMap,
  originClassMap,
  originTextMap,
} from '@/config/maps/index'
import { useArticleListStore } from '@/store/articleList'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  params: {
    type: Object,
    default: () => ({}),
  },
})
const articleListStore = useArticleListStore()
const articleList = computed(() => props.data)
// const loading = computed(() => props.loading)
const totalCount = computed(() => articleListStore.totalCount)
const limit = computed(() => articleListStore.limit)
const currPage = computed(() => articleListStore.currPage)
const pending = ref(false)
const isLastPage = computed(() => {
  return currPage.value * limit.value > totalCount.value
})
// onMounted(() => {
//   // 点赞
//   const _data = localStorage.getItem('user_like_history')
//     ? localStorage.getItem('user_like_history')
//     : null
//   const user_like_history = JSON.parse(_data)
//   articleList.value.forEach((item) => {
//     if (user_like_history && user_like_history.pages) {
//       if (user_like_history.pages.includes(item.article_id))
//         item.isLiked = true
//     }
//     else {
//       item.isLiked = false
//     }
//   })
// })
const loadMore = () => {
  pending.value = true
  articleListStore.loadmore(props.params, () => {
    pending.value = false
    const old_scrollHeight = document.body.scrollHeight
    nextTick(() => {
      scrollTo({
        top: old_scrollHeight - 200,
        behavior: 'smooth',
      })
    })
  })
}
</script>

<template>
  <div class="articles">
    <Placeholder :data="articleList.length" :loading="loading">
      <template #loading>
        <div>
          <ul key="skeleton" class="article-list-skeleton ">
            <li v-for="item in 6" :key="item" class="item bg-main rounded-md">
              <div class="thumb">
                <skeleton-base />
              </div>
              <div class="content">
                <div class="title">
                  <skeleton-line />
                </div>
                <div class="description">
                  <div v-for="line in 2" :key="line" class="line-item">
                    <skeleton-line />
                  </div>
                </div>
                <skeleton-line class="meta" />
              </div>
            </li>
          </ul>
        </div>
      </template>
      <template #default>
        <div class="article-list">
          <div
            v-for="(article, index) in articleList" :key="index" class="article-list-item"
          >
            <div class="item-content bg-main p-2 rounded-md bg-hover">
              <div class="item-thumb">
                <nuxt-link :to="`/article/${article.article_id}`">
                  <span class="item-oirigin" :class="originClassMap[article.origin]">
                    {{ originTextMap[article.origin] }}
                  </span>
                  <img class="item-thumb-img" :src="article.src">
                </nuxt-link>
              </div>
              <div class="item-body">
                <div class="item-title">
                  <nuxt-link :to="`/article/${article.article_id}`">
                    {{ article.title }}
                  </nuxt-link>
                </div>

                <p class="item-description" style="-webkit-box-orient: vertical" v-html="article.description" />
                <div class="item-meta">
                  <span class="date">
                    <Icon :name="APP_ICON.clock" class="color-gray" />
                    <span class="ml-2">{{ $dayjs(article.date).fromNow() }}</span>
                  </span>
                  <span class="views">
                    <Icon :name="APP_ICON.eye" class="color-gray" />
                    <span class="ml-2">{{ article.view_num || 0 }}</span>
                  </span>
                  <span class="comments">
                    <Icon :name="APP_ICON.discuss" class="color-gray" />
                    <span class="ml-2">{{ article.cmt_num || 0 }}</span>
                  </span>
                  <span class="likes">
                    <Icon v-if="article.isLiked" :name="APP_ICON.heart" class="text-red-600" />
                    <Icon v-else :name="APP_ICON.heart" class="color-gray" />
                    <span class="ml-2">{{ article.likes || 0 }}</span>
                  </span>
                  <span class="categories">
                    <Icon :name="APP_ICON.category" class="color-gray" />
                    <nuxt-link :to="`/category/${article.category}`">
                      <span class="ml-2">{{
                        categoryMap[article.category]
                      }}</span>
                    </nuxt-link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Placeholder>
    <!-- 加载更多 -->
    <ClientOnly>
      <div class="article-load w-full relative h-10 mt-4 rounded-md overflow-hidden">
        <div class="background z-0">
          <span class="left bg-main " />
          <span v-if="isLastPage" class="right bg-main cursor-not-allowed" />
          <span v-else class="right bg-main" @click="loadMore" />
        </div>
        <div class="flex flex-row justify-between h-full w-full items-center z-10 font-black">
          <div class="ml-5">
            {{ isLastPage ? totalCount : currPage * limit }}/{{ totalCount }}
          </div>
          <div v-show="!pending" class="w-24 text-right mr-3 ">
            <span v-if="isLastPage"> 到底了</span>
            <span v-else>加载更多</span>
            <Icon name="material-symbols:double-arrow" class="color-gray mb-1" rotate="90deg" />
          </div>
          <div v-show="pending" class="w-24 text-center mr-3 ">
            <Icon name="eos-icons:bubble-loading" class="color-gray mb-1" />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.article-list-skeleton {
  padding: 0;
  margin-top: $lg-gap;
  list-style: none;
  overflow: hidden;

  .item {
    display: flex;
    height: 8.5rem;
    padding: $gap;
    margin-bottom: $lg-gap;
    &:last-child {
      margin-bottom: 0;
    }

    .thumb {
      height: 100%;
      width: 15rem;
    }

    .content {
      margin-left: $lg-gap;
      flex-grow: 1;

      .title {
        height: 1.5em;
        width: 36%;
      }

      .description {
        .line-item {
          width: 100%;
          height: $lg-gap;
          margin-top: $sm-gap;
        }
      }

      .meta {
        width: 68%;
        height: $lg-gap;
        margin-top: $lg-gap;
      }
    }
  }
}

.articles {
  .article-list {
    margin-bottom: $lg-gap;
    min-height: $lg-gap;
    overflow: hidden;
  }

  .article-list-item {
    margin-top: $lg-gap;

    >.item-content {
      height: 8.5rem;
      display: block;
      overflow: hidden;

      &:hover {
        .item-thumb {
          .item-oirigin {
            opacity: 1;
          }

          .item-thumb-img {
            opacity: 0.95;
            transform: translateX(-3px);
          }
        }
      }

      >.item-thumb {
        float: left;
        width: 11rem;
        height: 7.5rem;
        overflow: hidden;
        position: relative;

        .item-oirigin {
          position: absolute;
          left: 0;
          top: 0;
          height: 1rem;
          line-height: 1rem;
          z-index: $z-index-normal + 1;
          padding: 0 $sm-gap;
          border-bottom-right-radius: 0.8rem;
          opacity: 0.5;
          font-size: $font-size-small;
          text-align: center;
          text-transform: uppercase;

          &.self {
            background-color: rgba($accent, 0.8);
          }

          &.other {
            background-color: rgba($red, 0.8);
          }

          &.hybrid {
            background-color: rgba($yellow, 0.8);
          }
        }

        .item-thumb-img {
          min-width: 100%;
          width: calc(100% + 3px);
          max-width: calc(100% + 3px);
          height: 7.5rem;
          border-color: transparent;
          opacity: 1;
          transform: translateX(0);
          transition: transform $transition-time-fast,
            opacity $transition-time-fast;
        }
      }

      >.item-body {
        float: right;
        width: 24rem;
        height: 7.5rem;

        >.item-title {
          height: 1.2rem;
          line-height: 1.2rem;
          font-size: 1rem;
          margin-top: 0.25rem;
          margin-bottom: $sm-gap;
          font-weight: bold;
          @include text-overflow();

          >a {
            margin-left: 0;
            transition: margin 0.25s;

            &:hover {
              display: inline-block;
              text-decoration: underline;
              margin-left: $sm-gap;
            }
          }
        }

        >.item-description {
          height: 4rem;
          margin: 0;
          margin-bottom: $xs-gap;
          line-height: 1.8em;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: $font-size-h6;
          @include clamp(3);
        }

        >.item-meta {
          height: 1.2rem;
          line-height: 1.2rem;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-wrap: normal;
          font-size: 0.8rem;
        }
      }
    }
  }

  .article-load {
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .left {
        flex: 1;
        margin-left: -0.75rem;
        margin-right: 0.75rem;
        transform: skew(-20deg);

        &:hover {
          background-color: white;
          opacity: 0.4;
        }
      }

      .right {
        width: 8rem;
        margin-right: -0.75rem;
        transform: skew(-20deg);

        &:hover {
          background-color: white;
          opacity: 0.4;
        }
      }
    }
  }
}
// for list transition
.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity $transition-time-normal;
}
.list-fade-enter,
.list-fade-leave-active {
  opacity: 0;
}
.list-fade-move {
  transition: transform $transition-time-normal;
}
</style>

