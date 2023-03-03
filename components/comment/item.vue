<script setup>
import { computed, ref } from 'vue'
import getGravatarUrlByEmail from '@/utils/gravatar-url'
import { markdownToHTML } from '@/utils/markdown'
import { meta } from '@/config/app.config'

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
const imgError = (e) => {
  e.target.src = meta.errorGravatar
}
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
          @error="$event.target.src = meta.errorGravatar"
        >
      </a>
    </div>
    <div class="cm-body bg-inner" :style="{ paddingRight: props.isChild ? 0 : '' }">
      <div class="cm-header">
        <span v-if="comment.author.email === meta.email" class=" rounded-sm bg-blue-500 text-xs p-[2px] mr-1">博主</span>
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
      <div class="cm-content markdown-html-diy">
        <CommonMarkdown :html="comment.content" />
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
    </div>
  </li>
</template>

<style lang="scss">
#comment-box.mobile {
  .comment-item {
    padding: 0;
    margin-top: $gap;

    >.cm-body {
      padding: $sm-gap $gap;
    }
  }
}

.comment-item {
  position: relative;
  padding-left: 2rem;
  margin-top: $lg-gap;

  &:last-child {
    margin-bottom: $lg-gap;
  }

  >.cm-avatar {
    display: block;
    position: absolute;
    left: 0;
    top: 1rem;

    >a {
      display: block;
      width: 4rem;
      height: 4rem;

      >img {
        width: 100%;
        height: 100%;
      }
    }
  }

  >.cm-body {
    display: block;
    width: 100%;
    height: 100%;
    padding: $sm-gap $sm-gap $sm-gap (
      $lg-gap * 2.8
    );
    @include background-transition();

    >.cm-header {
      display: block;
      position: relative;
      >.user-name {
        font-weight: bold;
        margin-right: $gap;

        &:hover {
          text-decoration: underline;
        }
      }

      .os,
      .browser,
      .location {
        font-size: 0.7rem;
        margin-right: $gap;

      }

      >.flool {
        float: right;
        line-height: 2rem;

        font-size: $font-size-small;
        font-weight: 900;
      }
    }

    >.cm-content {
      padding-right: $xs-gap;

      >.reply {
        font-weight: bold;

        >a {
          text-decoration: none;
        }
      }
    }

    >.cm-footer {
      display: flex;

      >.create_at,
      >.reply,
      >.like {
        font-size: $font-size-small;
        margin-right: $gap;
      }

      >.like {
        &:hover {
          color: $red;
        }

        &.liked {
          color: $red;
          font-weight: bold;
        }

        &.actived {
          font-weight: bold;
        }
      }

      >.reply,
      >.like {
        opacity: 0.8;
        transition: visibility $transition-time-fast,
          opacity $transition-time-fast, color $transition-time-fast;

        &:hover {
          opacity: 1;
        }

      }
    }
  }
}

.markdown-html-diy {
  font-size: 0.5rem;
  p {
    text-indent: 0 !important ;
    line-height: 2em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-indent: 0;
    margin: 0.5em 0;
  }
  code {
    border: 1px solid $module-bg-darker-2;
    background-color: $module-bg-darker-1;
    color: $link-color;
  }

  pre {
    background-color: #f3f3f3;

    &::before {
      background-color:rgb(198, 198, 198);
    }

    .code-lines {
      background-color: rgb(218, 218, 218);
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
