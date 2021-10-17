import axios, { AxiosResponse } from 'axios'

// axios.get('http://www.baidu.com').then((res: AxiosResponse) => console.log(res))

axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 1000

axios.interceptors.request.use((config) => {
  console.log(config)

  return config
})

axios
  .get('/get', { params: { name: 13 } })
  .then((res: AxiosResponse) => console.log(res))
