import { useState } from 'react'
import { useMyDispatch } from '@/redux/hook'
import { setUserType, UserType, defaultPage } from '@/redux/modules/user'

import styles from './index.module.scss'
import { useMyNavigate } from '@/utils'

const Identity = () => {
  const [animationPlayState, setAnimationPlayState] = useState('running')
  const navigateTo = useMyNavigate()
  const dispatch = useMyDispatch()

  const userInfoList = [
    { userType: UserType.Customer, content: '顾客', img: 'customer.png' },
    { userType: UserType.Employee, content: '员工', img: 'employee.png' },
    { userType: UserType.Rider, content: '骑手', img: 'rider.png' }
  ]

  const selectIdentity = (userType: UserType) => {
    setAnimationPlayState('paused')
    navigateTo(`/user/${userType}/${defaultPage[userType]}`)
    dispatch(setUserType(userType))
  }
  return (
    <div className={styles.main}>
      <div className={styles.parent} style={{ animationPlayState: animationPlayState }}>
        {userInfoList.map((user, index) => {
          return (
            <div
              key={user.userType}
              className={styles.child}
              onMouseEnter={() => {
                setAnimationPlayState('paused')
              }}
              onMouseLeave={() => {
                setAnimationPlayState('running')
              }}
              onClick={() => {
                selectIdentity(user.userType)
              }}
            >
              <div className={styles.childBox} style={{ animationPlayState: animationPlayState }}>
                <div className={styles.content}>
                  <img src={require('@/assets/image/' + user.img)} alt="" />
                  <div className={styles.value}>
                    <span>{user.content}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Identity
