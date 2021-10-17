import { createApp } from 'vue'
import Apps from './App.vue'
import gpRequest from './service'

import { registerApp } from './global'
import './service/axios_demo'

import router from './router'
import store from './store'

const app = createApp(Apps)
//注册elemnt组件
app.use(registerApp)
app.use(router).use(store).mount('#app')

interface resDataType {
  args: any
  headers: any
  origin: any
  url: string
}

import type { AxiosResponse } from 'axios'

gpRequest
  .request<AxiosResponse>({
    url: 'http://httpbin.org/get',
    params: { name: 12, age: 123 },
    showLoading: true,
    interceptors: {
      responseInterceptor<AxiosResponse>(config) {
        return config
      }
    }
  })
  .then((res) => {
    console.log(res.data)
  })

async function setTime() {
  // return await Promise.all([
  //   gpRequest.request({
  //     url: 'http://httpbin.org/get',
  //     params: { name: 'coderwehy', age: 123 }
  //   }),
  //   Promise.reject('error')
  // ])
  return await gpRequest.request({
    url: 'http://httpbin.org/get',
    params: { name: 'coderwehy', age: 123 }
  })
}

setTime()
  .then((res) => {
    console.log('then', res)
  })
  .catch((err) => {
    console.log('err', err)
  })
