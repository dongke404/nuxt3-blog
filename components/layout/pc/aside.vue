<script setup>
const { data } = await http.get('/article', { sort: 1, limit: 10 })
const { data: tagsdata } = await http.get('/tag')
const articles = data.value.list
const tags = tagsdata.value
</script>

<template>
  <aside id="aside" class="aside">
    <!-- 热门文章 -->
    <div class="aside-article bg-main bg-hover rounded-md">
      <p class="title">
        <i class="iconfont icon-hotfill" />
        <strong v-text="'热门文章'" />
      </p>
      <ul class="aside-article-list">
        <li v-for="item in articles" :key="item.id" class="item">
          <span class="index" />
          <span v-text="item.title" />
        </li>
      </ul>
    </div>
    <div class="aside-sticky-box">
      <!-- 这里添加广告栏 -->
      <!-- 标签版块 -->
      <div class="aside-tag bg-main bg-hover rounded-md ">
        <ul class="aside-tag-list">
          <li v-for="(tag, index) in tags" :key="index" class="item">
            <!-- <nuxt-link :to="`/tag/${tag.name}`"> -->
            <div class="flex  w-full h-full" :title="tag.description">
              <div class="bg-gray-300 p-1">
                <!-- <img :src="`https://kedong.me${tag.icon}`" class=" h-5 w-5"> -->
              </div>
              <span class=" pl-2 pr-2 pt-1 " style="background-color: rgba(129,129,129, 0.5);">
                <span>{{ tag.name }}</span>
                <span>({{ tag.count || 0 }})</span>
              </span>
            </div>
            <!-- </nuxt-link> -->
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
    .aside-calendar,
    .aside-friendlink,
    .aside-tag {
      margin-bottom: $lg-gap;
    }

    > .aside-article {
      overflow: hidden;

      > .title {
        height: 3em;
        line-height: 3em;
        margin: 0;
        padding: 0 $gap;
        text-transform: uppercase;

        .iconfont {
          margin-right: $sm-gap;
        }
      }

      > .aside-article-list {
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
      $top-height: $header-height + $lg-gap;
      $tool-height: 3rem;
      position: sticky;
      top: $top-height;
      width: $aside-width;

      > .aside-tag {
        max-height: calc(
          100vh - 88px - #{$top-height + $lg-gap + $lg-gap + $tool-height}
        );
        overflow-y: auto;
      }

      > .aside-tag {
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
            padding:  0 0.8rem 0.8rem 0;
            font-size: 0.8rem;
            text-transform: capitalize;
          }
        }
      }
      > .aside-friendlink {
        padding-left: $gap;
        border-top: $gap solid transparent;
        border-bottom: $gap solid transparent;
        span{
          font-size: 16px;
        }
        >.tag-items {
          a {
            display: inline-block;
            padding: 5px;
            border: #dfe6e9 solid 1px ;
            margin: 4px 2px 4px 0px;
          }
        }
      }
    }
  }
  </style>

