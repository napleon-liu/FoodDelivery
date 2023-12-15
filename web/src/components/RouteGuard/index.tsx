import { useMySelector } from '@/redux/hook'
import { UserType, defaultPage } from '@/redux/modules/user'
import { Navigate } from 'react-router-dom'

const RouteGuard = ({ children }: { children?: React.ReactNode }) => {
  const { userType, token } = useMySelector(state => state.user)

  if (userType === UserType.Undefined) {
    return <Navigate to={'/enter'} />
  }

  if (token === '') {
    if (userType !== UserType.Customer) {
      return <Navigate to={'/login'} />
    }
  }

  if (children) {
    return <>{children}</>
  }

  return <Navigate to={`/user/${userType}/${defaultPage[userType]}`} />
}

export default RouteGuard
