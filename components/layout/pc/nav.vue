<script setup lang="ts">
// .link-active nuxt配置文件里设置
</script>

<template>
  <div id="nav" class="aside-nav">
    <nav class="nav-list">
      <nuxt-link to="/" class="item">
        <Icon class="icon-style" name="ic:round-home" />
        <span class="text" v-text="$t('nav.home')" />
      </nuxt-link>
      <nuxt-link to="/category/code" class="item">
        <Icon class="icon-style" name="material-symbols:code" />
        <i class="iconfont" />
        <span class="text" v-text="$t('nav.code')" />
      </nuxt-link>
      <nuxt-link to="/category/think" class="item">
        <Icon class="icon-style" name="mdi:head-lightbulb" />
        <span class="text" v-text="$t('nav.think')" />
      </nuxt-link>
      <nuxt-link to="/category/life" class="item">
        <Icon class="icon-style" name="uil:diary" />
        <span class="text" v-text="$t('nav.life')" />
      </nuxt-link>
      <nuxt-link to="/archive" class="item">
        <Icon class="icon-style" name="material-symbols:calendar-month" />
        <span class="text" v-text="$t('nav.timeline')" />
      </nuxt-link>
      <nuxt-link to="/guestbook/1" class="item">
        <Icon class="icon-style" name="ri:discuss-line" />
        <span class="text" v-text="$t('nav.guestbook')" />
      </nuxt-link>
      <nuxt-link to="/about" class="item">
        <Icon class="icon-style" name="material-symbols:person-pin" />
        <span class="text" v-text="$t('nav.about')" />
      </nuxt-link>
    </nav>
  </div>
</template>

<style lang="postcss" scoped>
.link-active {
  font-weight: bold;
  @apply bg-white bg-opacity-60 dark:bg-gray-700;
}
</style>

<style lang="scss" scoped>
.aside-nav {
  width: $navbar-width;
  height: auto;
  margin-right: $lg-gap;
  user-select: none;

  .nav-list {
    width: $navbar-width;
    padding: 0;
    margin: 0;
    position: fixed;

    .item {
      font-size: 0.85rem;
      border: none;
      display: block;
      position: relative;
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      padding: 0 $lg-gap;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 700;
      border-radius: 0.3rem;
      font-family: "webfont" !important;
      letter-spacing: 0.5px;
      margin-bottom: $sm-gap;
      @include color-transition();

      &:hover {
        color: #ce5777;
      }

      .icon-style {
        margin-right: $gap;
        display: inline-block;
      }
    }
  }
}
</style>

