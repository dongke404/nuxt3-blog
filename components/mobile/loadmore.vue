<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import { useArticleListStore } from '@/store/articleList'
const props = defineProps({
  params: {
    type: Object,
    default: () => ({}),
  },
})

const articleListStore = useArticleListStore()
const loading = ref(false)
const isfinished = computed(() => articleListStore.isfinished)
const target = ref(null)
const loadMore = () => {
  loading.value = true
  articleListStore.loadmore(props.params, () => {
    loading.value = false
  })
}
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    // loadMore()
    if (isIntersecting && !isfinished.value)
      loadMore()
  },
)
</script>

<template>
  <div ref="target" class="loadmore">
    <div v-if="loading && !isfinished" class="loading">
      <div class="module-bg-darker-3" />
      <div class="module-bg-darker-3" />
      <div class="module-bg-darker-4" />
      <div class="module-bg-darker-3" />
    </div>
    <!-- <button v-else-if="!finished" class="normal" @click="emitLoadEvent">
      <i class="iconfont icon-loadmore" />
    </button> -->
    <span v-else class="finised">
      已经到底了
    </span>
  </div>
</template>

<style lang="scss" scoped>
.loadmore {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  color: $text-disabled;

  .normal {
    width: 100%;
    font-size: $font-size-h2;
  }

  .finised {
    margin: $xs-gap 0;
    color: $text-divider;
    font-weight: bold;
  }

  .loading {
    margin: $sm-gap 0;
    display: flex;
    align-items: center;

    @keyframes loading {
      0% {
        opacity: 1;
      }

      50% {
        opacity: 0.5;
      }

      100% {
        opacity: 1;
      }
    }

    >div {
      width: 0.6rem;
      margin: 0 $sm-gap;
      border-radius: $mini-radius;
      animation: loading 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;

      &:nth-child(1) {
        height: 1.6rem;

        animation-delay: -0.6s;
      }

      &:nth-child(2) {
        height: 1rem;

        animation-delay: -0.4s;
      }

      &:nth-child(3) {
        height: 1rem;

        animation-delay: -0.2s;
      }

      &:nth-child(4) {
        height: 1.6rem;

        animation-delay: -1s;
      }
    }
  }
}
</style>

