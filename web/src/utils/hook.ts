import { useMyDispatch } from '@/redux/hook'
import { setSpinning } from '@/redux/modules/other'
import { useNavigate } from 'react-router-dom'

export const useMyNavigate = () => {
  const navigateTo = useNavigate()
  const dispatch = useMyDispatch()
  return async (to: string, func?: () => void, message: boolean = false) => {
    if (func && message) {
      await func()
    }
    dispatch(setSpinning(true))
    setTimeout(async () => {
      dispatch(setSpinning(false))
      if (func && !message) {
        await func()
      }
      setTimeout(() => navigateTo(to), 250)
    }, 250)
  }
}
