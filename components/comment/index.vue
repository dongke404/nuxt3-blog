<!-- eslint-disable no-alert -->
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useDebounceFn, useStorage } from '@vueuse/core'
import CommentPen from './pen'
import getGravatarUrlByEmail from '@/utils/gravatar-url'
import { COMMENT_NUM, meta } from '@/config'

const props = defineProps({
  postId: {
    type: Number,
    default: 0,
  },
  pending: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Array,
    default: () => [],
  },
  count: {
    type: Number,
    default: 0,
  },
  initPage: {
    type: Number,
    default: 1,
  },
})
const emit = defineEmits(['flashComments'])
const click_cid = ref(0)
const click_rid = ref(0)
const parent_comment_id = ref(0)
const sort = ref(-1)
const page = ref(props.initPage)
const page_num = computed(() => Math.ceil(props.count / COMMENT_NUM))
const isPosting = ref(false)
const { isMobile } = useDevice()
const localUser = useStorage('userInfo', {})
const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
const urlRegex = /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
const blacklist = ref({})
const defaultgravatar = ref(meta.defaultgravatar)
const previewMode = ref(false)
const userCacheMode = ref(false)
const user = reactive({
  name: '',
  email: '',
  site: '',
  gravatar: null,
})
// 初始化本地用户即本地用户的点赞历史
const init = () => {
  const userInfo = localUser.value
  if (userInfo && userInfo.user_id) {
    user.name = userInfo.name
    user.email = userInfo.email
    user.site = userInfo.site
    user.gravatar = userInfo.gravatar
    user.user_id = userInfo.user_id
    userCacheMode.value = true
  }
}

// 验证数据
const checkRule = () => {
  if (!user.name) {
    alert('输入昵称')
    return false
  }
  if (!user.email) {
    alert('输入邮箱')
    return false
  }
  if (!emailRegex.test(user.email)) {
    alert('邮箱格式不正确')
    return false
  }
  if (user.site && !urlRegex.test(user.site))
    alert('网址格式不正确')
  else
    return true
}
// 更新用户数据
const updateUserCache = (event) => {
  event.preventDefault()
  if (checkRule()) {
    http.post('/register', {
      name: user.name,
      email: user.email,
      site: user.site,
      gravatar: user.gravatar,
    }).then(({ data }) => {
      userCacheMode.value = true
      localUser.value = data
    })
  }
}

// 清空用户数据
const clearUserCache = () => {
  userCacheMode.value = false
  localUser.value = {}
  Object.keys(user).forEach((key) => {
    user[key] = ''
  })
}
// 更新当前用户头像
const upadteUserGravatar = () => {
  user.gravatar = getGravatarUrlByEmail(user.email)
}
// 切换预览模式
const handleTogglePreviewMode = () => {
  previewMode.value = !previewMode.value
}

// 取消回复
const unreplyComment = () => {
  click_cid.value = 0
  click_rid.value = 0
  parent_comment_id.value = 0
}

