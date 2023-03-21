<script setup>
import { useClipboard } from '@vueuse/core'
import { SITE_URL, meta } from '@/config'
import { renderTextToQRCodeDataURL } from '@/utils/qrcode'
const route = useRoute()

const fullPath = computed(() => route.fullPath)
const page_url = computed(() => SITE_URL + fullPath.value)
const { copy } = useClipboard({ source: page_url })
const title = () => {
  try {
    if (document)
      return `${meta.title} ${document.title}`
  }
  catch (error) {
    return ''
  }
}

const shareWindow = (social, url) => {
  let targetUrl
  if (social.name === '微信') {
    targetUrl = url(page_url.value)
    return
  }
  else { targetUrl = url() }

  /*
       * screen.availWidth 获得屏幕宽度
       * screen.availHeight 获得屏幕高度
       * 居中的算法是：
       * 左右居中： (屏幕宽度 - 窗口宽度)/2
       * 上下居中： (屏幕高度 - 窗口高度)/2
       *
       */
  // 给打开的窗口命名
  const windowName = `分享 ${meta.title}`
  // 窗口宽度,需要设置
  const awidth = (screen.availWidth / 6) * 2
  // 窗口高度,需要设置
  const aheight = (screen.availHeight / 5) * 2
  // 窗口顶部位置,一般不需要改
  const atop = (screen.availHeight - aheight) / 2
  // 窗口放中央,一般不需要改
  const aleft = (screen.availWidth - awidth) / 2
  // 新窗口的参数
  const baseParam
        = 'scrollbars=0,status=0,menubar=0,resizable=2,location=0'
  // 新窗口的左部位置，顶部位置，宽度，高度
  const params = `top=${atop},left=${aleft},width=${awidth},height=${aheight},${baseParam}`
  // 打开新窗口
  const _window = window.open(targetUrl, windowName, params)
  // 新窗口获得焦点
  _window.focus()
}
const socials = [
  {
    name: '微信',
    class: 'wechat',
    Icon: 'ic:baseline-wechat',
    url: async (params) => {
      const dataURL = await renderTextToQRCodeDataURL(params)
      window.utils.openImgPopup(dataURL)
    },
  },
  {
    name: '微博',
    class: 'weibo',
    Icon: 'ri:weibo-fill',
    url: () =>
            `https://service.weibo.com/share/share.php?url=${page_url.value
            }&title=${title()}&source=${page_url.value}&sourceUrl=${page_url.value
            }`,
  },
  {
    name: 'twitter',
    class: 'twitter',
    Icon: 'simple-icons:twitter',
    url: () =>
            `https://twitter.com/share?text=${title()}&url=${page_url.value}`,
  },
  {
    name: 'QQ空间',
    class: 'qzone',
    Icon: 'simple-icons:qzone',
    url: () =>
            `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${page_url.value
            }&title=${title()}&site=${page_url.value
            }`,
  },
  {
    name: 'facebook',
    class: 'facebook',
    Icon: 'simple-icons:facebook',
    url: () => `https://www.facebook.com/sharer/sharer.php?u=${page_url.value}`,
  },
  {
    name: 'linkedin',
    class: 'linkedin',
    Icon: 'simple-icons:linkedin',
    url: () =>
            `https://www.linkedin.com/shareArticle?title=${title()}&mini=true&url=${page_url.value
            }`,
  },
]
</script>

<template>
  <div class="share-box rounded flex justify-around p-2  text-gray-500 ">
    <a
      v-for="(social, index) in socials" :key="index" rel="nofollow noopener" class="share-ejector flex-1 mr-2 bg-gray-200 dark:bg-gray-700 "
      :title="`Share to: ${social.name}`" :class="social.class || social.name"
      @click.prevent="shareWindow(social, social.url)"
    >
      <Icon :name="social.Icon" class="p-1 text-xl dark:text-gray-100" />
    </a>
    <span title="复制文章链接" class="share-ejector link  flex-1 bg-gray-200 dark:bg-gray-700 " @click="copy()">
      <Icon name="ph:link-bold" class="p-1 text-xl dark:text-gray-100" />
    </span>
  </div>
</template>

<style lang="scss">
.share-box {
    @include visibility-transition();

    >.share-ejector {
        cursor: pointer;
        display: inline-block;
        text-align: center;
        @include background-transition();

        &.wechat:hover {
            background-color: rgb(123, 179, 46);
        }

        &.weibo:hover {
            background-color: rgb(230, 22, 45);
        }

        &.qzone:hover {
            background-color: rgb(43, 130, 217);
        }

        &.douban:hover {
            background-color: rgb(0, 119, 17);
        }

        &.renren:hover {
            background-color: rgb(0, 94, 172);
        }

        &.twitter:hover {
            background-color: rgb(85, 172, 238);
        }

        &.facebook:hover {
            background-color: rgb(59, 89, 152);
        }

        &.linkedin:hover {
            background-color: rgb(0, 123, 181);
        }

        &.link:hover {
            background-color: #e67a1c;
        }

    }
}
</style>
