import axios from 'axios'
// import { getUserInfo, removeUserInfo } from './user'
// import router from '@/router'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:23462/elemei/v1',
  timeout: 3000
})

instance.interceptors.request.use(
  function (config) {
    // const token = getUserInfo('token')

    // if (token) {
    //   config.headers.Authorization = `Elemei ${token}`
    // }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // if (error.response.status === 401) {
    //   removeUserInfo()
    //   router.navigate('/enter')
    //   window.location.reload()
    // }

    return error
  }
)

export { instance }
