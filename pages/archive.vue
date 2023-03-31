<script setup>
import { useAppStore } from '@/store'
import { APP_IMAGES } from '@/config'
const { isMobile } = useDevice()
definePageMeta({
  layout: 'custom',
})
const appStore = useAppStore()
appStore.getStatistics()
const statistics = computed(() => appStore.statistics)
const articles = ref([])
const pending = ref(true)

http.get('/timeline').then(({ data }) => {
  articles.value = data
  pending.value = false
})
</script>

<template>
  <div class="archive-page" :class="{ mobile: isMobile }">
    <CommonPageBanner :position="32" :image="APP_IMAGES.archiveBanner" :is-mobile="isMobile">
      <template #title>
        归档
      </template>
      <template #description>
        归档
      </template>
    </CommonPageBanner>
    <div class="statistic-warpper bg-main">
      <transition name="module" mode="out-in">
        <div class="statistics">
          <div class="item">
            <p class="title">
              <span class="text">全站文章</span>
              <Icon name="mdi:leaf" />
            </p>
            <div class="content ">
              {{ statistics.blog_num }}
            </div>
          </div>
          <div class="item">
            <p class="title">
              <span class="text">今日阅读</span>
              <Icon name="ic:baseline-remove-red-eye" />
            </p>
            <div class="content">
              {{ statistics.view_num_today }}
            </div>
          </div>
          <div class="item">
            <p class="title">
              <span class="text">全站评论</span>
              <Icon name="ri:discuss-fill" />
            </p>
            <div class="content">
              {{ statistics.comment_num }}
            </div>
          </div>
          <div class="item">
            <p class="title">
              <span class="text">全站点赞</span>
              <Icon name="ri:heart-2-fill" />
            </p>
            <div class="content">
              {{ statistics.likes }}
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="archive-warpper bg-main">
      <placeholder :data="articles.length" :loading="pending">
        <template #placeholder>
          <empty key="empty" class="archive-empty" />
        </template>
        <template #loading>
          <ul key="skeleton" class="archive-skeleton">
            <li v-for="item in 3" :key="item" class="item">
              <skeleton-line v-for="i in 3" :key="i" class="line" />
            </li>
          </ul>
        </template>
        <template #default>
          <ArchiveTree key="content" class="archive-content" :tree="articles">
            <template #title="{ title }">
              <h1 class="archive-title">
                {{ title }}
              </h1>
            </template>
            <template #article="{ article, day }">
              <div class="archive-article">
                <div class="left">
                  <h3 class="title">
                    <span class="date">D{{ day }}</span>
                    <nuxt-link :to="`/article/${article.article_id}`" class="link" :title="article.title">
                      {{ article.title }}
                    </nuxt-link>
                  </h3>
                  <p class="description" v-html="article.description" />
                </div>
                <div v-if=" !isMobile" class="metas">
                  <div class="item views">
                    <Icon name="ic:baseline-remove-red-eye" />
                    <span class="text">{{ article.view_num }}</span>
                  </div>
                  <CommonDivider type="vertical" />
                  <div class="item likes">
                    <Icon name="ri:heart-2-fill" />
                    <span class="text">{{ article.likes }}</span>
                  </div>
                  <CommonDivider type="vertical" />
                  <div class="item comments">
                    <Icon name="ri:discuss-fill" />
                    <span class="text">{{ article.cmt_num }}</span>
                  </div>
                </div>
              </div>
            </template>
          </ArchiveTree>
        </template>
      </placeholder>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.archive-page {
  position: relative;

  &.mobile {
    .statistic-warpper {
      font-size: small;
      padding: 2rem 0;
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    .archive-warpper {
      margin-top: 1rem;
      border-radius: 0.5rem;
      padding: 2rem 0rem;
      overflow: hidden;

      .archive-empty {
        min-height: 28rem;
        font-weight: bold;
      }

      .archive-skeleton {
        list-style: none;
        margin: 0;
        padding: 2rem 0rem;

        .item {
          width: 100%;
          padding: 2rem;
          margin-bottom: 3rem;
          @include radius-box($lg-radius);

          &:last-child {
            margin-bottom: 0;
          }

          .line {
            height: 2rem;
            margin-bottom: 2rem;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .archive-content {
        margin-top: -1rem;

        .archive-title {
          margin: 1em 0;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }

        .archive-article {
          padding:0 1rem;
          margin-bottom: 0;
          .left {
            .title {
              font-size: medium;
            }

            .description {
              margin-bottom: $gap;
              padding-left: 3rem;
            }
          }

        }
      }
    }
  }

  .statistic-warpper {
    padding: 2rem 0;

    .skeletons,
    .statistics {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .skeletons {
      .item {
        width: 5em;
        height: 2em;
      }
    }

    .statistics {
      .item {
        display: flex;
        flex-direction: column;

        .title {
          display: flex;
          align-items: center;
          margin-bottom: 0;

          .text {
            text-transform: uppercase;
            margin-right: 0.25rem;
          }
        }

        .content {
          font-size: $font-size-h1 * 1.3;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }

  .archive-warpper {
    padding: 2.5rem 5rem;
    overflow: hidden;

    .archive-empty {
      min-height: 28rem;
      font-weight: bold;
    }

    .archive-skeleton {
      list-style: none;
      margin: 0;
      padding: 2.5rem 5rem;

      .item {
        width: 100%;
        padding: 2rem;
        margin-bottom: 3rem;
        @include radius-box($lg-radius);

        &:last-child {
          margin-bottom: 0;
        }

        .line {
          height: 2rem;
          margin-bottom: 2rem;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }

    .archive-content {
      margin-top: -1rem;

      .archive-title {
        margin: 2em 0;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 0.2em;
      }

      .archive-article {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $gap * 3;
        padding-left: $gap * 4;
        padding-right: $gap * 3;

        .left {
          .title {
            margin: $gap 0;

            .date {
              display: inline-block;
              width: 2rem;
              margin-right: $gap;
              font-size: $font-size-h4;
              font-weight: bold;
            }

            .link {
              @include text-underline(0.4em);
            }
          }

          .description {
            margin-bottom: $gap;
            padding-left: 3rem;
          }
        }

        .metas {
          margin-left: 2em;
          display: inline-flex;
          align-items: center;
          font-size: $font-size-h4;

          .item {
            width: 4em;
            text-align: center;

            &.views {
              width: 5em;
            }

            .iconfont {
              margin-right: $sm-gap;
            }

            .text {
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>

