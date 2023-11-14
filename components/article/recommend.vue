<script setup>
import { SITE_URL } from '@/config'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="recommend-box rounded flex mb-3 w-full flex-wrap justify-between">
    <div v-for="(item, index) in props.data" :key="index" class="recommend-item bg-main bg-hover rounded overflow-hidden h-[8.5rem]  w-[32.5%]  mb-2">
      <NuxtLink :to="`/article/${item.article_id}`">
        <img fit="fill" class="w-full h-[5.5rem]" :src="SITE_URL + item.imgUrl">
      </NuxtLink>

      <div>
        <div class=" text-[0.8rem] font-bold pt-1 pl-2 pb-[0.3rem] truncate">
          {{ item.title }}
        </div>
        <div class="text-xs text-gray-500 pl-2 truncate">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
