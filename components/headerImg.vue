<script setup>
import { routerMap } from '@/config/maps'
import { useAppStore } from '@/store'
const appStore = useAppStore()
const route = useRoute()
const tags = computed(() => appStore.tags)
const { isMobile } = useDevice()
const origin = route.params.origin
const cate = route.params.cate
let backgroundImg = ''
let text = ''
if (origin === 'search') {
  backgroundImg = routerMap[origin].backgroundImg
  text = `搜索与 ${cate} 相关的文章`
}
else if (origin === 'tag') {
  const tag = tags.value.find(t => t.name === cate)
  backgroundImg = tag.img
  text = tag.description
}
else if (origin === 'category') {
  backgroundImg = routerMap[origin][cate].backgroundImg
  text = routerMap[origin][cate].text
}
else {
  // 404

}
</script>

<template>
  <div
    class="header-Imgbox h-48 rounded overflow-hidden"
    :class="{ mobile: isMobile }"
    :style="{
      'background-image': `url(https://kedong.me/${backgroundImg})`,
      'color': 'white',
    }"
  >
    <div class="logo-box">
      <p class="logo" />
    </div>
    <div class="title-box">
      <h5 key="category-11" class="title">
        <span>{{ text }}</span>
      </h5>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-Imgbox {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-size: cover;
  background-blend-mode: hue;
  background-position: center center;

  &.mobile {
    height: 12rem;

    >.logo-box {
      height: 8.6rem;

      >.logo {
        line-height: 8.6rem;

        >.iconfont {
          font-size: 5em;
        }
      }
    }
  }

  >.logo-box {
    height: 12rem;
    overflow: hidden;

    >.logo {
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

  >.title-box {
    height: 4rem;
    line-height: 2.5rem;

    >.title {
      margin: 0;
      text-align: center;
      text-transform: capitalize;
    }
  }
}
</style>

