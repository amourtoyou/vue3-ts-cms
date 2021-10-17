import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { GpRequestConfig, GpRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

class GpRequest {
  instance: AxiosInstance
  interceptors?: GpRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance
  constructor(config: GpRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? false
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptor
    )
  }

  request<T>(config: GpRequestConfig<T>): Promise<T> {
    console.log('request', config)

    this.showLoading = config.showLoading ?? false
    return new Promise((resolve, reject) => {
      this.instance.interceptors.request.use((config) => {
        console.log('全局请求拦截器')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: 'loading...'
          })
        }
        return config
      })
      this.instance.interceptors.response.use((config) => {
        console.log('全局响应拦截器')
        setTimeout(() => {
          this.loading?.close()
        }, 3000)
        return config
      })
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = true
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export default GpRequest
