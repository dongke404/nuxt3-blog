<script setup>
import { APP_ICON, APP_IMAGES, VALUABLE_LINKS } from '@/config'
definePageMeta({
  layout: 'custom',
})
const showWechat = () => {
  window.utils.openImgPopup(APP_IMAGES.wechat)
}
</script>

<template>
  <div class="about-page ">
    <div class="page-banner">
      <div class="background z-10">
        <video class="video" loop muted autoplay :controls="false">
          <source :src="APP_IMAGES.backgroundVideo" type="video/mp4">
        </video>
      </div>
      <div class="content bg-main">
        <NuxtImg class="avatar z-20" :src="APP_IMAGES.myAvatar" />
        <h1 class="name">
          {{ 'Kirk Dong' || '-' }}
        </h1>
        <p class="slogan">
          {{ '碍事大师多' || '-' }}
        </p>
        <p class="biography">
          {{ 'asdasddad' }}
        </p>
        <div class="socials">
          <span class="normal">
            <NuxtLink class="item github" :to="VALUABLE_LINKS.GITHUB" target="_black">
              <Icon :name="APP_ICON.github" />
              <span class="text">GitHub</span>
            </NuxtLink>
            <NuxtLink class="item twitter" :to="VALUABLE_LINKS.TWITTER" target="_black">
              <Icon :name="APP_ICON.twitter" />
              <span class="text">Twitter</span>
            </NuxtLink>
            <NuxtLink class="item instagram" :to="VALUABLE_LINKS.INSTAGRAM" target="_black">
              <Icon :name="APP_ICON.instagram" />
              <span class="text">Instagram</span>
            </NuxtLink>
            <NuxtLink class="item youtube" :to="VALUABLE_LINKS.YOUTUBE_CHANNEL" target="_black">
              <Icon :name="APP_ICON.youtube" />
              <span class="text">YouTube</span>
            </NuxtLink>
          </span>
          <client-only>
            <span class="mini " @click="showWechat">
              <button class="item wechat">
                <Icon :name="APP_ICON.wechat" />
              </button>
            </span>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .about-page {
    width: 100%;
    overflow: hidden;

    .page-banner {
      $banner-height: 15rem;

      .background {
        display: block;
        position: absolute;
        width: 100%;
        height: $banner-height;
        top: $header-height;
        left: 0;
        overflow: hidden;
        &::before {
          content: '';
          position: absolute;
          display: block;
          height: 0.75rem;
          bottom: -0.375rem;
          left: 0;
          right: 0;
          background-image: radial-gradient(circle, transparent 70%, rgba(255, 255, 255, .9) 70%);
          background-size: 0.7em 1em;
          background-position: 0 -0.5em;
        }

        .video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 0% 30%;
          pointer-events: none;
        }
      }
      .content {
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        width: 100%;
        @include radius-box($lg-radius);
        background-image: url('https://kedong.me/static/images/app/background-about.png'),
          linear-gradient(white 40%, #00000000 100%);
        background-size: contain;
        background-repeat: repeat-x;
        background-blend-mode: lighten;

        .avatar {
          $size: 6rem;
          width: $size;
          height: $size;
          box-sizing: content-box;
          margin-top: $banner-height - 3rem;
          border: 6px solid rgba(255, 255, 255, .6);
          border-radius: 100%;
          overflow: hidden;
          background-color: rgba(255, 255, 255, .6);
          transition: transform $transition-time-slow;
          &:hover {
            transform: rotate(360deg);
          }
        }

        .name,
        .slogan {
          text-align: center;
        }

        .name {
          margin-top: $sm-gap;
          margin-bottom: $gap;
        }

        .biography {
          margin-bottom: $gap * 2;
          font-size: $font-size-h3;
        }

        .socials {
          $button-size: 2.25rem;
          display: flex;
          justify-content: center;
          height: $button-size;
          margin-bottom: $gap * 2;

          .normal {
            display: inline-flex;
            align-items: center;
            margin-right: $gap;

            .item {
              padding: 0 $gap;
              margin-right: $gap;
              height: 100%;
              display: inline-flex;
              align-items: center;
              border-radius: $sm-radius;
              color: $white;
              transition: all $transition-time-fast;

              .iconfont {
                font-size: $font-size-h4;
                margin-right: $sm-gap;
              }

              .text {
                font-weight: bold;
              }

              &.github {
                background-color: $github-primary;
                &:hover {
                  background-color: $github-primary-hover;
                }
              }
              &.twitter {
                background-color: $twitter-primary;
                &:hover {
                  background-color: $twitter-primary-hover;
                }
              }
              &.youtube {
                margin: 0;
                background-color: $youtube-primary;
                &:hover {
                  background-color: mix($black, $youtube-primary, 8%);
                }
              }
              &.instagram {
                opacity: 0.8;
                background: $instagram-primary;
                background: $instagram-gradient;
                &:hover {
                  opacity: 1;
                }
              }
            }
          }

          > .mini {
            display: flex;

            > .item {
              display: inline-block;
              width: $button-size;
              height: $button-size;
              line-height: $button-size;
              margin-right: $gap;
              text-align: center;
              border-radius: $sm-radius;
              color: $white;
              opacity: 0.8;
              transition: all $transition-time-fast;

              &:hover {
                opacity: 1;
              }

              .iconfont {
                font-size: $font-size-h4;
              }

              &.wechat {
                background-color: $wechat-primary;
              }
              &.telegram {
                background-color: $telegram-primary;
              }
              &.douban {
                background-color: $douban-primary;
              }
              &.stackoverflow {
                background-color: $stackoverflow-primary;
              }
              &.algorithm {
                background-color: $leetcode-primary;
              }
              &.quora {
                background-color: $quora-primary;
              }
              &.linkedin {
                background-color: $linkedin-primary;
              }
            }
          }
        }
      }
    }
  }
</style>
