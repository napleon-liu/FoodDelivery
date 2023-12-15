import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { MyDispatch, RootState } from './index'

export const useMySelector: TypedUseSelectorHook<RootState> = useSelector
export const useMyDispatch: () => MyDispatch = useDispatch
