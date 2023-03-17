<script setup>
import voteInit from '@/utils/vote-handler'
import { routerMap } from '@/config/maps'
import { COMMENT_NUM } from '@/config'
const route = useRoute()
const page = computed(() => route.params.page)
const { isMobile } = useDevice()
const pending = ref(true)
const comments = ref([])
const count = ref('')

const loadComemntList = ({ sort, page, callback, show_skeleton }) => {
  if (show_skeleton)
    pending.value = true
  http.get('/comment', {
    page,
    limit: COMMENT_NUM,
    sort,
    post_id: 0,
  }).then(({ data }) => {
    count.value = data.count
    comments.value = data.comments
    pending.value = false
    callback && callback()
  })
}

// loadComemntList({ sort: -1, page: page.value, show_skeleton: true })
http.get('/comment', {
  page: page.value,
  limit: COMMENT_NUM,
  sort: -1,
  post_id: 0,
}).then(({ data }) => {
  count.value = data.count
  comments.value = data.comments
  pending.value = false
})

onUpdated(() => {
  comments.value = voteInit(comments.value)
})
</script>

<template>
  <div class="guestbook-page" :class="{ mobile: isMobile }">
    <div class="detail">
      <div class="banner rounded h-48">
        <img class="image" draggable="false" :src="routerMap.guestbook.backgroundImg">
        <span class="solgan" v-text="'不忘初心,方得始终'" />
      </div>
    </div>
    <LazyComment
      :pending="pending"
      :comments="comments"
      :count="Number(count)"
      :init-page="Number(page)"
      @flash-comments="loadComemntList"
    />
  </div>
</template>

<style lang="scss" scoped>
.guestbook-page {
  &.mobile {
    > .detail {
      > .banner {
        height: 12rem;
      }
    }
  }

  .detail {
    margin-bottom: $lg-gap;

    .banner {
      position: relative;
      overflow: hidden;
      width: 100%;
      border: 0;

      .image {
        margin-top: -$gap * 6;
        transition: all 1s;

        &:hover {
          transform: rotate(2deg) scale(1.1);
          transition: all 1s;
        }
      }

      .solgan {
        position: absolute;
        right: $lg-gap * 2;
        bottom: $lg-gap * 2;
        display: block;
        font-weight: 700;
        opacity: 0.5;
        cursor: progress;
        padding: 0 $sm-gap;
        padding-left: 3rem;
        height: 2em;
        line-height: 2em;
      }
    }
  }
}
</style>
