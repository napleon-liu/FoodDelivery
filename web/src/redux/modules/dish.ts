import { createSlice } from '@reduxjs/toolkit'

import { createDishApi, deleteDishApi, getDishListApi, updateDishApi } from '@/apis/dish'

export interface Dish {
  id: number
  name: string
  pictureURL: string
  price: number
  description: string
}

interface DishState {
  dishList: Dish[]
}

const initialState: DishState = { dishList: [] }

const dishStore = createSlice({
  name: 'dish',
  initialState,
  reducers: {
    setDishList: (state, actions) => {
      const dishList = actions.payload
      if (JSON.stringify(state.dishList) !== JSON.stringify(dishList)) {
        state.dishList = dishList
      }
    }
  }
})

const { setDishList } = dishStore.actions

const getDishList = () => {
  return async (dispatch: any) => {
    const res = await getDishListApi()

    if (res.status === 200) {
      const dishList = res.data.Result
      dispatch(setDishList(dishList))
    }
  }
}

const deleteDish = (ids: number[]) => {
  return async (dispatch: any) => {
    const res = await deleteDishApi(ids)

    if (res.status === 200) {
      return true
    } else {
      return false
    }
  }
}

const updateDishList = (dish: Dish) => {
  return async (dispatch: any) => {
    let res
    if (dish.id) {
      res = await updateDishApi(dish)
    } else {
      res = await createDishApi(dish)
    }

    if (res.status === 200) {
      return true
    } else {
      return false
    }
  }
}

export { getDishList, deleteDish, updateDishList }

export default dishStore.reducer
