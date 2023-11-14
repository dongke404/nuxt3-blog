<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const modules = [Pagination, Autoplay]
const onSwiper = (swiper) => {
  // console.log(swiper);
}
const onSlideChange = () => {
}
const articleList = computed(() => props.data.slice(0, 10))
const loading = computed(() => props.loading)
</script>

<template>
  <Placeholder :data="articleList.length" :loading="loading" :transition="false">
    <template #loading>
      <div key="skeleton" class="article-skeleton h-48 bg-main rounded-md">
        <div class="title">
          <skeleton-line />
        </div>
        <div class="content">
          <div class="first">
            <skeleton-line />
          </div>
          <div v-for="(line, index) in 3" :key="index" class="line">
            <skeleton-line class="line-item" />
          </div>
        </div>
      </div>
    </template>
    <div>
      <Swiper
        class="h-48 rounded-md overflow-hidden"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide v-for="item in articleList" :key="item">
          <NuxtLink :to="`/article/${item.article_id}`">
            <div class="h-48 rounded-md overflow-hidden">
              <img :src="item.src" :alt="item.src" class=" h-full w-full rounded-md">
            </div>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
    </div>
  </Placeholder>
</template>

<style lang="scss" scoped>
.article-skeleton {
  position: relative;
  width: 100%;
  padding: 2rem;

  .content {
    width: 50%;
    margin-top: 1rem;
    margin-left: 1rem;

    .first {
      width: 8rem;
      height: $gap * 2;
      margin-bottom: $gap;
    }

    .line {
      .line-item {
        width: 14rem;
        height: $lg-gap;
        margin-bottom: $gap;
      }
    }
  }

  .title {
    position: absolute;
    top: 2rem;
    right: 2rem;
    height: 2.6rem;
    width: 18rem;
  }
}
</style>

