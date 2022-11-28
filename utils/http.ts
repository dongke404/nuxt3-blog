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

  request(url: string, method: string, isLazy: number, params: any) {
    return new Promise((resolve, reject) => {
      fetchMap[isLazy](this.baseUrl + url, { method, params }).then(({ pending, data, error }: any) => {
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
                const ret = { pending, data: data.value.data }
                resolve(ret)
              }
              else {
                // 错误显示
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

  get(url: string, params?: any, isLazy?: boolean) {
    if (isLazy)
      return this.request(url, 'GET', 1, params)
    else
      return this.request(url, 'GET', 0, params)
  }

  post(url: string, body?: any, isLazy?: boolean) {
    if (isLazy)
      return this.request(url, 'POST', 1, body)
    else
      return this.request(url, 'POST', 0, body)
  }

  put(url: string, body?: any, isLazy?: boolean) {
    if (isLazy)
      return this.request(url, 'PUT', 1, body)
    else
      return this.request(url, 'PUT', 0, body)
  }

  delete(url: string, body?: any, isLazy?: boolean) {
    if (isLazy)
      return this.request(url, 'DELETE', 1, body)
    else
      return this.request(url, 'DELETE', 0, body)
  }
}

const http = new Http('http://localhost:5000/api', 'include')

export default http
