<script setup>
import { uaParser } from '@/utils/ua-handler'
const props = defineProps({
  ua: {
    type: String,
    default: '',
  },
})

const { isMobile } = useDevice()

// https://github.com/faisalman/ua-parser-js#methods
const osIconsNameMap = {
  'Mac OS': 'wpf:mac-os',
  'Windows': 'uil:windows',
  'Android': 'ri:android-line',
  'Ubuntu': 'cib:ubuntu',
  'Linux': 'fa6-brands:linux',
  'iOS': 'wpf:iphone',
}

const browersIconsNameMap = {
  'Chrome': 'bi:browser-chrome',
  'Chromium': 'bi:browser-chrome',
  'WeChat': 'ic:baseline-wechat',
  'Safari': 'teenyicons:safari-solid',
  'Mobile Safari': 'teenyicons:safari-solid',
  'Firefox': 'ri:firefox-fill',
  'IE': 'ri:edge-fill',
  'QQBrowser': 'arcticons:qq-2',
  'Opera': 'raphael:opera',
  'Edge': 'ri:edge-fill',
}

const uaResult = computed(() => uaParser(props.ua))

const osIconName = computed(() => {
  const osName = props.ua && uaResult.value.result.os.name
  return osName && osIconsNameMap[osName]
})

const browserIconName = computed(() => {
  const browserName = props.ua && uaResult.value.result.browser.name
  return browserName && browersIconsNameMap[browserName]
})
</script>

<template>
  <span>
    <span class="os">
      <Icon
        :name="osIconName || ''"
        class="mr-1 pb-1"
      />
      <span v-if="!isMobile">{{ uaResult.result.os.name }}</span>
      <span v-if="!isMobile">{{ uaResult.result.os.version }}</span>
    </span>
    <span class="browser">
      <Icon
        :name="browserIconName || ''"
        class="mr-1 pb-1"
      />
      <span v-if="!isMobile">{{ uaResult.result.browser.name }}</span>
      <span v-if="!isMobile">{{ uaResult.result.browser.major }}</span>
    </span>
  </span>
</template>

