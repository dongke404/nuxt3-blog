import { useStorage } from '@vueuse/core'
const localVote = useStorage('localVote', [])
const localUnvote = useStorage('localUnvote', [])

// 点赞初始化
const voteInit = (comments) => {
  const localVoteList = localVote.value
  const localUnvoteList = localUnvote.value
  if (localVoteList) {
    comments.forEach((comment) => {
      if (localVoteList.includes(comment.comment_id))
        comment.liked = true
      if (comment.replys.length > 0) {
        comment.replys.forEach((reply) => {
          if (localVoteList.includes(reply.comment_id))
            reply.liked = true
        })
      }
    })
  }
  if (localUnvoteList) {
    comments.forEach((comment) => {
      if (localUnvoteList.includes(comment.comment_id))
        comment.unliked = true
      if (comment.replys.length > 0) {
        comment.replys.forEach((reply) => {
          if (localUnvoteList.includes(reply.comment_id))
            reply.unliked = true
        })
      }
    })
  }
  return comments
}

export default voteInit
