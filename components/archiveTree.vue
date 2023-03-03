<script>
import { numberToChinese } from '@/utils/transforms/text'

export default defineComponent({
  name: 'ArchiveTree',
  props: {
    tree: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      numberToChinese,
    }
  },
})
</script>

<template>
  <div class="archive-tree">
    <ul class="month-list">
      <li v-for="mn in tree" :key="mn.month" class="month">
        <slot
          name="title"
          :title="`${numberToChinese(mn.year)}&nbsp; #${numberToChinese(mn.month)}月` + `(${mn.articles.length})` "
        />
        <ul class="article-list">
          <li v-for="(article, index) in mn.articles" :key="index" class="article">
            <slot
              name="article"
              :index="index"
              :article="article"
              :day="article.date.slice(8, 10)"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

  <style lang="scss" scoped>
.archive-tree {
      .month-list,
      .article-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  </style>

