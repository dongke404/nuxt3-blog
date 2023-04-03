<script setup>
import { APP_ICON } from '@/config'
const emit = defineEmits(['open'])
const router = useRouter()
const searchState = reactive({
  open: false,
  keyword: '',
})
const inputElement = ref(null)
const submitSearch = () => {
  if (!searchState.keyword)
    return
  router.push({
    path: `/search/${searchState.keyword}`,
  })
}

const handleMenuToggle = () => {
  emit('open')
}
const openSearch = () => {
  searchState.open = true
  nextTick(() => {
    inputElement.value.focus()
  })
}
const cancelSearch = () => {
  searchState.open = false
}
</script>

<template>
  <header class="header bg-main z-50">
    <div class="search z-50" :class="{ actived: searchState.open }">
      <input
        ref="inputElement" v-model.trim="searchState.keyword" class="input bg-white dark:bg-black" autocomplete="off" type="text"
        maxlength="16" required placeholder="关键字搜索" @keyup.enter.stop.prevent="submitSearch"
      >
      <span v-if="searchState.open" class="close bg-white dark:bg-black" @click.stop.prevent="cancelSearch">
        <Icon :name="APP_ICON.cancel" />
      </span>
    </div>
    <transition name="module">
      <div
        v-if="searchState.open" class="search-mask module-bg-translucent dark:dark-module-bg-translucent"
        @click="cancelSearch"
      />
    </transition>
    <nav class="navbar">
      <button class="navbar-menu" @click.stop.prevent="handleMenuToggle">
        <Icon :name="APP_ICON.menu" />
      </button>
      <nuxt-link to="/" class="navbar-logo">
        <div class="w-full header-header">
          <div class="text-xl header-logo">
            Kirk Dong
          </div>
        </div>
      </nuxt-link>
      <button v-if="!searchState.open" class="navbar-search z-50" @click.stop.prevent="openSearch">
        <Icon :name="APP_ICON.search" />
      </button>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $mobile-header-height;
  @include backdrop-blur(5px);

  .header-header {
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    overflow: hidden;
    text-align: center;

    @keyframes logo-blink {
      0% {
        mask-position: -30%;
      }

      100% {
        mask-position: 666%;
      }
    }

    .header-logo {
      font-weight: 700;
      color: #ad6598;
      width: 11rem;
      mask-size: 88%;
      mask-position: -30%;
      mask-image: linear-gradient(to bottom right,
          rgba(255, 255, 255, 0.2),
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.2));
      animation: logo-blink 8s ease-in 1s infinite;
    }

    .header-slogan {
      font-family: "Hanalei Fill", cursive;
    }

    .header-link {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .search-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    touch-action: none;
    @include backdrop-blur(3px);
  }

  .search {
    position: absolute;
    display: flex;
    width: 100%;
    height: $mobile-header-height;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(-100%);
    >.input {
      width: 80%;
      height: 100%;
      padding: 1em;
      border: none;
      outline:none;
    }

    >.close {
      width: 20%;
      height: 100%;
      line-height: $mobile-header-height;
      text-align: center;
    }

    &.actived {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  .navbar {
    width: 100%;
    height: $mobile-header-height;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;

    .navbar-menu,
    .navbar-search {
      height: 100%;
      width: 20%;
      line-height: $mobile-header-height;
      text-align: center;
    }

    .navbar-logo {
      width: 40%;

    }
  }
}
</style>

