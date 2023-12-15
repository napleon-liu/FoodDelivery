import { createSlice } from '@reduxjs/toolkit'

interface OtherState {
  spinning: boolean
  keyword: string
}

const initialState: OtherState = { spinning: false, keyword: '' }

const otherStore = createSlice({
  name: 'other',
  initialState,
  reducers: {
    setSpinning: (state, actions) => {
      state.spinning = actions.payload
    },
    setKeyword: (state, actions) => {
      state.keyword = actions.payload
    }
  }
})

export const { setSpinning, setKeyword } = otherStore.actions

export default otherStore.reducer
