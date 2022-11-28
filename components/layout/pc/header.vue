<script setup name="header">

</script>

<template>
  <header id="header" class="header">
    <div class="header-container container">
      <div class="header-header">
        <div class="header-logo">
          <h1>Kirk Dong</h1>
        </div>
        <span class="header-slogan">{{ 1111 }}</span>
        <nuxt-link to="/" class="header-link" :title="1111" />
      </div>
      <select v-model="locale">
        <option value="en">
          en
        </option>
        <option value="zh">
          zh
        </option>
      </select>
      <p>{{ $t('nav.home') }}</p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header-height;
  z-index: $z-index-header;
  background-color: $module-bg;
  user-select: none;
  // 过段时间再打开吧，闪屏太严重了
  // @include backdrop-blur();

  .header-container {
    height: 100%;
    display: flex;
    justify-content: space-between;

    .header-header {
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;
      padding-left: $sm-gap;
      width: 29em;
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
        color: #ad6598;
        width: 11rem;
        margin-right: $gap * 4;
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
        color: $primary;
        font-family: "webfont-normal", DINRegular;
      }

      .header-link {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }

    .header-player {
      position: absolute;
      display: flex;
      top: 0px;
      right: 40rem;
      opacity: 0.3;

      &:hover {
        opacity: 1;
      }

      audio {
        opacity: 0.2;
      }
    }

    .panel {
      padding: 10px;
      margin-bottom: $xs-gap;
      width: 15rem;
      overflow: hidden;

      .button {
        display: flex;

        > button {
          margin-right: 10px;

          &:hover {
            .iconfont {
              color: $link-hover-color;
            }
          }
        }
      }

      .song {
        white-space: nowrap;
        opacity: 0.5;
        display: inline-block;
        animation: 8s wordsLoop linear infinite normal;
      }

      @keyframes wordsLoop {
        0% {
          transform: translateX(0px);
          -webkit-transform: translateX(0px);
        }

        100% {
          transform: translateX(-100%);
          -webkit-transform: translateX(-100%);
        }
      }
    }

    .iconfont {
      color: $text-dividers;
      @include color-transition();
    }
  }
}
</style>
