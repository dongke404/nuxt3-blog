import { defineStore } from 'pinia'
import http from '@/utils/http'

export const useArticleListStore = defineStore('articleList', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      articleList: [],
      totalCount: 0,
      currPage: 1,
      limit: 16,
      rankArticleList: [],
      sort: 1,
    }
  },

  actions: {
    // 获取文章列表
    async getArticleList(params, callback) {
      const { data } = await http.get('/article', {
        page: this.currPage,
        limit: this.limit,
        ...params,
      })
      this.articleList = data.list
      this.totalCount = data.pagination.count
      callback && callback(data)
    },
    // 获取更多文章
    async loadmore(params, callback) {
      this.currPage++
      const { data } = await http.get('/article', {
        page: this.currPage,
        limit: this.limit,
        ...params,
      })
      this.articleList = [...this.articleList, ...data.list]
      this.totalCount = data.pagination.count
      callback && callback()
    },
    // 获取排行文章
    async getRankArticleList() {
      const { data } = await http.get('/article', {
        sort: this.sort,
        limit: 10,
      })
      this.rankArticleList = data.list
    },
  },
})
