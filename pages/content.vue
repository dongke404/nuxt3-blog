<script setup>
const { data } = await useAsyncData('hello', () =>
  queryContent('/hello').findOne(),
)
</script>

<template>
  <div>
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
