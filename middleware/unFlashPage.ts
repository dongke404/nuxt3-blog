//  // page前加载的中间件
// definePageMeta({
//   middleware: ['index'],
//   // or middleware: 'auth'
// })
export default defineNuxtRouteMiddleware((to, from) => {
  if (from.name === 'article-id')
    useState('isflash').value = false

  else
    useState('isflash').value = true
})
