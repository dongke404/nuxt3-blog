<!-- eslint-disable no-alert -->
<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import CommentPen from './pen'
import getGravatarUrlByEmail from '@/utils/gravatar-url'
import { COMMENT_NUM, meta } from '@/config/app.config'
import { getJSONStorageReader } from '@/utils/local-storage'
import { markdownToHTML } from '@/utils/markdown'
const props = defineProps({
  fetching: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  postId: {
    type: Number,
    required: true,
  },
})

const { element: markdownInput } = useLozad()
const pending = ref(false)
const comments = ref([])
const count = ref(0)
const pageNum = ref(1)
const click_cid = ref(0)
const click_rid = ref(0)
const parent_comment_id = ref(0)

// page=1&page_num=16&sort=1&post_id=0
useLazyrequest('/comment', 'GET', (ndata) => {
  comments.value = ndata.comments
  count.value = ndata.count
  pending.value = false
}, {
  page: pageNum.value,
  page_num: 16,
  sort: -1,
  post_id: 0,
})

const { isMobile } = useDevice()
const localUser = getJSONStorageReader('userInfo')
const localVote = getJSONStorageReader('localVote')
const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
const urlRegex = /^((https|http):\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
const blacklist = ref({})
const defaultgravatar = ref(meta.defaultgravatar)
const commentNum = ref(COMMENT_NUM)
const lozadObserver = ref(null)
const pid = ref(0)
const sortMode = ref(1)
const previewMode = ref(false)
const userCacheMode = ref(false)
const userCacheEditing = ref(false)
const user = reactive({
  name: '',
  email: '',
  site: '',
  gravatar: null,
})
// 初始化本地用户即本地用户的点赞历史
const init = () => {
  const userInfo = localUser.get()
  const voteInfo = localVote.get()
  if (userInfo) {
    user.name = userInfo.name
    user.email = userInfo.email
    user.site = userInfo.site
    user.gravatar = userInfo.gravatar
    userCacheMode.value = true
  }
}
const listElement = ref(null)
const observeLozad = () => {
  const lozadElements = listElement.value && listElement.value.querySelectorAll('.lozad')
  if (!lozadElements || !lozadElements.length)
    return false

  lozadObserver.value = window.lozad(lozadElements, {
    loaded: element => element.classList.add('loaded'),
  })
  lozadObserver.value.observe()
}
const loadCommentsAnimateDone = () => {
  observeLozad()
}
const addCommentAnimateDone = () => {
  // observeLozad()
}
const marked = (content) => {
  return markdownToHTML(content)
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
    localUser.set(user)
    userCacheEditing.value = false
  }
  localUser.set(user)
}

