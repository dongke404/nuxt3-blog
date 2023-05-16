import gravatar from 'gravatar'
import { APP_IMAGES } from '@/config'
export default function getGravatarUrlByEmail(email) {
  const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  return emailRegex.test(email) ? gravatar.url(email) : APP_IMAGES.errorGravatar
}

// //www.gravatar.com/avatar/a591f7ef1d386126135d752fd69f50e6 转换成 //gravatar.kedong.me/avatar/a591f7ef1d386126135d752fd69f50e6
export function gravatarProxy(url) {
  return url.replace(/\/\/www.gravatar.com\/avatar\//, 'https://gravatar.kedong.me/avatar/')
}
