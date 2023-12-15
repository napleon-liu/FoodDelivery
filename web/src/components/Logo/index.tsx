import { useMyDispatch, useMySelector } from '@/redux/hook'
import { UserType, defaultPage, logOut } from '@/redux/modules/user'
import { useMyNavigate } from '@/utils'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Logo = ({ className = '', style = {} }: { className?: string; style?: {} }) => {
  const { userType, token } = useMySelector(state => state.user)
  const dispatch = useMyDispatch()
  const path = useLocation().pathname
  const [to, setTo] = useState('')
  const navigateTo = useMyNavigate()

  useEffect(() => {
    if ((path.includes('login') || path.includes('register')) && userType !== UserType.Customer) {
      setTo('/')
    } else {
      setTo(`/user/${userType}/${defaultPage[userType]}`)
    }
  }, [path, dispatch, userType])

  const handleClick = () => {
    token === '' && dispatch(logOut())
    navigateTo(to)
  }

  return (
    <div className={classNames(className, 'logo')} style={style}>
      <img src={require('@/assets/logo.png')} alt="123" onClick={handleClick} />
    </div>
  )
}

export default Logo
