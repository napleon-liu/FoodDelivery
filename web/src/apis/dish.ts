import { axios } from '@/utils'

import { Dish } from '@/redux/modules/dish'

export const getDishListApi = () => {
  return axios({ method: 'POST', url: '/dish/all' })
}

export const deleteDishApi = (ids: number[]) => {
  return axios({ method: 'DELETE', url: '/dish/delete', data: { ids } })
}

export const updateDishApi = (dish: Dish) => {
  return axios({ method: 'PUT', url: '/dish/update', data: dish })
}

export const createDishApi = (dish: Dish) => {
  const { id, ...data } = dish

  return axios({ method: 'POST', url: '/dish/create', data })
}
