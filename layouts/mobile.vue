<script setup>
const isOpenedAside = ref(false)
const closeAside = () => isOpenedAside.value = false
const openAside = () => isOpenedAside.value = true
</script>

<template>
  <div class="mobile-main bg-gray-200 dark:bg-gray-800">
    <div class="asider" :class="{ opened: isOpenedAside }">
      <LayoutMobileAside class="aside" @close="closeAside" />
    </div>
    <div class="main" :class="{ opened: isOpenedAside }">
      <div v-if="isOpenedAside" class="close-mask" @click="closeAside" />
      <LayoutMobileHeader :opened="isOpenedAside" @close="closeAside" @open="openAside" />
      <main class="main-container">
        <slot />
      </main>
      <LayoutMobileFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mobile-main {
  $aside-width: 66%;

  .asider {
    width: $aside-width;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate3d(-100%, 0, 0);
    transition: $mobile-aside-transition;
    background-color: #34393d;
    .aside {
      opacity: 0;
      transform: scale(0.8, 0.8);
      transition: $mobile-aside-transition;
    }

    &.opened {
      transform: translate3d(0, 0, 0);
      overflow: hidden;
      -webkit-overflow-scrolling: touch;

      .aside {
        opacity: 1;
        transform: scale(1, 1);
        transition: $mobile-aside-transition;
      }
    }
  }

  .main {
    min-height: 100vh;
    position: relative;
    transition: $mobile-aside-transition;

    &.opened {
      transform: translate3d($aside-width, 0, 0);
    }

    .close-mask {
      position: absolute;
      width: 100vw;
      height: 100%;
      top: 0;
      right: 0;
      z-index: $z-index-top;
      @include backdrop-blur(3px);
    }

    .main-container {
      position: relative;
      overflow: hidden;
      width: 100%;
      min-height: calc(100vh - $mobile-header-height);
      margin: 0;
      padding: $lg-gap $gap;
      padding-top: $mobile-header-height + $lg-gap;
      transition: width 0.35s;

      .fallback {
        width: 100%;
        padding-bottom: 6rem; // for middle
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .iconfont {
          font-size: 12rem;
        }

        .text {
          font-size: $font-size-h4;
          margin-bottom: $lg-gap;
        }

        .link {
          @include text-underline(0.4em);
        }
      }

      .route-view {
        width: 100%;
      }
    }
  }
}
</style>