// 排序
const sortComemnts = useDebounceFn((v) => {
  sort.value = v
  page.value = 1
  flashComments()
}, 500)
//
const pageComemnts = useDebounceFn((v) => {
  page.value = v
  // 滚动到顶端
  const callback = () => {
    window.scrollTo(0, 200)
  }
  flashComments(callback)
}, 500)
function flashComments(callback, show_skeleton = true) {
  emit('flashComments', { page: page.value, sort: sort.value, callback, show_skeleton })
}
// 回复评论
const replyComment = (comment, parentComment) => {
  const userInfo = localUser.value
  // 滑动到comment-box
  if (!userInfo.user_id) {
    const targetDom = document.getElementById('comment-box')
    if (targetDom) {
      scrollTo({
        top: targetDom.offsetTop,
        behavior: 'smooth',
      })
    }
    alert('江湖有缘，可否知晓阁下尊姓大名？')
    return
  }

  click_cid.value = comment.comment_id
  parent_comment_id.value = comment.comment_id
  click_rid.value = comment.comment_id
  if (parentComment.comment_id)
    parent_comment_id.value = parentComment.comment_id
  //
}
// 提交评论
const submitComment = (value, setInputText) => {
  if (!checkRule())
    return
  if (!value || !value.replace(/\s/g, ''))
    return alert('no content!')
  const lineOverflow = value.split('\n').length > 36
  const lengthOverflow = value.length > 2000
  if (lineOverflow || lengthOverflow)
    return alert('Content requirements are within 2000 words / 36 lines!')
  // 使用服务单配置的黑名单在本地校验邮箱和关键字
  // const { mails, keywords } = blacklist
  // const reg = new RegExp(keywords.join('|'))
  // if (
  //   mails.includes(user.email) || reg.test(value)
  // ) {
  //   alert('评论发布失败邮箱/IP 被列入黑名单\n3：内容包含黑名单关键词')
  //   return false
  // }
  const params = {
    post_id: props.postId,
    author: {
      name: user.name,
      email: user.email,
      site: user.site,
      gravatar: user.gravatar,
    },
    content: value,
    agent: navigator.userAgent,
  }
  if (click_cid.value) {
    params.comment_id = click_cid.value
    params.p_comment_id = parent_comment_id.value
    params.target_comment_id = click_rid.value
  }
  isPosting.value = true
  http.post('/comment', params).then(({ data }) => {
    setInputText('')
    localUser.value = data
    const callback = () => {
      previewMode.value = false
      userCacheMode.value = true
      click_cid.value = 0
      parent_comment_id.value = 0
      isPosting.value = false
    }
    flashComments(callback, false)
  }).catch((error) => {
    alert(error.message)
  })
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="comment-box bg-main bg-hover rounded" :class="{ mobile: false }">
    <transition name="module" mode="out-in">
      <div key="tools" class="tools border-b-2 border-gray-300">
        <div class="total">
          <div class="count rounded-sm bg-gray-300 dark:bg-gray-600">
            <strong class="count">{{ count }}</strong>
            <span>条看法</span>
          </div>
        </div>
        <div class=" font-semibold">
          <a href :class="[sort === -1 ? 'text-purple-500' : '']" @click.stop.prevent="sortComemnts(-1)">最新</a>
          <CommonDivider type="vertical" />
          <a href :class="[sort === 1 ? 'text-purple-500' : '']" @click.stop.prevent="sortComemnts(1)">最后</a>
          <CommonDivider type="vertical" />
          <a href :class="[sort === 2 ? 'text-purple-500' : '']" @click.stop.prevent="sortComemnts(2)">最热</a>
        </div>
      </div>
    </transition>
    <ClientOnly>
      <form id="post-box" class="post-box" name="comment">
        <!-- 用户编辑部分 -->
        <transition name="module" mode="out-in">
          <div v-if="!userCacheMode" key="edit" class="user">
            <div class="name">
              <input
                v-model="user.name" required type="text" name="name" autocomplete="on"
                class=" bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-600" placeholder="name"
              >
            </div>
            <div class="email">
              <input
                v-model="user.email" required type="email" name="email" autocomplete="on"
                class=" bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-600" placeholder="email"
                @blur="upadteUserGravatar"
              >
            </div>
            <div class="site">
              <input
                v-model="user.site" type="url" name="url" autocomplete="on"
                class=" bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-600" placeholder="site"
              >
            </div>
            <div class="save  bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 dark:bg-gray-600 ">
              <button type="submit" @click="$event => updateUserCache($event)">
                <Icon name="material-symbols:check" />
              </button>
            </div>
          </div>
          <!-- 用户设置部分 -->
          <div v-else-if="userCacheMode" key="user" class="user">
            <div class="edit">
              <strong class="name">{{ user.name }}</strong>
              <a href class="setting" @click.stop.prevent>
                <Icon name="material-symbols:settings" />
                <span class="account-setting" v-text="'设置账户信息'" />
                <ul class="user-tool">
                  <li @click.stop.prevent="userCacheMode = false" v-text="'编辑信息'" />
                  <li @click.stop.prevent="clearUserCache" v-text="'清空信息'" />
                </ul>
              </a>
            </div>
          </div>
        </transition>
        <div class="postbox">
          <div class="user">
            <div v-if="!isMobile" class="gravatar">
              <img
                alt="头像" :src="user.gravatar || defaultgravatar" draggable="false"
                @error="$event.target.src = meta.errorGravatar"
              >
            </div>
          </div>
          <div class="editor">
            <CommentPen
              :is-posting="isPosting"
              :disabled="isPosting"
              :enabled-preview-mode="previewMode"
              @toggle-preview-mode="handleTogglePreviewMode"
              @submit="submitComment"
            />
          </div>
        </div>
      </form>
    </ClientOnly>
    <Placeholder :data=" props.comments.length" :loading="props.pending">
      <template #empty>
        等待你的评论
      </template>
      <template #loading>
        <div>
          <ul key="skeleton" class="comment-list-skeleton ">
            <li v-for="item in 10" :key="item" class="item bg-main rounded-md">
              <div class="thumb">
                <skeleton-base />
              </div>
              <div class="content">
                <div class="title">
                  <skeleton-line />
                </div>
                <div class="description">
                  <div class="line-item">
                    <skeleton-line />
                  </div>
                </div>
                <skeleton-line class="meta" />
              </div>
            </li>
          </ul>
        </div>
      </template>
      <template #default>
        <div key="list" ref="listElement" class="list-box">
          <ul class="comment-list">
            <CommentItem
              v-for="comment in props.comments"
              :id="`comment-item-${comment.comment_id}`"
              :key="comment.comment_id"
              :gravatar="user.gravatar || defaultgravatar"
              :comment="comment"
              class="comment-item"
              :pen-show="comment.comment_id === click_cid"
              @reply-comment="replyComment"
              @unreply-comment="unreplyComment"
              @flash-comments="flashComments(() => {}, false) "
            >
              <template v-if="comment.comment_id === click_cid" #pen>
                <CommentPen
                  :is-reply="true"
                  :gravatar="user.gravatar || defaultgravatar"
                  :enabled-preview-mode="previewMode"
                  :is-posting="isPosting"
                  :disabled="isPosting"
                  @toggle-preview-mode="handleTogglePreviewMode"
                  @submit="submitComment"
                />
              </template>

              <template #replys>
                <ul class="comment-list">
                  <CommentItem
                    v-for="reply in comment.replys"
                    :id="`comment-item-${reply.comment_id}`"
                    :key="reply.comment_id"
                    :gravatar="user.gravatar || defaultgravatar"
                    :parent-comment="comment"
                    :comment="reply" :pen-show="reply.comment_id === click_cid"
                    :is-child="true"
                    class="comment-item"
                    @reply-comment="replyComment"
                    @unreply-comment="unreplyComment"
                    @flash-comments="flashComments(() => {}, false) "
                  >
                    <template v-if="reply.comment_id === click_cid" #pen>
                      <CommentPen
                        :gravatar="user.gravatar || defaultgravatar"
                        :is-reply="true"
                        :enabled-preview-mode="previewMode"
                        :is-posting="isPosting"
                        :disabled="isPosting"
                        @toggle-preview-mode="handleTogglePreviewMode"
                        @submit="submitComment"
                      />
                    </template>
                  </CommentItem>
                </ul>
              </template>
            </CommentItem>
          </ul>
        </div>
      </template>
    </Placeholder>
    <transition name="module">
      <div v-if="props.count > 0" class="pagination-box">
        <ul class="pagination-list">
          <li class="item">
            <a href class="pagination-btn prev disabled">
              <span>—</span>
            </a>
          </li>
          <li v-for="(item, index) in page_num" :key="index" class="item">
            <a href :class="[page === item ? 'text-blue-500' : '']" class="pagination-btn" @click.stop.prevent="pageComemnts(item)">{{ item }}</a>
          </li>
          <li class="item">
            <a href class="pagination-btn next disabled">
              <span>—</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
.comment-list-skeleton {
  padding: 0;
  margin-top: $lg-gap;
  list-style: none;
  overflow: hidden;

  .item {
    display: flex;
    height: 6rem;
    padding: $gap;
    margin-bottom: $lg-gap;
    &:last-child {
      margin-bottom: 0;
    }

    .thumb {
      width: 4rem;
        height: 4rem;
    }

    .content {
      margin-left: $lg-gap;
      flex-grow: 1;

      .title {
        height: 1em;
        width: 36%;
      }

      .description {
        .line-item {
          width: 100%;
          height: 1em;
          margin-top: $sm-gap;
        }
      }

      .meta {
        width: 68%;
        height: 1em;
        margin-top: $sm-gap;
      }
    }
  }
}
.comment-box {
  padding: $gap;

  &.mobile {
    .post-box {
      >.user {
        padding: 0;
        height: auto;
        flex-direction: column;

        >.name,
        >.email,
        >.site,
        >.save {
          width: 80%;
          margin-left: 0;
          margin-right: 0;
          margin-bottom: $gap;
        }

        >.save {
          width: 30%;
          margin-bottom: 0;
        }
      }

      >.postbox {
        >.user {
          margin: 0;
        }
      }
    }
  }

  >.tools {
    display: flex;
    padding-bottom: $gap;
    align-items: center;
    justify-content: space-between;

    .count-skeleton,
    .like-skeleton,
    .sort-skeleton {
      height: 2rem;
    }

    .total-skeleton {
      display: flex;
      width: 70%;

      .count-skeleton {
        width: 20%;
        margin-right: 1rem;
      }

      .like-skeleton {
        width: 40%;
      }
    }

    .sort-skeleton {
      width: 20%;
    }

    >.total {
      display: flex;

      >.like,
      >.sponsor,
      >.count {
        padding: $xs-gap 0.5em;
        margin-right: $sm-gap;

      }

      >.like {
        @include background-transition();

        &.liked {
          >.iconfont {
            color: $red;
          }
        }
      }
    }

  }

  >.list-skeleton {
    .comment-item {
      padding-left: 0 !important;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .gravatar {
        width: 4rem;
        height: 4rem;
      }

      .content {
        width: calc((100% - 5rem) * 0.9);
      }
    }
  }

  >.empty-box {
    font-weight: bold;
    text-align: center;
    height: 6rem;
    line-height: 6rem;
  }

  .list-box {
    .comment-list {
      padding: 0;
      margin: 0;
      list-style-type: none;
    }
  }

  >.pagination-box {
    margin-bottom: $lg-gap;

    >.pagination-list {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      list-style-type: none;

      >.item {
        margin: 0 0.5em;

        >.pagination-btn {
          display: inline-block;
          width: 2rem;
          height: 2rem;
          display: inline-block;
          line-height: 2rem;
          text-align: center;
          @include background-transition();

          &.prev,
          &.next {
            width: 1em;
            font-size: $font-size-h6;

            &:hover {
              background: none;
            }
          }

          &.disabled {
            cursor: no-drop;
            opacity: 0.5;
          }

        }
      }
    }
  }

  .post-box {
    display: block;
    padding-top: $gap;

    >.user {
      width: 100%;
      height: 2em;
      line-height: 2em;
      display: flex;
      margin-bottom: $gap;
      padding-left: 5.2rem;

      >.edit {
        flex-grow: 1;
        text-align: right;
        line-height: 2em;
        position: relative;

        >.setting {
          font-size: $font-size-h6;
          margin-left: $gap;
          display: inline-block;
          position: relative;

          &:hover {
            >.user-tool {
              display: block;
            }
          }

          >.iconfont {
            margin-right: $xs-gap;
          }

          >.account-setting {
            text-transform: capitalize;
          }

          >.user-tool {
            display: none;
            position: absolute;
            right: 0;
            top: 2em;
            margin: 0;
            padding: 0;
            padding-top: 0.5rem;
            list-style-type: square;
            z-index: $z-index-normal + 1;

            >li {
              padding: 0 $gap;
              background-color: rgba($accent, 0.5);

              &:hover {
                background-color: rgba($accent, 0.8);
              }
            }
          }
        }
      }

      >.save {
        width: 10%;
        margin-left: $gap;
        flex-grow: 1;
        line-height: 2em;
        text-align: center;

        >button {
          width: 100%;
          height: 100%;

          @include background-transition();

        }
      }

      >.name,
      >.email,
      >.site {
        flex-grow: 1;

        >input {
          width: 100%;
          height: 2em;
          line-height: 2em;
          text-indent: 3px;
          @include background-transition();
        }
      }

      >.name,
      >.email {
        margin-right: $gap;
      }
    }

    >.postbox {
      width: 100%;
      display: flex;

      >.user {
        margin-right: 1em;

        >.gravatar {
          display: block;
          margin-bottom: 0.5em;
          width: 4rem;
          height: 4rem;

          >img {
            width: 100%;
            height: 100%;
            transition: transform 0.5s ease-out;
          }
        }
      }

      >.editor {
        flex-grow: 1;
        overflow: hidden;

        >.will-reply {
          font-size: $font-size-h6;
          margin-bottom: 1em;

          >.reply-user {
            display: flex;
            justify-content: space-between;
            margin-bottom: $gap;
            padding: 0 $gap;
            height: 2.6em;
            line-height: 2.6em;

            @include background-transition();

          }

          >.reply-preview {
            max-height: 10em;
            overflow: auto;
            padding: $gap;

            @include background-transition();

          }
        }
      }
    }
  }
}
</style>

