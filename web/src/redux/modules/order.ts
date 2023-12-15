import { getOrderByStatusApi, getOrderByUserIDApi } from '@/apis/order'
import { createSlice } from '@reduxjs/toolkit'
import { Dish } from './dish'

export interface OrderItem {
  [id: number]: number
}
export enum OrderStatus {
  Created = 1,
  CreatedConfirmed,
  DeliveryApplied,
  DeliveryApplicationConfirmed,
  DeliveryFinished,
  DeliveryFinishConfirmed,
  Commented
}

const orderStatusKeys = Object.keys(OrderStatus).slice(0, Object.keys(OrderStatus).length / 2)

// const orderStatusLength = orderStatusKeys.length

export interface OrderInfo {
  id: number
  createTime: string
  updateTime: string
  destination: string
  price: number
  status: number
  customerID: number
  employeeID: number
  riderID: number
  dishRespList: Dish[]
}

interface OrderState {
  orderItemDict: OrderItem
  orderList: OrderInfo[][]
  orderShown: OrderInfo
}

const initialState: OrderState = {
  orderItemDict: {},
  orderList: orderStatusKeys.map(() => []),
  orderShown: {} as OrderInfo
}

const orderStore = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderItemDict: (state, actions) => {
      const [id, num] = actions.payload as number[]
      state.orderItemDict[id] = num > 0 ? num : 0
    },
    clearOrderItems: state => {
      state.orderItemDict = {}
    },
    setOrderList: (state, actions) => {
      const orderList = actions.payload

      if (JSON.stringify(orderList) !== JSON.stringify(state.orderList)) {
        state.orderList = orderList
      }
    },
    setOrderShown: (state, actions) => {
      state.orderShown = actions.payload
    }
  }
})

const { setOrderItemDict, clearOrderItems, setOrderList, setOrderShown } = orderStore.actions

const getOrderListByUserID = () => {
  return async (dispatch: any) => {
    const orderList: OrderInfo[][] = orderStatusKeys.map(() => [])
    const res = await getOrderByUserIDApi()

    if (res.status === 200) {
      const orderInfoList = res.data.Result.orderList
      orderInfoList &&
        orderInfoList.forEach((orderInfo: any) => {
          const { id, destination, price, status, customerID, employeeID, dishRespList } = orderInfo
          const order: OrderInfo = {
            id,
            destination,
            price,
            status,
            customerID,
            employeeID,
            riderID: orderInfo.deliverymanID,
            dishRespList,
            createTime: orderInfo.createAt,
            updateTime: orderInfo.updateAt
          }

          orderList[status - 1].push(order)
        })

      dispatch(setOrderList(orderList))

      // or
    } else {
    }
  }
}

const getOrderListByStatuses = () => {
  return async (dispatch: any) => {
    const orderList: OrderInfo[][] = orderStatusKeys.map(() => [])

    const res = await getOrderByStatusApi(orderStatusKeys.map(key => +key))

    if (res.status === 200) {
      const orderInfoList = res.data.Result.orderList
      orderInfoList !== null &&
        orderInfoList.forEach((orderInfo: any) => {
          const { id, destination, price, status, customerID, employeeID, dishRespList } = orderInfo
          const order: OrderInfo = {
            id,
            destination,
            price,
            status,
            customerID,
            employeeID,
            riderID: orderInfo.deliverymanID,
            dishRespList,
            createTime: orderInfo.createAt,
            updateTime: orderInfo.updateAt
          }

          orderList[status - 1].push(order)
        })

      // or
    } else {
    }

    dispatch(setOrderList(orderList))
  }
}

const getOrderListForRider = () => {
  return async (dispatch: any) => {
    const orderList: OrderInfo[][] = orderStatusKeys.map(() => [])

    const res1 = await getOrderByStatusApi([OrderStatus.DeliveryApplied])

    if (res1.status === 200) {
      const orderInfoList = res1.data.Result.orderList
      orderInfoList !== null &&
        orderInfoList.forEach((orderInfo: any) => {
          const { id, destination, price, status, customerID, employeeID, dishRespList } = orderInfo
          const order: OrderInfo = {
            id,
            destination,
            price,
            status,
            customerID,
            employeeID,
            riderID: orderInfo.deliverymanID,
            dishRespList,
            createTime: orderInfo.createAt,
            updateTime: orderInfo.updateAt
          }

          orderList[status - 1].push(order)
        })

      // or
    } else {
      return
    }

    const res2 = await getOrderByUserIDApi()

    if (res2.status === 200) {
      const orderInfoList = res2.data.Result.orderList

      orderInfoList !== null &&
        orderInfoList.forEach((orderInfo: any) => {
          const { id, destination, price, status, customerID, employeeID, dishRespList } = orderInfo
          const order: OrderInfo = {
            id,
            destination,
            price,
            status,
            customerID,
            employeeID,
            riderID: orderInfo.deliverymanID,
            dishRespList,
            createTime: orderInfo.createAt,
            updateTime: orderInfo.updateAt
          }

          if (orderList[status - 1].findIndex(o => o.id === order.id) === -1) {
            orderList[status - 1].push(order)
          }
        })

      // or
    } else {
    }

    dispatch(setOrderList(orderList))
  }
}

export {
  setOrderItemDict,
  clearOrderItems,
  getOrderListByUserID,
  getOrderListByStatuses,
  getOrderListForRider,
  setOrderShown
}

export default orderStore.reducer
