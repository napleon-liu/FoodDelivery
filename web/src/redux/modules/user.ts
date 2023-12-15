import { createSlice } from '@reduxjs/toolkit'

import { setUserInfo as setUser, getUserInfo, removeUserInfo } from '@/utils'
import { getUserInfoApi, loginApi } from '@/apis/user'

export enum UserType {
  Customer = 'customer',
  Employee = 'employee',
  Rider = 'rider',
  Undefined = ''
}

export const role = {
  [UserType.Customer]: 1,
  [UserType.Employee]: 2,
  [UserType.Rider]: 3,
  [UserType.Undefined]: 4
}

export const defaultPage = {
  [UserType.Customer]: 'home',
  [UserType.Employee]: 'dish',
  [UserType.Rider]: 'order',
  [UserType.Undefined]: '404'
}

interface UserState {
  userType: UserType
  token: string
  id: number
  name: string
  account: string
}

const initialState: UserState = {
  userType: (localStorage.getItem('userType') as UserType) || UserType.Undefined,
  token: getUserInfo(['token'])[0] || '',
  id: parseInt(getUserInfo(['id'])[0] || '0'),
  name: getUserInfo(['name'])[0] || '',
  account: getUserInfo(['account'])[0] || ''
}

const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserType: (state, actions) => {
      let userType = actions.payload
      state.userType = userType
      setUser({ userType })
    },
    setUserInfo: (state, actions) => {
      const { token, id, name, account } = actions.payload
      state.token = token
      state.id = id
      state.name = name
      state.account = account

      removeUserInfo()
      setUser({ token, id, userType: state.userType, name, account }, actions.payload.remember)
    },
    logOut: state => {
      state.userType = UserType.Undefined
      state.token = ''
      state.id = 0
      removeUserInfo()
    }
  }
})

const { setUserType, setUserInfo, logOut } = userStore.actions

const login = ({
  user,
  password,
  userType,
  remember
}: {
  user: string
  password: string
  userType: UserType
  remember: boolean
}) => {
  return async (dispatch: any) => {
    const res = await loginApi({ account: user, password, role: role[userType] })

    if (res.status === 200) {
      const [token, id] = ['0721', res.data.Result.userID]

      const res2 = await getUserInfoApi({ id })

      if (res2.status === 200) {
        const { name, account } = res2.data.Result

        dispatch(setUserInfo({ token, id, name, account, remember }))

        return true
      }
      return false
    }
  }
}

export { setUserType, logOut, login }

export default userStore.reducer
