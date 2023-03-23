<script lang="ts">
import { defineComponent, ref } from 'vue'
import { scrollToNextScreen, scrollToPageTop } from '@/utils/scroller'
import { VALUABLE_LINKS } from '@/config'

export default defineComponent({
  name: 'Toolbox',
  setup() {
    const animationFrameID = ref(0)
    const isTopButtonMouseOver = ref(false)
    const isBottomButtonMouseOver = ref(false)

    const slowMoveToAnyWhere = () => {
      const step = () => {
        let targetScrollY = window.scrollY
        const currentScrollY = document.body.scrollHeight - window.innerHeight
        if (isBottomButtonMouseOver.value)
          targetScrollY += 1

        if (isTopButtonMouseOver.value)
          targetScrollY -= 1

        if (targetScrollY < 0)
          targetScrollY = 0
        else if (targetScrollY >= currentScrollY)
          targetScrollY = currentScrollY

        const canScrollTo = targetScrollY > 0 && targetScrollY < currentScrollY
        if (!canScrollTo)
          return false

        window.scrollTo(0, targetScrollY)
        if (isBottomButtonMouseOver.value || isTopButtonMouseOver.value) {
          animationFrameID.value = window.requestAnimationFrame(step)
        }
        else {
          window.cancelAnimationFrame(animationFrameID.value)
          return false
        }
      }
      animationFrameID.value = window.requestAnimationFrame(step)
    }

    return {
      VALUABLE_LINKS,
      scrollToPageTop,
      scrollToNextScreen,

      setTopButtonState(state: boolean, isStartSlow = false) {
        isTopButtonMouseOver.value = state
        window.cancelAnimationFrame(animationFrameID.value)
        isStartSlow && slowMoveToAnyWhere()
      },
      setBottomButtonState(state: boolean, isStartSlow = false) {
        isBottomButtonMouseOver.value = state
        window.cancelAnimationFrame(animationFrameID.value)
        isStartSlow && slowMoveToAnyWhere()
      },
    }
  },
})
</script>

<template>
  <div id="toolbox">
    <div class="container ">
      <div class="tools flex flex-col bg-main w-9 justify-center items-center">
        <nuxt-link
          :to="VALUABLE_LINKS.RSS"
          target="_blank"
        >
          <div class="rss h-9 w-9 flex justify-center items-center">
            <Icon name="material-symbols:rss-feed" />
          </div>
        </nuxt-link>
        <button
          class="to-page-top h-9 w-full flex justify-center items-center"
          @click="scrollToPageTop"
          @mouseover="setTopButtonState(true, true)"
          @mouseleave="setTopButtonState(false)"
        >
          <Icon name="material-symbols:arrow-forward-ios-rounded" size="1rem" rotate="270deg" />
        </button>
        <button
          class="to-page-bottom h-9 w-full flex justify-center items-center"
          @click="scrollToNextScreen"
          @mouseover="setBottomButtonState(true, true)"
          @mouseleave="setBottomButtonState(false)"
        >
          <Icon name="material-symbols:arrow-forward-ios-rounded" size="1rem" rotate="90deg" />
        </button>
      </div>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
    #toolbox {
      position: fixed;
      z-index: $z-index-toolbox;
      width: 100%;
      bottom: 21rem;

      .container {
        position: relative;

        .tools {
          position: absolute;
          right: -8rem;
          overflow: hidden;

          &:first-child {
            border-top-left-radius: $xs-radius;
            border-top-right-radius: $xs-radius;
          }
          &:last-child {
            border-bottom-left-radius: $xs-radius;
            border-bottom-right-radius: $xs-radius;
          }

          .rss,
          .to-page-top,
          .to-page-bottom,

          .rss {
            color: $rss-primary;
            &:hover {
              background-color: $rss-primary;
              color: #fff
            }
          }
        }
      }
    }
  </style>

