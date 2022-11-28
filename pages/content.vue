<script setup>
const { data } = await useAsyncData('hello', () =>
  queryContent('/hello').findOne(),
)
</script>

<template>
  <div class="mt-8 text-red-900">
    <ContentRenderer :value="data" />
  </div>
</template>

<style>
pre {
    background-color: #eee;
    border-radius: 5px;
    padding: 10px;
}
</style>
