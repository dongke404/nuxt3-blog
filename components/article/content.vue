<script setup>
// import Markdown from '@/components/common/markdown.vue'
const props = defineProps({
  data: {
    type: String,
    required: true,
  },
},
)
</script>

<template>
  <div>
    <CommonMarkdown :html="props.data" />
  </div>
</template>

