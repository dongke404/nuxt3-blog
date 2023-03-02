<script setup>
import { routerMap } from '@/config/maps'
const isMobile = useDevice()
</script>

<template>
  <div class="guestbook-page" :class="{ mobile: isMobile }">
    <div class="detail">
      <div class="banner rounded">
        <img class="image" draggable="false" :src="routerMap.guestbook.backgroundImg">
        <span class="solgan" v-text="'不忘初心,方得始终'" />
      </div>
    </div>
    <div class="comment">
      <Comment :post-id="0" />
    </div>
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
      height: 19rem;
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
