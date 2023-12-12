<script setup>
import { APP_ICON, APP_IMAGES, meta } from '@/config'
const emit = defineEmits(['close'])
const colorMode = useColorMode()
const close = () => {
  emit('close')
}

const dark = () => {
  colorMode.preference = 'dark'
}
const light = () => {
  colorMode.preference = 'light'
}
</script>

<template>
  <aside class="aside z-50">
    <div class="aside-user">
      <div class="avatar">
        <img :src="APP_IMAGES.myAvatar" :alt="APP_IMAGES.myAvatar">
      </div>
      <div class="profile">
        <h3 class="name">
          {{ meta.author }}
        </h3>
        <div class="slogan text-sm text-blue-500">
          {{ meta.slogan }}
        </div>
      </div>
    </div>
    <div class="aside-tool">
      <div class="item">
        <Icon v-show="$colorMode.value === 'dark'" :name="APP_ICON.sun" @click="light" />
        <Icon v-show="$colorMode.value === 'light'" :name="APP_ICON.moon" @click="dark" />
      </div>
      <div class="item">
        <div v-if="$i18n.locale === 'en'" @click="$i18n.locale = 'zh'">
          zh
        </div>
        <div v-if="$i18n.locale === 'zh'" @click="$i18n.locale = 'en'">
          en
        </div>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list text-sm">
        <nuxt-link to="/" class="item" @click="close">
          <Icon class="ml-1" :name="APP_ICON.home" />
          <span class="ml-3" v-text="$t('nav.home')" />
        </nuxt-link>
        <nuxt-link to="/category/code" class="item" @click="close">
          <Icon class="ml-1" :name="APP_ICON.code" />
          <span class="ml-3" v-text="$t('nav.code')" />
        </nuxt-link>
        <nuxt-link to="/category/think" class="item" @click="close">
          <Icon class="ml-1" :name="APP_ICON.think" />
          <span class="ml-3" v-text="$t('nav.think')" />
        </nuxt-link>
        <nuxt-link to="/category/life" class="item" @click="close">
          <Icon class="ml-1" :name="APP_ICON.life" />
          <span class="ml-3" v-text="$t('nav.life')" />
        </nuxt-link>
        <nuxt-link to="/archive" class="item" @click="close">
          <Icon class="ml-1" :name="APP_ICON.calendar" />
          <span class="ml-3" v-text="$t('nav.timeline')" />
        </nuxt-link>
        <nuxt-link to="/guestbook/1" class="item" @click="close">
          <Icon class="ml-1" :name="APP_ICON.discuss" />
          <span class="ml-3" v-text="$t('nav.guestbook')" />
        </nuxt-link>
        <nuxt-link to="/about" class="item" @click="close">
          <Icon class="ml-1" :name="APP_ICON.person" />
          <span class="ml-3" v-text="$t('nav.about')" />
        </nuxt-link>
      </nav>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  display: block;
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  color: $white;

  .aside-user {
    $size: 58px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: $gap * 2;

    .avatar {
      width: $size;
      height: $size;
      flex-shrink: 0;

      img {
        max-width: 100%;
        border: 2px solid $white;
        @include radius-box(100%);
      }
    }

    .profile {
      height: $size;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      margin-left: $lg-gap;

      .name {
        font-weight: bold;
        margin-top: 0;
        margin-bottom: $sm-gap;
      }

      .slogan {
        margin: 0;
        max-width: 10rem;
        @include text-overflow();
      }
    }
  }

  .aside-tool {
    padding: $gap 0;
    display: flex;

    .item {
      width: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-h2;
    }
  }

  .aside-nav {
    width: 100%;
    margin-top: $sm-gap;

    .nav-list {
      padding: 0;
      margin: 0;

      .item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 3em;
        margin-bottom: 0.5em;
        padding: 0 1em;
        border: none;
        text-decoration: none;
        color: $white;

        &:last-child {
          margin-bottom: 0;
        }

        &.link-active {
          font-weight: bold;
          background-color: #e3e3e3;
          color: #0088f5;
        }

        &.app {
          display: flex;
          align-items: center;
          margin-top: $gap;

          .icon {
            width: 1em;
            height: 1em;
            margin-right: 1em;
            border-radius: $xs-radius;
          }
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
          font-weight: normal;
        }

        .newscript {
          margin-left: $sm-gap;
          font-size: $font-size-small;
        }
      }
    }
  }
}
</style>

