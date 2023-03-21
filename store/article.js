import { defineStore } from 'pinia'
import http from '@/utils/http'

export const useArticleStore = defineStore('article', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      articleDetail: {},
      headings: [],
      wordNum: 0,
    }
  },

  actions: {
    // 获取文章详情
    async getArticleDetail(id, callback) {
      const { data } = await http.get(`/article/${id}`)
      this.articleDetail = data
      callback && callback(data)
    },
  },
})
