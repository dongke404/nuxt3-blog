<script setup name="header">
import themeSwitch from '@/components/widget/themeSwitch.vue'
import languageSwitchVue from '@/components/widget/languageSwitch.vue'
const active = ref(false)
const keyword = ref('')
</script>

<template>
  <header class="header z-50 bg-white bg-opacity-60 dark:bg-gray-700">
    <div class="header-container  m-auto ">
      <div class=" w-full header-header ">
        <div class="ml-4 text-2xl header-logo">
          Kirk Dong
        </div>
        <span class="header-slogan">{{ $t("slogan") }}</span>
        <nuxt-link to="/" class="header-link" :title="$t('slogan')" />
      </div>

      <div class="flex justify-center items-center">
        <div class="search mr-4" :class="[active ? 'active' : '']">
          <div class="icon" @click="active = !active" />
          <div class="input">
            <input v-model="keyword" type="text" placeholder="search">
          </div>
          <span v-if="active" class="clear" @click="keyword = ''" />
        </div>
        <ClientOnly>
          <themeSwitch />
          <languageSwitchVue />
        </ClientOnly>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import url("https://fonts.font.im/css?family=Hanalei+Fill");
.header {
  height: $header-height;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  user-select: none;

  .header-container {
    width: $container-width;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .header-header {
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      overflow: hidden;

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
        mask-image: linear-gradient(
          to bottom right,
          rgba(255, 255, 255, 0.2),
          rgba(255, 255, 255, 0.9),
          rgba(255, 255, 255, 0.2)
        );
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
  }
}

.search {
  position: relative;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  transition: 0.5s;
  overflow: hidden;
  &.active {
    width: 12rem;
  }
  .input {
    position: relative;
    width: 19rem;
    height: 2rem;
    left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      font-size: 1rem;
      padding: 0.625rem 0;
      background-color:transparent;
    }
  }
  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height:2rem;
    // background: #fff;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    cursor: pointer;
  }
  .icon::after {
    content: "";
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    border: 2px solid;
    border-radius: 50%;
    transform: translate(-3px, -3px);
  }
  .icon::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 12px;
    // background;
    border: 1px solid;
    transform: translate(6px, 6px) rotate(315deg);
  }
  .clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    right: 1rem;
    cursor: pointer;
    display: f1ex;
    justify-content: center;
    align-items: center;
  }
  .clear::before{
    content: "";
    position: absolute;
    width: 1px;
    height: 1rem;
    background: #999;
    transform:  rotate(45deg);
  }
  .clear::after{
    content: "";
    position: absolute;
    width: 1px;
    height: 1rem;
    background: #999;
    transform:  rotate(315deg);
  }
}
</style>

