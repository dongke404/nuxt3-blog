<script setup>
import { originClassMap, originTextMap } from '@/config/maps'
import { numberSplit } from '@/utils/transforms/text'
import * as ANCHORS from '@/constants/anchor'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const element = ref(null)
const totalWords = ref('')
onMounted(() => {
  // 获取html字数
  totalWords.value = element.value.innerText.replace(/\s+/g, '').length
})
// onUpdated(() => {
//   // 获取html字数
//   totalWords.value = element.value.innerText.replace(/\s+/g, '').length
// })
</script>

<template>
  <div ref="element" class="detail ">
    <client-only>
      <div
        class="oirigin"
        :class="originClassMap[props.data.origin]"
      >
        {{ originTextMap[props.data.origin] }}
      </div>
    </client-only>
    <div key="knowledge" class="knowledge">
      <div :id="ANCHORS.ARTICLE_CONTENT_ELEMENT_ID" class="title ">
        <h1 class="text">
          {{ props.data.title }}
        </h1>
        <client-only>
          <div class="meta">
            <Icon name="ph:text-t-fill" />
            共{{ numberSplit(totalWords) }}字，阅读时长约{{ Math.ceil(totalWords / 400) }}分钟
            <common-divider type="vertical" class="vertical" />
            <Icon name="material-symbols:nest-clock-farsight-analog-outline" />
            {{ props.data.date }}&nbsp;
            <common-divider type="vertical" class="vertical" />
            <Icon name="ic:baseline-remove-red-eye" />
            {{ props.data.view_num }}&nbsp;
          </div>
        </client-only>
      </div>
      <CommonMarkdown :html="props.data.content" :show-word-count="true" :islozad="true" />
      <div class=" text-center mb-2 mt-2">
        （完）
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .detail {
    padding: 0.75rem 1.5rem;
    position: relative;
    overflow: hidden;
    height: auto;
    transition: height $transition-time-normal;

    .oirigin {
      position: absolute;
      top: 0.45rem;
      left: -1.8rem;
      transform: rotate(-45deg);
      width: 6rem;
      height: 1.5rem;
      line-height: 1.5rem;
      text-align: center;
      transform-origin: center;
      color: $white;
      font-weight: bold;
      font-size: $font-size-small;
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

    .knowledge {
      user-select: text;
      position: relative;

      .title {
        margin: 1em 0 1.2em 0;
        text-align: center;

        .text {
          font-weight: 700;
          margin-bottom: $gap;
        }

        .meta {
          display: inline-block;
          color: $text-disabled;
          font-size: $font-size-small;
          user-select: none;
          line-height: 2;
          .iconfont {
            margin-right: $xs-gap;
          }
          .vertical {
            top: -1px;
          }
        }
      }

    }
  }
</style>
