<script>
import { computed, defineComponent } from 'vue'
import { markdownToHTML } from '@/utils/markdown'
import * as ANCHORS from '@/constants/anchor'
import { useArticleStore } from '@/store/article'

export default defineComponent({
  name: 'Markdown',
  props: {
    markdown: String,
    html: {
      type: String,
      default: '',
    },
    relink: {
      type: Boolean,
      default: false,
    },
    sanitize: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    islozad: { // 是否使用 lozad 懒加载图片
      type: Boolean,
      default: false,
    },
    isArticle: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    // 元素默认为 '.lozad'
    const { element } = useLozad()
    const options = {
      sanitize: props.sanitize,
      relink: props.relink,
      islozad: props.islozad,
    }
    if (props.isArticle) {
      const headings = []
      let wordNum = 0
      const headingIDRenderer = (html, level, raw) => {
        const id = ANCHORS.getArticleContentHeadingElementID(
          level,
          raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, '-'),
        )
        headings.push({ level, id, text: raw })
        return id
      }
      const articleStore = useArticleStore()
      const textRenderer = (txt) => {
        wordNum += txt.length
        articleStore.wordNum = wordNum
        return txt
      }
      options.textRenderer = textRenderer
      options.headingIDRenderer = headingIDRenderer
      articleStore.headings = headings
      articleStore.wordNum = wordNum
    }
    const markdownHTML = computed(() => {
      return markdownToHTML(props.html, options)
    })
    return {
      element,
      markdownHTML,
    }
  },
})
</script>

<template>
  <section
    ref="element"
    class="highlight-white dark:highlight-dark"
    :class="[
      plain ? 'global-markdown-plain ' : 'global-markdown-html dark:global-markdown-html-dark',
    ]"
    v-html="markdownHTML"
  />
</template>

<style lang="scss">
.global-markdown-plain {
  p {
    margin: 0;
    max-width: 100%;
    @include text-overflow();
  }

  a {
    @include text-underline();
  }
}

