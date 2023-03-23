import { API_BASEURL, CREDENTIALS } from '~~/config'
interface Http {
  credentials: string
  [key: string]: any
}

class Http {
  constructor(credentials: any) {
    this.credentials = credentials
  }

  request(url: string, method: string, options?: any) {
    return new Promise((resolve, reject) => {
      useFetch(url, { method, baseURL: API_BASEURL, ...options }).then(({ data, pending, error }: any) => {
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
          if (data.value) {
            if (data.value.code === 0) {
              const ret = { pending: pending.value, data: data.value.data }
              resolve(ret)
            }
            else {
              // 错误显示, 此处自定义请求出错
              reject(data.value.msg)
            }
          }
        }
      }).catch((err: any) => {
        reject(err)
      })
    })
  }

  get(url: string, params?: any, options?: any) {
    return this.request(url, 'GET', { params, ...options })
  }

  post(url: string, body?: any, options?: any) {
    return this.request(url, 'POST', { body, ...options })
  }

  put(url: string, body?: any, options?: any) {
    return this.request(url, 'PUT', { body, ...options })
  }

  delete(url: string, body?: any, options?: any) {
    return this.request(url, 'DELETE', { body, ...options })
  }
}
const http = new Http(CREDENTIALS)
export default http
