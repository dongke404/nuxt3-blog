<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Empty',
  props: {
    placeholder: String,
  },
  setup() {
    return {
      LanguageKey: 'No data',
    }
  },
})
</script>

<template>
  <div class="empty">
    <slot>
      <template v-if="placeholder">
        {{ placeholder }}
      </template>
      <template v-else>
        {{ LanguageKey }}
      </template>
    </slot>
  </div>
</template>

  <style lang="scss" scoped>
    @import 'assets/styles/variables.scss';
    @import 'assets/styles/mixins.scss';

    .empty {
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;
      min-height: 5em;
      text-align: center;
      justify-content: center;
      align-items: center;
      letter-spacing: 0.1em;
    }
  </style>

