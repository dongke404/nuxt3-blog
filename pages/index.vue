<script setup>
import http from '/utils/http'
const reqstatus = ref('1')
const pending = ref(true)
// useLazyrequest('/testport', 'get', (data) => {
//   reqstatus.value = data
//   pending.value = false
// }, { page: 1 })

const testdata = await http.get('/testport', {
  page: 1,
  size: 10,
})
reqstatus.value = testdata.data
pending.value = false

onMounted(() => {
})
</script>

<template>
  <div v-if="pending">
    Loading ...
  </div>
  <div v-else class="mt-8 text-red-900">
    开始使用nuxt
    <!-- <ContentDoc /> -->
    <h1>首页</h1>
    <div>Page visits: {{ reqstatus }}</div>
  </div>
</template>

<style>
pre {
  background-color: #eee;
  border-radius: 5px;
  padding: 10px;
}
</style>
