<script lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'SkeletonBase',
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Number,
      default: 2,
    },
  },
  setup(props) {
    const style = computed<CSSProperties>(() => ({
      borderRadius: props.circle ? '100%' : `${props.radius}px`,
      ...(props.width && { width: `${props.width}px` }),
      ...(props.height && { height: `${props.height}px` }),
    }))

    return {
      style,
    }
  },
})
</script>

<template>
  <div class="skeleton base dark:skeleton-dark" :style="style" />
</template>

<style lang="scss"  scoped>
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 350px 50px;
  }
}

.skeleton.base {
  width: 100%;
  height: 100%;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background-color: rgba(197, 197, 197, 1);
  background-image: linear-gradient(to right,
      rgba(#ffffff, 0.6) 8%,
      rgba(197, 197, 197, 1) 18%,
      rgba(#ffffff, 0.6) 33%);
  background-repeat: repeat;
  background-size: 800px 104px;
}
</style>
