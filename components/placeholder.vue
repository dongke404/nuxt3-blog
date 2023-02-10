<script setup>
import Empty from './empty.vue'
import Spin from './spin.vue'
const props = defineProps({
  data: {
    type: [Array, Object, Boolean, Number],
    default: undefined,
  },
  transition: {
    type: Boolean,
    default: true,
  },
  transitionName: {
    type: String,
    default: 'module',
  },
  placeholder: String,
  loading: Boolean,
})
const isEmptyData = computed(() => props.data !== undefined && ((Array.isArray(props.data) && !props.data.length) || !props.data))
</script>

<template>
  <div v-if="loading">
    <slot name="loading" />
  </div>
  <Empty v-else-if="!loading && isEmptyData" :placeholder="props.placeholder" class="empty">
    <slot name="empty" />
  </Empty>
  <div v-else>
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
.empty {
  height: $gap * 10;
  font-size: $font-size-h4;
  font-weight: bold;
}
</style>
