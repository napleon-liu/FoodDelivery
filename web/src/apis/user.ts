import { axios } from '@/utils'

export const registerApi = (data: {}) => {
  return axios({
    method: 'POST',
    url: '/user/register',
    data
  })
}

export const loginApi = (data: {}) => {
  return axios({
    method: 'POST',
    url: '/user/login',
    data
  })
}

export const getUserInfoApi = (data: { id: number }) => {
  return axios({ method: 'POST', url: '/user/detail', data })
}
