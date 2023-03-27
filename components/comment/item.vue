<script setup>
import { useStorage, useThrottleFn } from '@vueuse/core'
import getGravatarUrlByEmail from '@/utils/gravatar-url'
import { APP_IMAGES } from '@/config'
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
const emit = defineEmits(['replyComment', 'unreplyComment', 'flashComments'])
const localVote = useStorage('localVote', [])
const localUnvote = useStorage('localUnvote', [])
const localUser = useStorage('userInfo', {})
const { isMobile } = useDevice()

const { $dayjs } = useNuxtApp()
// 点击用户
const clickUser = (event, user) => {
  if (!user.site)
    event.preventDefault()
}
const comment = computed(() => {
  // console.log(props.comment)
  return props.comment
})
const replyComment = () => {
  emit('replyComment', props.comment, props.parentComment)
}
const unreplyComment = () => {
  emit('unreplyComment')
}
const toSomeAnchorById = (id) => {
  const targetDom = document.getElementById(id)
  if (targetDom) {
    scrollTo({
      top: targetDom.offsetTop,
      behavior: 'smooth',
    })
  }
}

// 点赞
const likeComment = useThrottleFn((comment) => {
  const userInfo = localUser.value
  const data = {
    comment_id: comment.comment_id,
  }
  if (props.isChild)
    data.isReply = true
  if (userInfo.user_id)
    data.user_id = userInfo.user_id
  voteHander(comment.comment_id, true)
  http.post('/likeComment', data).then(({ data }) => {
    emit('flashComments')
  })
}, 3000)

// 点踩
const unlikeComment = (comment) => {
  const userInfo = localUser.value
  const data = {
    comment_id: comment.comment_id,
  }
  if (props.isChild)
    data.isReply = true
  if (userInfo)
    data.user_id = userInfo.user_id
  voteHander(comment.comment_id, false)
  http.post('/dislikeComment', data).then(({ data }) => {
    emit('flashComments')
  })
}

// 点赞处理
function voteHander(comment_id, isVote) {
  if (isVote) {
    if (localUnvote.value.includes(comment_id))
      localUnvote.value = localUnvote.value.filter(id => id !== comment_id)
    if (localVote.value.length > 0) {
      if (!(localVote.value.includes(comment_id)))
        localVote.value = [...localVote.value, comment_id]
    }
    else {
      localVote.value = [comment_id]
    }
  }
  else {
    if (localVote.value.includes(comment_id))
      localVote.value = localVote.value.filter(id => id !== comment_id)
    if (localUnvote.value.length > 0) {
      if (!(localUnvote.value.includes(comment_id)))
        localUnvote.value = [...localUnvote.value, comment_id]
    }
    else {
      localUnvote.value = [comment_id]
    }
  }
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
          @error="$event.target.src = APP_IMAGES.errorGravatar"
        >
      </a>
    </div>
    <div class="cm-body bg-inner" :style="{ paddingRight: props.isChild ? 0 : '' }">
      <div class="cm-header">
        <span v-if="comment.author.user_id === 1" class=" rounded-sm bg-blue-500 text-xs p-[2px] mr-1">博主</span>
        <a
          class="user-name"
          target="_blank"
          rel="external nofollow noopener"
          :href="comment.author.site"
          @click.stop="clickUser($event, comment.author)"
        >{{ comment.author.name }}</a>
        <comment-ua v-if="comment.agent" :ua="comment.agent" />
        <span v-if="comment.ipInfo && !isMobile" class="location">
          <span>{{ comment.ipInfo.country }}</span>
          <span v-if="comment.ipInfo.country && comment.ipInfo.city">&nbsp;-&nbsp;</span>
          <span>{{ comment.ipInfo.city }}</span>
        </span>
        <span class="flool">#{{ comment.comment_id }}</span>
      </div>
      <div class="cm-content markdown-html-diy mt-1 mb-1">
        <p v-if="comment.target_comment_id !== comment.p_comment_id" class="reply">
          <span v-text="'回复'" />
          <span>&nbsp;</span>
          <a href @click.stop.prevent="toSomeAnchorById(`comment-item-${comment.p_comment_id}`)">
            <span>#{{ comment.target_comment_id }}&nbsp;</span>
            <strong v-if="comment.target_comment_id">@<span v-if="comment.to_author === 1" class=" rounded-sm bg-blue-500 text-xs p-[2px] mr-1">博主</span>{{ comment.to_author_name }}</strong>
          </a>
          <span>：</span>
        </p>
        <CommonMarkdown :html="comment.content" />
      </div>
      <div class="cm-footer text-gray-500 dark:text-gray-400">
        <span class="create_at">{{ $dayjs(comment.create_time).fromNow() }}</span>
        <a v-if="!props.penShow" href class="reply" @click.stop.prevent="replyComment">
          <Icon name="ri:reply-fill" class="mr-1" />
          <span>回复 <span v-if="!props.isChild && comment.reply_num">({{ comment.reply_num }})</span></span>
        </a>
        <a v-else href class="reply" @click.stop.prevent="unreplyComment">
          <Icon name="material-symbols:cancel" class=" mr-1" />
          <span v-text="'取消回复'" />
        </a>
        <a
          href
          class="like"
          :class="{
            liked: comment.liked,
          }"
          @click.stop.prevent="likeComment(comment)"
        >
          <Icon name="icon-park-solid:good-two" class=" mr-1" />
          <span>({{ comment.likes || 0 }})</span>
        </a>
        <a
          href
          class="like"
          :class="{
            liked: comment.unliked,
          }"
          @click.stop.prevent="unlikeComment(comment)"
        >
          <Icon name="icon-park-solid:bad-two" class=" mr-1" />
          <span>({{ comment.dislikes || 0 }})</span>
        </a>
      </div>
      <slot name="pen" />
      <slot name="replys" />
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
  font-size: 0.85rem;
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