// 清空用户数据
const clearUserCache = () => {
  userCacheMode.value = false
  userCacheEditing.value = false
  localUser.remove()
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
// 评论排序(页数回到第一页)
const sortComemnts = (sort) => {
}

// 点击用户
const clickUser = (event, user) => {

}
// 跳转到某条指定的id位置
const toSomeAnchorById = (id) => {

}
// 回复评论
const replyComment = (comment, parentComment) => {
  click_cid.value = comment.comment_id
  parent_comment_id.value = comment.comment_id
  if (parentComment.comment_id) {
    click_rid.value = comment.comment_id
    parent_comment_id.value = parentComment.comment_id
  }

  // markdownInput.value.focus()
}

// 取消回复
const unreplyComment = () => {
  click_cid.value = 0
  parent_comment_id.value = 0
}
// 找到回复来源(从全部评论中找父级评论 ,缺点后面的评论显示不了第一页的，建议服务端组合好)
const findReplyParent = (pid) => {

}
// 喜欢当前页面
const likePage = () => {

}
// 点赞某条评论
const likeComment = (comment) => {

}

// 获取评论列表
const loadComemntList = (params = {}) => {
  // http.get('/comment', {

  //   page: pageNum.value,
  //   page_num: 16,
  //   sort: 1,
  //   post_id: 0,

  // }).then((res) => {
  //   console.log(res)
  //   comments.value = res.comments
  //   count.value = res.count
  //   pending.value = false
  // })
  useLazyrequest('/comment', 'GET', (ndata) => {
    comments.value = ndata.comments
    count.value = ndata.count
    pending.value = false
  }, {
    page: pageNum.value,
    page_num: 16,
    sort: -1,
    post_id: 0,
  })
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
    post_id: 0,
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
  http.post('/comment', params).then(() => {
    previewMode.value = false
    userCacheMode.value = true
    click_cid.value = 0
    parent_comment_id.value = 0
    setInputText('')
    localUser.set(user)
    loadComemntList()
  }).catch((error) => {
    alert(error.message)
  })
}
onMounted(() => {
  init()
})
</script>

<template>
  <div id="comment-box" class="comment-box bg-main bg-hover rounded" :class="{ mobile: false }">
    <transition name="module" mode="out-in">
      <div key="tools" class="tools border-b-2 border-gray-300">
        <div class="total">
          <div class="count rounded-sm bg-gray-300 dark:bg-gray-600">
            <strong class="count">{{ count }}</strong>
            <span>条看法</span>
          </div>
        </div>
        <div class="sort">
          <a
            href
            class="sort-btn"
          >最新</a>
          <a
            href
            class="sort-btn"
          >最热</a>
        </div>
      </div>
    </transition>
    <ClientOnly>
      <form id="post-box" class="post-box" name="comment">
        <!-- 用户编辑部分 -->
        <transition name="module" mode="out-in">
          <div v-if="!userCacheMode || userCacheEditing" key="edit" class="user">
            <div class="name">
              <input
                v-model="user.name"
                required
                type="text"
                name="name"
                autocomplete="on"
                class=" bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-600"
                placeholder="name"
              >
            </div>
            <div class="email">
              <input
                v-model="user.email"
                required
                type="email"
                name="email"
                autocomplete="on"
                class=" bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-600"
                placeholder="email"
                @blur="upadteUserGravatar"
              >
            </div>
            <div class="site">
              <input
                v-model="user.site"
                type="url"
                name="url"
                autocomplete="on"
                class=" bg-gray-300 hover:bg-gray-200 focus:bg-gray-200 dark:bg-gray-600"
                placeholder="site"
              >
            </div>
            <div class="save  bg-gray-300 hover:bg-gray-400 focus:bg-gray-400 dark:bg-gray-600 ">
              <button type="submit" @click="$event => updateUserCache($event)">
                <Icon name="material-symbols:check" />
              </button>
            </div>
          </div>
          <!-- 用户设置部分 -->
          <div v-else-if="userCacheMode && !userCacheEditing" key="user" class="user">
            <div class="edit">
              <strong class="name">{{ user.name }}</strong>
              <a href class="setting" @click.stop.prevent>
                <Icon name="material-symbols:settings" />
                <span class="account-setting" v-text="'设置账户信息'" />
                <ul class="user-tool">
                  <li
                    @click.stop.prevent="userCacheEditing = true"
                    v-text="'编辑信息'"
                  />
                  <li
                    @click.stop.prevent="clearUserCache"
                    v-text="'清空信息'"
                  />
                </ul>
              </a>
            </div>
          </div>
        </transition>
        <div class="postbox">
          <div class="user">
            <div v-if="!isMobile" class="gravatar">
              <img alt="头像" :src="user.gravatar || defaultgravatar " draggable="false">
            </div>
          </div>
          <div class="editor">
            <transition name="module">
              <div v-if="!!pid" key="reply" class="will-reply">
                <div class="reply-user">
                  <span>
                    <span v-text="'reply'" />
                    <span>&nbsp;</span>
                    <a
                      href
                      @click.stop.prevent="toSomeAnchorById(`comment-item-${replyCommentSlef.comment_id}`)"
                    >
                      <strong>#{{ replyCommentSlef.comment_id }} @{{ replyCommentSlef.author.name }}：</strong>
                    </a>
                  </span>
                  <a
                    href
                    class="cancel iconfont icon-cancel"
                    @click.stop.prevent="cancelCommentReply"
                  />
                </div>
                <div class="reply-preview" v-html="marked(replyCommentSlef.content)" />
              </div>
            </transition>
            <CommentPen
              ref="markdownInput"
              :enabled-preview-mode="previewMode"
              @toggle-preview-mode="handleTogglePreviewMode"
              @submit="submitComment"
            />
          </div>
        </div>
      </form>
    </ClientOnly>
    <transition name="module" mode="out-in">
      <div key="list" ref="listElement" class="list-box">
        <transition-group
          name="fade"
          tag="ul"
          class="comment-list"
          @after-enter="addCommentAnimateDone"
        >
          <CommentItem
            v-for="comment in comments"
            :id="`comment-item-${comment.comment_id}`"
            :key="comment.comment_id"
            :gravatar="user.gravatar || defaultgravatar"
            :comment="comment"
            class="comment-item"
            :pen-show="comment.comment_id === click_cid"
            @reply-comment="replyComment"
            @unreply-comment="unreplyComment"
          >
            <template v-if="comment.comment_id === click_cid" #pen>
              <CommentPen
                ref="markdownInput"
                :gravatar="user.gravatar"
                :enabled-preview-mode="previewMode"
                @toggle-preview-mode="handleTogglePreviewMode"
                @submit="submitComment"
              />
            </template>

            <template #replys>
              <CommentItem
                v-for="reply in comment.replys"
                :id="`comment-item-${reply.comment_id}`"
                :key="reply.comment_id"
                :gravatar="user.gravatar || defaultgravatar"
                :parent-comment="comment"
                :comment="reply"
                :pen-show="reply.comment_id === click_cid"
                class="comment-item"
                @reply-comment="replyComment"
                @unreply-comment="unreplyComment"
              >
                <template v-if="reply.comment_id === click_cid" #pen>
                  <CommentPen
                    ref="markdownInput"
                    :gravatar="user.gravatar"
                    :is-reply="true"
                    :enabled-preview-mode="previewMode"
                    @toggle-preview-mode="handleTogglePreviewMode"
                    @submit="submitComment"
                  />
                </template>
              </CommentItem>
            </template>
          </CommentItem>
        </transition-group>
      </div>
    </transition>
    <transition name="module">
      <div v-if="1" class="pagination-box">
        <ul class="pagination-list">
          <li class="item">
            <a href class="pagination-btn prev disabled">
              <span>—</span>
            </a>
          </li>
          <li v-for="(item, index) in pageNum" :key="index" class="item">
            <a
              href
              class="pagination-btn"
            >{{ item }}</a>
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
  .cm-content,
  .reply-preview,
  .markdown-preview {
    margin: $sm-gap 0;
    line-height: 2em;
    word-wrap: break-word;
    font-size: $font-size-h6;

    a {
      text-decoration: underline;
    }

    img {
      margin: 0.5rem 0;
      max-width: 100%;
      border-radius: 2px;
      cursor: pointer;
    }

    p {
      margin: 0;
    }

    code {
      color: #bd4147;
      padding: 0.3em 0.5em;
      margin: 0 0.5em;

    }

    pre {
      $code-header-height: 2.8rem;
      display: flex;
      align-items: baseline;
      flex-wrap: wrap-reverse;
      position: relative;
      overflow: hidden;
      margin-top: 0.6em;
      margin-bottom: 1em;
      padding-top: $code-header-height;
      background-color: rgba(0, 0, 0, 0.8);

      &:before {
        color: $white;
        content: attr(data-lang) " CODE";
        height: $code-header-height;
        line-height: $code-header-height;
        font-size: $font-size-h6;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        font-weight: 700;
        background-color: rgba(68, 68, 68, 0.9);
        display: block;
        text-transform: uppercase;
        text-align: center;
      }

      > .code-lines {
        display: none;
      }

      > code {
        margin: 0;
        padding: 1rem;
        float: left;
        width: 100%;
        height: 100%;
        display: block;
        font-size: $font-size-h6;
        line-height: 1.8rem;
        color: rgba(255, 255, 255, 0.87);
        background-color: transparent;
      }
    }
  }

  #comment-box {
    padding: $gap;

    &.mobile {
      .list-box {
        .comment-list {
          > .comment-item {
            padding: 0;
            margin-top: $gap;

            > .cm-body {
              padding: $sm-gap $gap;
            }
          }
        }
      }

      .post-box {
        > .user {
          padding: 0;
          height: auto;
          flex-direction: column;

          > .name,
          > .email,
          > .site,
          > .save {
            width: 80%;
            margin-left: 0;
            margin-right: 0;
            margin-bottom: $gap;
          }

          > .save {
            width: 30%;
            margin-bottom: 0;
          }
        }

        > .postbox {
          > .user {
            margin: 0;
          }
        }
      }
    }

    > .tools {
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

      > .total {
        display: flex;

        > .like,
        > .sponsor,
        > .count {
          padding: $xs-gap 0.5em;
          margin-right: $sm-gap;

        }

        > .like {
          @include background-transition();

          &.liked {
            > .iconfont {
              color: $red;
            }
          }
        }
      }

      > .sort {
        > .sort-btn {
          margin-left: $gap;

          &.actived {
            color: $link-hover-color;
            font-weight: bold;
          }
        }
      }
    }

    > .list-skeleton {
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

    > .empty-box {
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

        > .comment-item {
          position: relative;
          padding-left: 2rem;
          margin-top: $lg-gap;

          &:last-child {
            margin-bottom: $lg-gap;
          }

          > .cm-avatar {
            display: block;
            position: absolute;
            left: 0;
            top:1rem;

            > a {
              display: block;
              width: 4rem;
              height: 4rem;
              > img {
                width: 100%;
                height: 100%;
              }
            }
          }

          > .cm-body {
            display: block;
            width: 100%;
            height: 100%;
            padding: $sm-gap $sm-gap $sm-gap ($lg-gap * 2.8);

            @include background-transition();

            > .cm-header {
              display: block;
              position: relative;

              > .user-name {
                font-weight: bold;
                margin-right: $gap;

                &:hover {
                  text-decoration: underline;
                }
              }

              .os,
              .browser,
              .location {
                color: $text-disabled;
                font-size: $font-size-small;
                margin-right: $gap;

              }

              > .flool {
                float: right;
                line-height: 2rem;

                font-size: $font-size-small;
                font-weight: 900;
              }
            }

            > .cm-content {
              padding-right: $xs-gap;

              > .reply {
                color: $text-disabled;
                font-weight: bold;

                > a {
                  text-decoration: none;
                }
              }
            }

            > .cm-footer {
              display: flex;

              > .create_at,
              > .reply,
              > .like {
                font-size: $font-size-small;
                margin-right: $gap;
              }

              > .create_at {
                color: $text-disabled;
              }

              > .like {
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

              > .reply,
              > .like {
                opacity: 0.8;
                transition: visibility $transition-time-fast,
                  opacity $transition-time-fast, color $transition-time-fast;

                &:hover {
                  opacity: 1;
                }

                > .iconfont {
                  opacity: 0.8;

                }
              }
            }
          }
        }
      }
    }

    > .pagination-box {
      margin-bottom: $lg-gap;

      > .pagination-list {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        list-style-type: none;

        > .item {
          margin: 0 0.5em;

          > .pagination-btn {
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
      border-top: 1px dashed ;

      > .user {
        width: 100%;
        height: 2em;
        line-height: 2em;
        display: flex;
        margin-bottom: $gap;
        padding-left: 5.2rem;

        > .edit {
          flex-grow: 1;
          text-align: right;
          line-height: 2em;
          position: relative;

          > .setting {
            font-size: $font-size-h6;
            margin-left: $gap;
            display: inline-block;
            position: relative;

            &:hover {
              > .user-tool {
                display: block;
              }
            }

            > .iconfont {
              margin-right: $xs-gap;
            }

            > .account-setting {
              text-transform: capitalize;
            }

            > .user-tool {
              display: none;
              position: absolute;
              right: 0;
              top: 2em;
              margin: 0;
              padding: 0;
              padding-top: 0.5rem;
              list-style-type: square;
              z-index: $z-index-normal + 1;

              > li {
                padding: 0 $gap;
                background-color: rgba($accent, 0.5);

                &:hover {
                  background-color: rgba($accent, 0.8);
                }
              }
            }
          }
        }

        > .save {
          width: 10%;
          margin-left: $gap;
          flex-grow: 1;
          line-height: 2em;
          text-align: center;

          > button {
            width: 100%;
            height: 100%;

            @include background-transition();

          }
        }

        > .name,
        > .email,
        > .site {
          flex-grow: 1;

          > input {
            width: 100%;
            height: 2em;
            line-height: 2em;
            text-indent: 3px;
            @include background-transition();
          }
        }

        > .name,
        > .email {
          margin-right: $gap;
        }
      }

      > .postbox {
        width: 100%;
        display: flex;

        > .user {
          margin-right: 1em;

          > .gravatar {
            display: block;
            margin-bottom: 0.5em;
            width: 4rem;
            height: 4rem;

            > img {
              width: 100%;
              height: 100%;
              transition: transform 0.5s ease-out;
            }
          }
        }

        > .editor {
          flex-grow: 1;
          overflow: hidden;

          > .will-reply {
            font-size: $font-size-h6;
            margin-bottom: 1em;

            > .reply-user {
              display: flex;
              justify-content: space-between;
              margin-bottom: $gap;
              padding: 0 $gap;
              height: 2.6em;
              line-height: 2.6em;

              @include background-transition();

            }

            > .reply-preview {
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

