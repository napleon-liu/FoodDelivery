import { configureStore } from '@reduxjs/toolkit'

import userReducer from './modules/user'
import dishReducer from './modules/dish'
import orderReducer from './modules/order'
import otherReducer from './modules/other'

const store = configureStore({
  reducer: {
    user: userReducer,
    dish: dishReducer,
    order: orderReducer,
    other: otherReducer
  }
})

export default store

export type MyDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
