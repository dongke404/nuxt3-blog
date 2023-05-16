// 本地开发Url
// export const API_BASEURL = 'http://127.0.0.1:5000/api'

export const API_BASEURL = import.meta.env.DEV ? 'https://kedong.me/api_test' : 'https://kedong.me/api'
// 使用 cookie
export const CREDENTIALS = 'include'
// 网址
export const SITE_URL = 'https://kedong.me'
// 单页显示评论条数
export const COMMENT_NUM = 20

export const meta = {
  title: 'Kirk Dong 的博客',
  keywords: 'Kirk Dong,vue,react,董柯,前端技术开发,javascript技术,blog,kedong.me',
  description: 'Kirk Dong 的博客,分析技术与生活',
  url: 'kedong.me',
  author: 'Kirk Dong',
  email: 'dongkirk1992@gmail.com',
  slogan: '热爱生活，无拘无束',
}

export const VALUABLE_LINKS = Object.freeze({
  RSS: '/rss.xml',
  SITE_MAP: '/sitemap.xml',
  MUSIC163: 'https://music.163.com/#/playlist?id=4992612670',
  MUSIC163Detail: 'https://music.kedong.me/playlist/detail?id=4992612670',
  GITHUB: 'https://github.com/dongke404',
  TWITTER: 'https://twitter.com/DongKirk11',
  INSTAGRAM: 'https://www.instagram.com/dongkirk1992/?hl=en',
  YOUTUBE_CHANNEL: 'https://www.youtube.com/channel/UCs_FcUK3n1dZcfVu7NvO7dw',
})

export const APP_IMAGES = Object.freeze({
  defaultgravatar: 'https://kedong.me/static/images/app/defaultgravatar.png',
  errorGravatar: 'https://kedong.me/static/images/app/errorAvatar.jpg',
  backgroundVideo: 'https://kedong.me/static/video/backgroundVideo.mp4',
  backgroundImg: 'https://kedong.me/static/images/app/background.png',
  backgroundImgDark: 'https://kedong.me/static/images/app/backgroundDark.png',
  myAvatar: 'https://kedong.me/static/images/app/mobileAvatar.png',
  backgroundImgAbout: 'https://kedong.me/static/images/app/background-about.png',
  wechat: 'https://kedong.me/static/images/app/addwechat.jpg',
  archiveBanner: 'https://kedong.me/static/images/app/archive.jpg',
})

export const APP_ICON = Object.freeze({
  home: 'mdi:home',
  code: 'mdi:code-tags',
  think1: 'mdi:head-lightbulb',
  think: 'mdi:thought-bubble',
  life: 'uil:diary',
  calendar: 'mdi:calendar',
  discuss: 'mdi:comment-text-multiple',
  person: 'mdi:account',
  sun: 'line-md:moon-alt-to-sunny-outline-loop-transition',
  moon: 'line-md:moon',
  github: 'mdi:github',
  twitter: 'mdi:twitter',
  instagram: 'mdi:instagram',
  youtube: 'mdi:youtube',
  wechat: 'mdi:wechat',
  rss: 'mdi:rss',
  sitemap: 'mdi:sitemap',
  email: 'mdi:email',
  menu: 'mdi:menu',
  search: 'mdi:magnify',
  clock: 'mdi:clock',
  eye: 'mdi:eye',
  heart: 'mdi:heart',
  category: 'tabler:category',
  cancel: 'mdi:close',

})

