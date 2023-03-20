<script setup>
import * as ANCHORS from '@/constants/anchor'
import { scrollToAnchor } from '@/utils/scroller'
import { numberSplit } from '@/utils/transforms/text'
import { useArticleStore } from '@/store/article'

const articleStore = useArticleStore()
const article =computed(()=>articleStore.articleDetail)
const headings =computed(()=>articleStore.headings)

const minHeadingLevel = computed(() => {
  return Math.min(...headings.value.map(heading => heading.level))
})
const handleAnchor = (elementID) => {
  scrollToAnchor(elementID)
}
</script>

<template>
  <div v-if="article" class="anchor bg-main bg-hover mb-3 rounded">
    <button class="header" :title="article.title" @click="handleAnchor(ANCHORS.ARTICLE_CONTENT_ELEMENT_ID)">
      <div class="title">
        {{ article.title }}
      </div>
      <div class="read">
        共 1000字，需阅读
        1 分钟
      </div>
    </button>
    <div v-if="headings && headings.length" class="catalogue">
      <ul class="list" :class="`indent-${minHeadingLevel}`">
        <li
          v-for="(heading, index) in headings" :key="index" class="item" :title="heading.text"
          :class="`level-${heading.level}`" @click="handleAnchor(heading.id)"
        >
          <i class="level iconfont" :class="`icon-h-${heading.level}`" />
          <span class="text">{{ heading.text }}</span>
        </li>
      </ul>
    </div>
    <button class="link" @click="handleAnchor(ANCHORS.ARTICLE_META_ELEMENT_ID)">
      <i class="iconfont icon-heart" />

      <CommonDivider type="vertical" />
      <span class="meta">
        <i class="iconfont icon-like" />
        <span class="count">{{ 222 }}</span>
      </span>
      <CommonDivider type="vertical" />
      <span class="meta">
        <i class="iconfont icon-eye" />
        <span class="count">{{ numberSplit(article.view_num) }}</span>
      </span>
    </button>
    <button class="link" @click="handleAnchor(ANCHORS.ARTICLE_RELATED_ELEMENT_ID)">
      <i class="iconfont icon-category" />

      <CommonDivider type="vertical" />
      <span class="count">{{ 6 }}</span>
    </button>
    <button class="link" @click="handleAnchor(ANCHORS.COMMENT_ELEMENT_ID)">
      <i class="iconfont icon-comment" />

      <CommonDivider type="vertical" />
      <span class="count">{{ 111 }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.anchor {
    padding: $gap;
    display: flex;
    flex-direction: column;

    .header,
    .catalogue,
    .link {
        display: block;
        width: 100%;
        border: 1px dashed black;
        border-radius: 0.5rem;
        margin-bottom: $gap;
        text-align: left;
    }

    .header,
    .link,
    .catalogue {
        &:hover {
            border-color: blue;
        }
    }

    .link {
        flex-shrink: 0;
        padding: 0 $gap;
        height: 3rem;
        line-height: 3rem;
        @include text-overflow();

        &:last-child {
            margin-bottom: 0;
        }

        &:hover {
            color: blue;
        }

        .count {
            font-weight: bold;
        }

        .iconfont {
            margin-right: $sm-gap;
        }
    }

    .header {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        flex-shrink: 0;
        padding:0 $gap;
        height: 4rem;

        .title {
            display: block;
            width: 100%;
            font-weight: bold;
            @include text-overflow();
        }

        .read {
            font-size: $font-size-small;
        }
    }

    .catalogue {
        max-height: 36rem;
        padding: $sm-gap $gap;
        overflow-y: auto;
        // @include scroll-snap-y();

        &:hover {
            border-color: blue;
        }

        .list {
            padding: 0;
            margin: 0;
            list-style: none;
            padding-left: $xs-gap;

            &.indent-2 {
                margin-left: -$font-size-h4;
            }

            &.indent-3 {
                margin-left: -$font-size-h4 * 2;
            }

            &.indent-4 {
                margin-left: -$font-size-h4 * 3;
            }

            &.indent-5 {
                margin-left: -$font-size-h4 * 4;
            }

            &.indent-6 {
                margin-left: -$font-size-h4 * 5;
            }

            .item {
                cursor: pointer;
                line-height: 2.4em;
                // @include scroll-snap-item();
                @include text-overflow();

                &:hover {
                    color: blue;

                    .iconfont {
                        color: blue;
                    }

                    .text {
                        font-weight: bold;
                    }
                }

                .level {
                    margin-right: $xs-gap;
                    color: $text-disabled;
                }

                .text {
                    @include text-underline(0.4em);
                    text-decoration-style: dotted;
                }

                &.level-2 {
                    padding-left: $font-size-h4;
                }

                &.level-3 {
                    padding-left: $font-size-h4 * 2;
                }

                &.level-4 {
                    padding-left: $font-size-h4 * 3;
                }

                &.level-5 {
                    padding-left: $font-size-h4 * 4;
                }

                &.level-6 {
                    padding-left: $font-size-h4 * 5;
                }

                &.readmore {
                    margin-top: $xs-gap;

                    .text {
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>

