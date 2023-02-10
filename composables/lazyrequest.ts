// 不阻塞路由方案 先路由进页面再请求数据 需要watch处理null的情况
import http from '@/utils/http'
export const useLazyrequest = async (url: string, method: string, callback: (ndata: any, pending: any) => void, params?: any, options?: any) => {
  const { data, pending }: any = await http.request(url, method, 1, params, options)
  watch(data, (v: any) => {
    if (v && v.code === 0) {
      const ndata = v.data
      callback(ndata, pending)
    }
    else {
      // 提示出错
    }
  }, { immediate: true })
}

