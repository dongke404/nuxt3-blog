import { API_BASEURL, CREDENTIALS } from '~~/config'
interface Http {
  baseUrl: string
  credentials: string
  [key: string]: any
}

const fetchMap: any = {
  0: useFetch,
  1: useLazyFetch,
}
class Http {
  constructor(baseUrl: any, credentials: any) {
    this.baseUrl = baseUrl
    this.credentials = credentials
  }

  request(url: string, method: string, isLazy: number, params: any, options?: any) {
    return new Promise((resolve, reject) => {
      const paramsObj = { method, ...options }
      if (method === 'GET')
        paramsObj.params = params
      else
        paramsObj.body = params
      fetchMap[isLazy](this.baseUrl + url, paramsObj).then(({ data, pending, error }: any) => {
        if (error.value) {
          // 此处根据状态码进行处理
          reject(error.value)
          switch (error.value.statusCode) {
            case 403:
              // 无权限
              break
          }
        }
        else {
          if (isLazy) {
            const ret = { pending, data }
            resolve(ret)
          }
          else {
            if (data.value) {
              if (data.value.code === 0) {
                const ret = { pending, data: ref(data.value.data) }
                resolve(ret)
              }
              else {
                // 错误显示, 此处自定义请求出错
                reject(data.value.msg)
              }
            }
          }
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  get(url: string, params?: any, options?: any) {
    return this.request(url, 'GET', 0, params, options)
  }

  getLazy(url: string, params?: any, options?: any) {
    return this.request(url, 'GET', 1, params, options)
  }

  post(url: string, body?: any, options?: any) {
    return this.request(url, 'POST', 0, body, options)
  }

  postLazy(url: string, body?: any, options?: any) {
    return this.request(url, 'POST', 1, body, options)
  }

  put(url: string, body?: any, options?: any) {
    return this.request(url, 'PUT', 0, body, options)
  }

  putLazy(url: string, body?: any, options?: any) {
    return this.request(url, 'PUT', 1, body, options)
  }

  delete(url: string, body?: any, options?: any) {
    return this.request(url, 'DELETE', 0, body, options)
  }

  deleteLazy(url: string, body?: any, options?: any) {
    return this.request(url, 'DELETE', 1, body, options)
  }
}
const http = new Http(API_BASEURL, CREDENTIALS)
export default http
