// 不阻塞路由方案
import http from '@/utils/http'
export const useLazyrequest = async (url: string, method: string, callback: (data: any) => void, params?: any) => {
  const resdata: any = await http[method](url, method, 1, params)
  watch(resdata, (ndata: any) => {
    if (ndata != null) {
      const data = ndata.data
      callback(data)
    }
  }, { immediate: true })
}

