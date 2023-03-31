<script setup>
import { APP_ICON } from '@/config'
import {
  categoryMap,
  originClassMap,
  originTextMap,
} from '@/config/maps/index'
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
</script>

<template>
  <div>
    <Placeholder :data="props.data.length" :loading="props.loading">
      <template #loading>
        <div>
          <ul key="skeleton" class="article-list-skeleton ">
            <li v-for="item in 6" :key="item" class="item bg-main rounded-md">
              <div class="thumb">
                <skeleton-base />
              </div>
              <div class="content mt-2">
                <div class="title">
                  <skeleton-line />
                </div>
                <div class="description">
                  <div v-for="line in 1" :key="line" class="line-item">
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
        <div>
          <div v-for="article in props.data" :key="article.article_id" class="mb-4">
            <div class=" bg-main rounded-md  overflow-hidden">
              <div class="item-thumb w-full">
                <nuxt-link :to="`/article/${article.article_id}`">
                  <span class="item-oirigin z-10" :class="originClassMap[article.origin]">
                    {{ originTextMap[article.origin] }}
                  </span>
                  <img class="w-full h-full " :src="article.src">
                </nuxt-link>
              </div>
              <div class="p-2">
                <p class=" font-semibold p-1">
                  <nuxt-link :to="`/article/${article.article_id}`">
                    {{ article.title }}
                  </nuxt-link>
                </p>

                <p class="p-1 text-sm text-gray-500" v-html="article.description" />
                <p class="color-gray text-xs p-1 flex justify-around">
                  <span class="mr-2">
                    <Icon :name="APP_ICON.clock" class="color-gray text-[0.7rem]" />
                    <span class="ml-1">{{ $dayjs(article.date).fromNow() }}</span>
                  </span>
                  <span class="mr-2">
                    <Icon :name="APP_ICON.eye" class="color-gray text-[0.7rem]" />
                    <span class="ml-1">{{ article.view_num || 0 }}</span>
                  </span>
                  <span class="mr-2">
                    <Icon :name="APP_ICON.discuss" class="color-gray text-[0.7rem]" />
                    <span class="ml-1">{{ article.cmt_num || 0 }}</span>
                  </span>
                  <span class="mr-2">
                    <Icon v-if="article.isLiked" :name="APP_ICON.heart" class="text-red-600 text-[0.7rem]" />
                    <Icon v-else :name="APP_ICON.heart" class="color-gray text-[0.7rem]" />
                    <span class="ml-1">{{ article.likes || 0 }}</span>
                  </span>
                  <span class="mr-2">
                    <Icon :name="APP_ICON.category" class="color-gray text-[0.7rem]" />
                    <nuxt-link :to="`/category/${article.category}`">
                      <span class="ml-1">{{
                        categoryMap[article.category]
                      }}</span>
                    </nuxt-link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Placeholder>
    <!-- 加载更多 -->
    <ClientOnly>
      <MobileLoadmore />
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
    padding: $gap;
    margin-bottom: $lg-gap;
    width: 100%;
    &:last-child {
      margin-bottom: 0;
    }

    .thumb {
      height: 8rem;
      width: 100%;
    }
    .content {
      flex-grow: 1;
      .title {
        height: 1.5em;
        width: 50%;
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

.item-thumb {
  height: 7.5rem;
  overflow: hidden;
  position: relative;

  .item-oirigin {
    position: absolute;
    left: 0;
    top: 0;
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 $sm-gap;
    border-bottom-right-radius: 0.2rem;
    opacity: 0.9;
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