.global-markdown-html {

  /* for google adsense */
  .google-auto-placed {
    margin-bottom: $sm-gap;
  }

  p {
    text-indent: 2em;
    line-height: 2.2em;
  }

  a {
    margin: 0;
    font-weight: bold;
    @include text-underline();

    &.image-link {
      margin: 0;
      border: 0;
    }
  }

  u {
    text-underline-offset: 0.5em;
    text-decoration-thickness: from-font;
    text-decoration-style: dashed;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-indent: 0;
    margin: 1em 0;
  }

  blockquote {
    margin: 1em 0;
    text-indent: 0em;
    background-color: $module-bg-darker-1;
    border-left: 0.5em solid $module-bg-darker-2;
    padding: 0.5em 1em;
    padding-left: 1.5em;
    border-radius: $xs-radius;

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 3em;
  }
  ol {
    list-style-type: decimal;
    padding-left: 3em;
  }

  ul:not(.code-lines),
  ol {
    >li {
      line-height: 2em;
      padding: 0.5em 0.8em;
      border-radius: $xs-radius;

      &:hover {
        background-color: $module-bg-darker-1;
      }

      >p {
        text-indent: 0;
      }

      >ol {
        list-style: lower-alpha;
      }

      >ul,
      >ol {
        list-style: circle;
        padding-left: 2em;
        margin-top: $sm-gap;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &:last-child {

        >ul,
        >ol {
          margin-bottom: -$sm-gap;
        }
      }
    }
  }

  table {
    border-radius: $xs-radius;
    overflow: hidden;
  }

  iframe {
    width: 100%;
    min-height: 320px;
    margin-bottom: 1em;
    padding: $sm-gap;
    border-radius: $xs-radius;
    border: 1px solid $module-bg-darker-1;
  }

  .figure-wrapper {
    width: 100%;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
    overflow: hidden;
    text-align: center;

    >figure {
      display: block;
    }
  }

  figure.image {
    position: relative;
    border-radius: $xs-radius;
    border: 1px solid $module-bg-darker-1;
    text-indent: 0;
    text-align: center;

    .placeholder {
      visibility: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }

    img {
      display: block;
      max-width: 100%;
      padding: $sm-gap;
      color: transparent;
      cursor: pointer;
      transition: opacity $transition-time-fast;

      &:hover {
        opacity: 0.9;
      }
    }

    figcaption {
      display: block;
      border-top: 1px dashed $module-bg-darker-1;
      text-align: center;
      line-height: $gap * 3;
      font-size: $font-size-small;
      font-weight: bold;
      /* font-style: italic; */
      user-select: none;
      pointer-events: none;
    }

    &[data-status='loaded'] {
      width: auto;

      img {
        min-width: auto;
        min-height: auto;
      }
    }

    &[data-status='loading'],
    &[data-status='error'] {
      width: 100%;

      /* image size */
      img {
        min-height: 6rem;
      }

      /* placeholder size */
      &.caption {
        .placeholder {
          padding-bottom: $gap * 3;
        }
      }
    }

    &[data-status='error'] {

      /* show custom failed icon */
      .placeholder.error {
        visibility: visible;
        font-size: $font-size-h1 * 1.8;
        color: $text-divider;
      }

      /* hide original image failed icon when error */
      img {
        width: 100%;
        opacity: 0;
      }
    }

    /* loading animation */
    &[data-status='loading'] {
      .placeholder.loading {
        visibility: visible;

        @keyframes loading {
          0% {
            opacity: 1;
          }

          50% {
            opacity: 0.5;
          }

          100% {
            opacity: 1;
          }
        }

        div {
          width: 2rem;
          height: 1.2rem;
          margin: 0 $sm-gap;
          border-radius: $mini-radius;
          animation: loading 1s cubic-bezier(0.5, 0, 0.5, 1) infinite;

          &:nth-child(1) {
            background: $module-bg-darker-2;
            animation-delay: -0.6s;
          }

          &:nth-child(2) {
            background: $module-bg-darker-3;
            animation-delay: -0.4s;
          }

          &:nth-child(3) {
            background: $module-bg-darker-2;
            animation-delay: -0.2s;
          }

          &:nth-child(4) {
            background: $module-bg-darker-3;
            animation-delay: -1s;
          }
        }
      }
    }
  }

  .checkbox {
    margin: 0 $xs-gap;

    &.checked {
      color: $theme-black;
    }
  }

  code {
    vertical-align: middle;
    padding: 0.2em 0.4em 0.14em;
    margin: 0;
    border-radius: $sm-radius;
    font-size: 95%;
  }

  pre {
    $code-header-height: 2.8rem;
    $code-number-width: 3rem;
    $code-row-line-height: 1.8em;
    $code-padding: 0.8rem;
    $code-font-size: $font-size-base;
    position: relative;
    display: flex;
    margin-bottom: 1em;
    padding-top: $code-header-height;
    padding-left: $code-number-width;
    border-radius: $xs-radius;
    overflow: hidden;
    font-size: $code-font-size;

    &::before {
      content: attr(data-lang) ' CODE';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: $code-header-height;
      line-height: $code-header-height;
      text-transform: uppercase;
      text-align: center;
      z-index: $z-index-normal + 2;
    }

    .code-lines {
      z-index: $z-index-normal + 1;
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      margin: 0;
      padding: 0;
      padding-top: $code-header-height + $code-padding;
      width: $code-number-width;
      height: 100%;
      text-align: center;
      user-select: none;

      .code-line-number {
        padding: 0;
        list-style-type: none;
        height: $code-row-line-height;
        line-height: $code-row-line-height;
      }
    }

    code {
      margin: 0;
      padding: $code-padding 1em !important;
      float: left;
      width: 100%;
      height: 100%;
      display: block;
      line-height: $code-row-line-height;
      font-size: $font-size-base;
      cursor: text;
    }
  }
}

.global-markdown-html {
  code {
    border: 1px solid $module-bg-darker-2;
    background-color: $module-bg-darker-1;
    color: $link-color;
  }

  pre {
    background-color: #f3f3f3;

    &::before {
      background-color: $module-bg-darker-2;
    }

    .code-lines {
      background-color: $module-bg-darker-1;
    }

    code {
      color: #444;
      border-radius: 0;
      border-width: 0 1px 1px 0;
      border-color: $module-bg-darker-1;
      background-color: transparent !important;
    }
  }
}
</style>

