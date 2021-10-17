import GpRequest from './request'

const gpRequest = new GpRequest({
  baseURL: '',
  timeout: 1000,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => err,
    responseInterceptor: (config) => {
      return config
    }
  }
})

export default gpRequest
