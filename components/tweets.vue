<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { Autoplay } from 'swiper'
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
const modules = [Autoplay]
const tweets = computed(() => props.data)
const pending = computed(() => props.loading)

const onSwiper = (swiper) => {
}
const next = () => {
  const swiper = document.getElementById('swiper1').swiper
  swiper.slideNext()
}
const prev = () => {
  const swiper = document.getElementById('swiper1').swiper
  swiper.slidePrev()
}
</script>

<template>
  <Placeholder :data="tweets.length" :loading="pending">
    <template #loading>
      <ClientOnly>
        <div key="skeleton" class="flex h-16 mt-3 w-full p-2 bg-main">
          <div class="w-32 mr-2">
            <skeleton-line />
          </div>
          <div class="flex-1">
            <skeleton-line />
          </div>
        </div>
      </ClientOnly>
    </template>
    <template #default>
      <div class="flex h-16 mt-3 w-full">
        <div class="flex-none bg-main bg-hover w-32 mr-2 rounded-tl-md rounded-bl-md ">
          <div class="flex flex-row items-center h-full ml-3">
            <div class="flex-none relative h-12 w-12 ">
              <img src="https://kedong.me/static/images/app/twitter_head.jpeg" class="h-12 w-12">
              <Icon name="skill-icons:twitter" class="text-blue-500 absolute bottom-0 right-0" size="1.3rem" />
            </div>
            <Icon class="flex-none text-gray-300 " name="fluent-mdl2:status-triangle" size="1rem" rotate="270deg" />
            <div class=" text-base h-11 w-11 bg-gray-300 dark:bg-slate-500  flex-none">
              <nuxt-link to="https://twitter.com/DongKirk11" target="_blank" rel="noopener noreferrer">
                <div class="  text-center font-semibold">
                  {{ tweets.length }}
                </div>
                <div class="text-xs text-center">
                  Tweets
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="bg-main bg-hover mr-2 ">
          <Swiper
            id="swiper1"
            :modules="modules"
            class="h-full swiper-container"
            direction="vertical"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
            }"
            :space-between="50"
            @swiper="onSwiper"
          >
            <SwiperSlide v-for="item in tweets" :key="item">
              <div class="h-full text-sm pl-3 pr-3 ">
                <div class=" text-sm pt-3 flex mb-1">
                  <div class="font-semibold truncate flex-grow-0 cursor-default" :title="item.text">
                    {{ item.text }}
                  </div>
                  <nuxt-link v-if="item.urls" :to="item.urls[0]" target="_blank" rel="external nofollow noopener">
                    <Icon v-if="item.urls" name="heroicons:photo-solid" class=" flex-none ml-1" size="1rem" />
                  </nuxt-link>
                </div>
                <div class="flex ">
                  <nuxt-link :to="`https://twitter.com/DongKirk11/status/${item.id}`" target="_blank" rel="noopener noreferrer">
                    <div class=" text-gray-400 hover:text-black cursor-pointer mr-6">
                      <Icon class="flex-none  mr-1" name="teenyicons:twitter-solid" size="0.8rem" />
                      <span class="text-xs mr-1">Tweet</span>
                      <Icon class="flex-none " name="ph:share" size="0.8rem" />
                    </div>
                  </nuxt-link>
                  <div class=" text-gray-400 mr-6">
                    <Icon class="flex-none  mr-1" name="mdi:comment-processing" size="0.8rem" />
                    <span class="text-xs mr-1">{{ item.public_metrics.reply_count }}</span>
                  </div>
                  <div class=" text-gray-400 mr-6">
                    <Icon class="flex-none  mr-1" name="icon-park-solid:like" size="0.8rem" />
                    <span class="text-xs mr-1">{{ item.public_metrics.like_count }}</span>
                  </div>
                  <div class=" text-gray-400 mr-6">
                    <Icon class="flex-none  mr-1" name="ic:baseline-access-time" size="0.9rem" />
                    <span class="text-xs mr-1">{{ $dayjs(item.created_at).fromNow() }}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div class="flex flex-col bg-hover w-9 rounded-tr-md flex-none">
          <div class="flex justify-center items-center mb-1 bg-main bg-hover rounded-tr-md text-center flex-1">
            <Icon name="material-symbols:arrow-forward-ios-rounded" size="1rem" rotate="270deg" @click="prev()" />
          </div>
          <div class="flex justify-center items-center mt-1 bg-main bg-hover rounded-br-md text-center flex-1">
            <Icon name="material-symbols:arrow-forward-ios-rounded" size="1rem" rotate="90deg" @click="next()" />
          </div>
        </div>
      </div>
    </template>
  </Placeholder>
</template>

<style lang="scss" scoped>
.swiper-container {
  width: 25.8rem;
}
</style>
