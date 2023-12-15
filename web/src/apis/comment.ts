import { axios } from '@/utils'

export interface Comment {
  content: string
  customerID: number
  orderID: number
  rating: number
}

export const createCommentApi = (data: Comment) => {
  return axios({ method: 'POST', url: '/comment/create', data })
}

export const getCommentApi = (data: { orderID: number }) => {
  return axios({ method: 'POST', url: '/comment/all', data })
}
