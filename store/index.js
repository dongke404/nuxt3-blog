import { defineStore } from 'pinia'
import http from '@/utils/http'

export const useAppStore = defineStore('appStore', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      tags: [],
      statistics: {},
    }
  },

  actions: {
    // 获取标签
    async getTags() {
      const { data } = await http.get('/tag')
      this.tags = data
    },
    // 获取统计信息
    async getStatistics() {
      const { data } = await http.get('/statistics')
      this.statistics = data
    },
  },
})
