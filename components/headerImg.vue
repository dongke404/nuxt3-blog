<script setup>
import { routerMap } from '@/config/maps'

const props = defineProps({
  cate: {
    type: String,
    default: '',
  },
})

const { isMobile } = useDevice()
const category = routerMap.category
</script>

<template>
  <div
    class="header-box"
    :class="{
      mobile: isMobile,
    }"
    :style="{
      'background-image': `url(https://kedong.me/${category[props.cate].backgroundImg})`,
      'color': 'white',
    }"
  >
    <div class="logo-box">
      <p class="logo" />
    </div>
    <div class="title-box">
      <h5 key="category-11" class="title">
        <span>{{ category[props.cate].text }}</span>
      </h5>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
  .header-box {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 16.4rem;
    background-size: cover;
    background-blend-mode: hue;
    background-position: center center;

    &.mobile {
      height: 12rem;

      > .logo-box {
        height: 8.6rem;

        > .logo {
          line-height: 8.6rem;

          > .iconfont {
            font-size: 5em;
          }
        }
      }
    }

    > .logo-box {
      height: 12rem;
      overflow: hidden;

      > .logo {
        margin: 0;
        line-height: 12rem;
        text-align: center;

        @keyframes logo-animate {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .iconfont {
          font-size: 6em;
          display: inline-block;
          animation: logo-animate 5s infinite;
        }
      }
    }

    > .title-box {
      height: 4rem;
      line-height: 2.5rem;

      > .title {
        margin: 0;
        text-align: center;
        text-transform: capitalize;
      }
    }
  }
  </style>

