import { UserType, role as _role } from '@/redux/modules/user'
import { axios, getUserInfo } from '@/utils'

export interface OrderReq {
  customerID: number
  destination: string
  orderItemList: { dishID: number }[]
  price: number
}

export const createOrderApi = (data: OrderReq) => {
  return axios({ method: 'POST', url: '/order/create', data })
}

export const getOrderByUserIDApi = () => {
  const [id, userType] = getUserInfo(['id', 'userType'])

  const userID = +id
  const role = +_role[userType as UserType]

  return axios({
    method: 'POST',
    url: '/order/orderListByUserID',
    data: { role, userID }
  })
}

export const getOrderByStatusApi = (status: number[]) => {
  const [userType] = getUserInfo(['userType'])

  const role = +_role[userType as UserType]

  return axios({
    method: 'POST',
    url: '/order/orderListByStatus',
    data: { role, status }
  })
}

export const updateOrderStatusApi = (orderID: number, status: number) => {
  const [userType, id] = getUserInfo(['userType', 'id'])

  const role = +_role[userType as UserType]

  return axios({
    method: 'PUT',
    url: '/order/update',
    data: { role, userID: +id, orderID, status }
  })
}
