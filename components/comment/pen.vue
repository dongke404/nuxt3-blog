<script setup>
import { markdownToHTML } from '@/utils/markdown'
const props = defineProps(
  {
    isReply: {
      type: Boolean,
      default: false,
    },
    gravatar: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isPosting: {
      type: Boolean,
      default: false,
    },
    enabledPreviewMode: {
      type: Boolean,
      default: false,
    },
  },
)
const emit = defineEmits(['togglePreviewMode', 'submit'])
const input = ref(null)
const getInputText = () => {
  return input.value.innerText
}
const previewContent = computed(() => {
  return props.enabledPreviewMode ? markdownToHTML(getInputText(), { islozad: false }) : null
})

const setInputText = (content) => {
  input.value.innerText = content
}
const insertContent = ([start = '', end = '']) => {
  if (!start && !end)
    return false

  // 如果选中了内容，则把选中的内容替换，
  const currentText = getInputText()
  const selection = (window.getSelection || document.getSelection)()
  const selectedText = selection.toString()
  if (selectedText) {
    // TODO: 正则可能会匹配到重复的前面的字符，故不可靠
    // 替换所有选中文本 -> 然后定位到所替换文本的最后一个字符
    // 对于选中逻辑来说，既定的任何单个字符都理解为替换
    const isInsertReplace = !!start && !end
    const newSelectedText = isInsertReplace
      ? start
      : start + selectedText + end
    const newText = currentText.replace(selectedText, newSelectedText)
    // console.log("选中插入", newText);
    setInputText(newText)
  }
  else {
    // 否则追加新内容
    const newInsertText = start + end
    const selectedRange = (() => {
      try {
        return selection.getRangeAt(0)
      }
      catch (error) {}
    })()
    const startPoint = selectedRange && selectedRange.startOffset
    const endPoint = selectedRange && selectedRange.endOffset
    if (selectedRange && startPoint === endPoint && startPoint > 0) {
      // 若拿到了光标，则在光标位置插入新内容 -> 然后定位到新内容的最后一个字符
      const newTexts = [
        currentText.slice(0, startPoint),
        newInsertText,
        currentText.slice(startPoint),
      ]
      setInputText(newTexts.join(''))
    }
    else {
      // 否则末端追加内容，并定位到最后一个字符
      const newText = currentText + newInsertText
      setInputText(newText)
      input.value.scrollTop = input.value.scrollHeight
    }
  }
}
const insertEmoji = (emoji) => {
  insertContent([` ${emoji} `])
}
const insertImage = () => {
  insertContent([' ![', '](https://) '])
}
const insertLink = () => {
  insertContent([' [', '](https://) '])
}
const insertCode = () => {
  insertContent(['\n```javascript\n', '\n```\n'])
}
const handleTogglePreviewMode = () => {
  emit('togglePreviewMode')
}
const handleSubmit = (event) => {
  event.preventDefault()
  const p = Promise.resolve(getInputText())
  p.then((value) => {
    emit('submit', value, setInputText)
  })
}
onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <div class="pen" :class="[isReply ? 'ml-10' : '']">
    <div class="absolute -left-16 top-4">
      <div v-if="isReply" class=" w-12 h-12">
        <img alt="头像" :src="gravatar " draggable="false">
      </div>
    </div>
    <div class="markdown">
      <div
        ref="input"
        class="markdown-input bg-gray-300 dark:bg-slate-500 dark:opacity-60"
        :contenteditable="!props.disabled"
        placeholder=""
      />
      <transition name="module">
        <div v-if="props.enabledPreviewMode" class="markdown-preview bg-gray-100 dark:bg-gray-900" v-html="previewContent" />
      </transition>
    </div>
    <div class="pencilbox bg-gray-400 opacity-60 dark:bg-slate-600 dark:opacity-60">
      <div class="stationery" :class="{ disabled }">
        <a href class="emoji" title="emoji" @click.stop.prevent>
          <Icon name="ic:sharp-emoji-emotions" />
          <div class="emoji-box bg-slate-600 dark:bg-slate-800">
            <ul class="emoji-list">
              <li
                v-for="(emoji, index) in ['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱', '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊', '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻']"
                :key="index"
                class="item"
                @click="insertEmoji(emoji)"
                v-text="emoji"
              />
            </ul>
          </div>
        </a>
        <a href class="image" title="image" @click.stop.prevent="insertImage">
          <Icon name="mdi:image-area" />
        </a>
        <a href class="link" title="link" @click.stop.prevent="insertLink">
          <Icon name="ph:link-bold" />
        </a>
        <a href class="code" title="code" @click.stop.prevent="insertCode">
          <Icon name="ic:round-code" />
        </a>
        <a href class="preview" title="preview" @click.stop.prevent="handleTogglePreviewMode">
          <Icon name="icon-park-outline:preview-open" />
        </a>
      </div>
      <button
        type="submit"
        class="submit bg-slate-600 dark:bg-slate-700"
        :disabled="props.disabled"
        @click="handleSubmit"
      >
        <span v-if="props.isPosting">
          发布中
          <Icon name="eos-icons:three-dots-loading" />
        </span>
        <span v-else>
          发布
          <Icon name="basil:telegram-solid" class="mb-1" />
        </span>
      </button>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
  .pen {
    position: relative;

    .markdown {
      position: relative;

      > .markdown-input {
        min-height: 6em;
        max-height: 36em;
        overflow: auto;
        outline: none;
        padding: 0.5em;
        cursor: auto;
        font-size: $font-size-h6;
        line-height: 1.8em;
        @include background-transition();

        &:empty:before {
          content: attr(placeholder);
          color: $text-disabled;
        }

        &:focus {
          content: none;
        }
      }

      > .markdown-preview {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        margin: 0;
        padding: 0.5em;
      }
    }

    .pencilbox {
      $size: $font-size-base * 2;
      height: $size;
      line-height: $size;
      display: flex;
      justify-content: space-between;

      .stationery {
        &.disabled {
          opacity: 0.7;
          pointer-events: none;
        }

        > .emoji,
        > .image,
        > .link,
        > .code,
        > .preview {
          width: $size;
          height: $size;
          text-align: center;
          display: inline-block;
          @include background-transition();
        }

        > .emoji {
          .emoji-box {
            display: none;
            position: absolute;
            top: 0;
            bottom: 28px;
            left: 0;
            width: 100%;
            overflow-y: auto;
            > .emoji-list {
              list-style: none;
              padding: 0;
              margin: 0;
              font-size: $font-size-h3;
              display: flex;
              flex-wrap: wrap;

              > .item {
                padding: 0 0.4em;
                cursor: pointer;
                @include background-transition();
              }
            }
          }

          &:hover {
            > .emoji-box {
              display: block;
            }
          }
        }
      }

      > .submit {
        width: 8rem;
        height: $size;

        @include background-transition();

      }
    }
  }
  </style>

