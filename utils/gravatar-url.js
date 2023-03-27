import gravatar from 'gravatar'
import { APP_IMAGES } from '@/config'
export default function getGravatarUrlByEmail(email) {
  const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
  return emailRegex.test(email) ? gravatar.url(email) : APP_IMAGES.errorGravatar
}
