<script setup>
import { computed, ref } from 'vue'
import getGravatarUrlByEmail from '@/utils/gravatar-url'
import { markdownToHTML } from '@/utils/markdown'

const props = defineProps({
  penShow: {
    type: Boolean,
    default: false,
  },
  isChild: {
    type: Boolean,
    default: false,
  },
  gravatar: {
    type: String,
    default: '',
  },
  comment: {
    type: Object,
    default: () => ({}),
  },
  parentComment: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['replyComment', 'unreplyComment'])
// 获取某条评论是否被点赞
const getCommentLiked = (comment_id) => {
}
const marked = (content) => {
  return markdownToHTML(content)
}
const { $dayjs } = useNuxtApp()
// 点击用户
const clickUser = (event, user) => {
  if (!user.site)
    event.preventDefault()
}
const comment = computed(() => props.comment)
const replyComment = () => {
  emit('replyComment', props.comment, props.parentComment)
}
const unreplyComment = () => {
  emit('unreplyComment')
}
const { isMobile } = useDevice()
</script>

<template>
  <li
    class="comment-item"
  >
    <div v-if="!isMobile" class="cm-avatar">
      <a
        target="_blank"
        rel="external nofollow noopener"
        :href="comment.author.site"
        class=" border-4 border-gray-200 dark:border-gray-400"
        @click.stop="clickUser($event, comment.author)"
      >
        <img
          :alt="comment.author.name "
          :src="getGravatarUrlByEmail(comment.author.email)"
          draggable="false"
        >
      </a>
    </div>
    <div class="cm-body bg-inner">
      <div class="cm-header">
        <a
          class="user-name"
          target="_blank"
          rel="external nofollow noopener"
          :href="comment.author.site"
          @click.stop="clickUser($event, comment.author)"
        >{{ comment.author.name }}</a>
        <comment-ua v-if="comment.agent" :ua="comment.agent" />
        <span v-if="comment.ip_location && !isMobile" class="location">
          <span>{{ comment.ip_location.country }}</span>
          <span v-if="comment.ip_location.country && comment.ip_location.city">&nbsp;-&nbsp;</span>
          <span>{{ comment.ip_location.city }}</span>
        </span>
        <span class="flool">#{{ comment.comment_id }}</span>
      </div>
      <div class="cm-content">
        <!-- <p v-if="!!comment.pid" class="reply">
                  <span v-text="'reply'" />
                  <span>&nbsp;</span>
                  <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.pid}`)">
                    <span>#{{ comment.pid }}&nbsp;</span>
                    <strong v-if="comment.pid">@{{ comment.taruser }}</strong>
                  </a>
                  <span>：</span>
                </p> -->
        <div v-html="marked(comment.content)" />
      </div>
      <div class="cm-footer">
        <span class="create_at">{{ $dayjs(comment.create_time).fromNow() }}</span>
        <a v-if="!props.penShow" href class="reply" @click.stop.prevent="replyComment">
          <Icon name="ri:reply-fill" />
          <span v-text="'回复'" />
        </a>
        <a v-else href class="reply" @click.stop.prevent="unreplyComment">
          <Icon name="material-symbols:cancel" />
          <span v-text="'取消回复'" />
        </a>
        <a
          href
          class="like"
          :class="{
            liked: getCommentLiked(comment.comment_id),
            actived: !!comment.likes,
          }"
          @click.stop.prevent="likeComment(comment)"
        >
          <Icon name="icon-park-solid:good-two" />
          <span>({{ comment.likes }})</span>
        </a>
        <a
          href
          class="like"
          :class="{
            liked: getCommentLiked(comment.comment_id),
            actived: !!comment.likes,
          }"
          @click.stop.prevent="likeComment(comment)"
        >
          <Icon name="icon-park-solid:bad-two" />
          <span>({{ comment.likes }})</span>
        </a>
      </div>
      <slot name="pen" />
      <transition-group
        name="fade"
        tag="ul"
        class="comment-list"
      >
        <slot name="replys" />
      </transition-group>
      <!-- <CommentPen
        ref="markdownInput"
        :gravatar="props.gravatar"
        :is-reply="true"
      /> -->
    </div>
  </li>
</template>

<style lang="scss" scoped>

</style>
