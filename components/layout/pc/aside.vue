<script setup>
const rankArticle = useState('rankArticle')
const tags = useState('tags')
const statistics = useState('statistics')
const showAuchor = ref(false)
const router = useRoute()
watch(router, (to) => {
  // to.fullPath 正则 包含 /article/
  const regex = /\/article\//
  if (to.fullPath.match(regex))
    showAuchor.value = true
  else
    showAuchor.value = false
}, { immediate: true })
</script>

<template>
  <aside id="aside" class="aside">
    <!-- 统计 -->
    <nuxt-link to="/archive">
      <div class="bg-main bg-hover h-20 flex mb-3 rounded-md p-2 justify-around items-center text-center">
        <div>
          <div class="  text-xl font-semibold ">
            {{ statistics?.blog_num }}
          </div>
          <div class=" font-bold text-xs">
            全站文章
          </div>
        </div>
        <div class=" border-r-2 h-5 bg-slate-400 flex-none" />
        <div>
          <div class="  text-xl font-semibold">
            {{ statistics?.view_num_today }}
          </div>
          <div class=" font-bold text-xs">
            今日阅读
          </div>
        </div>
        <div class="border-r-2 h-5 bg-slate-400 flex-none" />
        <div>
          <div class=" text-xl font-semibold">
            {{ statistics.comment_num }}
          </div>
          <div class=" font-bold text-xs">
            全站评论
          </div>
        </div>
      </div>
    </nuxt-link>

    <!-- 热门文章 -->
    <div class="aside-article bg-main bg-hover rounded-md w-full">
      <p class="title">
        <i class="iconfont icon-hotfill" />
        <strong v-text="'热门文章'" />
      </p>
      <ul class="aside-article-list">
        <li v-for="item in rankArticle" :key="item.id" class="item">
          <nuxt-link :to="`/article/${item.article_id}`">
            <div>
              <span class="index" />
              <span v-text="item.title" />
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="aside-sticky-box">
      <!-- 这里添加广告栏 -->
      <!-- 标签版块 -->
      <ArticleAuchor v-if="showAuchor" />
      <div class="aside-tag bg-main bg-hover rounded-md ">
        <ul class="aside-tag-list">
          <li v-for="(tag, index) in tags" :key="index" class="item">
            <nuxt-link :to="`/tag/${tag.name}`">
              <div class="flex  w-full h-full" :title="tag.description">
                <div class="bg-gray-300 p-1">
                  <img :src="`https://kedong.me${tag.icon}`" class=" h-5 w-5">
                </div>
                <span class=" pl-2 pr-2 pt-1 " style="background-color: rgba(129,129,129, 0.5);">
                  <span>{{ tag.name }}</span>
                  <span>({{ tag.count || 0 }})</span>
                </span>
              </div>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <!-- 友情链接版块 -->
      <!-- <div class="aside-friendlink">
        <span>推荐链接</span>
        <div class="tag-items">
          <a v-for="item in friendlinks" :key="item.name" :href="item.link" target="_blank" rel="external nofollow noopenter">{{ item.name }}</a>
        </div>
      </div> -->
    </div>
  </aside>
</template>

<style lang="scss" scoped>
#aside {
  display: block;
  width: $aside-width;
  margin: 0;
  margin-left: $lg-gap;
  user-select: none;

  .aside-search,
  .aside-article,
  .aside-friendlink,
  .aside-tag {
    margin-bottom: $lg-gap;
  }

  >.aside-article {
    overflow: hidden;

    >.title {
      height: 3em;
      line-height: 3em;
      margin: 0;
      padding: 0 $gap;
      text-transform: uppercase;

      .iconfont {
        margin-right: $sm-gap;
      }
    }

    >.aside-article-list {
      list-style: none;
      padding: $sm-gap 0;
      margin-bottom: 0;
      counter-reset: hot-article-list;

      .item {
        display: block;
        height: 1.9em;
        line-height: 1.9em;
        padding: 0 $gap;
        margin-bottom: $sm-gap;
        @include text-overflow();

        &:nth-child(1) {
          .index {
            background-color: rgba(rgb(127, 6, 208), 0.6);
          }
        }

        &:nth-child(2) {
          .index {

            background-color: rgba($accent, 0.6);
          }
        }

        &:nth-child(3) {
          .index {
            background-color: rgba($red, 0.6);
          }
        }

        &:last-child {
          margin: 0;
        }

        .index {
          counter-increment: hot-article-list;

          width: 1.5em;
          height: 1.5em;
          line-height: 1.5em;
          display: inline-block;
          text-align: center;
          margin-right: $sm-gap;
          font-size: $gap;

          &::before {
            content: counter(hot-article-list);
          }
        }

        .title {
          font-size: $font-size-h6;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .aside-calendar {
    padding: $gap;
  }

  .aside-sticky-box {
    position: sticky;
    top: $header-height + $lg-gap;
    width: $aside-width;

    >.aside-tag {
      max-height: 25rem;
      overflow-y: auto;
    }

    >.aside-tag {
      width: 100%;
      padding-left: $gap;
      border-top: $gap solid transparent;
      border-bottom: $gap solid transparent;

      .aside-tag-list {
        list-style: none;
        padding: 0;
        margin: 0;
        overflow: hidden;

        .item {
          display: inline-flex;
          padding: 0 0.8rem 0.8rem 0;
          font-size: 0.8rem;
          text-transform: capitalize;
        }
      }
    }

    >.aside-friendlink {
      padding-left: $gap;
      border-top: $gap solid transparent;
      border-bottom: $gap solid transparent;

      span {
        font-size: 16px;
      }

      >.tag-items {
        a {
          display: inline-block;
          padding: 5px;
          border: #dfe6e9 solid 1px;
          margin: 4px 2px 4px 0px;
        }
      }
    }
  }
}
</style>

