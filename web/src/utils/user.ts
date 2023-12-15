import { UserType } from '@/redux/modules/user'

interface UserInfo {
  ['token']?: string
  ['id']?: number
  ['userType']?: UserType
  ['name']?: string
  ['account']?: string
}
const userInfoName: (keyof UserInfo)[] = ['token', 'id', 'userType', 'name', 'account']

export const setUserInfo = (userInfo: UserInfo, remember: boolean = false) => {
  if (remember) {
    userInfoName.forEach(key => {
      if (userInfo[key]) {
        localStorage.setItem(key, userInfo[key] + '')
      }
    })
  } else {
    userInfoName.forEach(key => {
      if (userInfo[key]) {
        sessionStorage.setItem(key, userInfo[key] + '')
      }
    })
  }
}

export const getUserInfo = (keys: string[]) => {
  return keys.map(key => {
    return sessionStorage.getItem(key) || localStorage.getItem(key) || ''
  })
}

export const removeUserInfo = () => {
  userInfoName.forEach(key => {
    sessionStorage.removeItem(key)
    localStorage.removeItem(key)
  })
}
