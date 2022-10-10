import { some } from '@common/constants'
import fetchThunk, { api } from '@common/fetchThunk'
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkAction,
} from '@reduxjs/toolkit'
import { API_PATHS } from '@utility/API_PATH'
import { AppState } from './store'

export interface CommonState {
  openLoginDialog: boolean
  chatAccess: {
    emoji: some[]
    money: some[]
    motion: some[]
    tag: some[]
  }
}

export const initialStateCommon: CommonState = {
  openLoginDialog: false,
  chatAccess: { emoji: [], money: [], motion: [], tag: [] },
}

export function LoadInitialData(): ThunkAction<
  Promise<void>,
  AppState,
  null,
  AnyAction
> {
  return async (dispatch, getState) => {
    const [chatAccessJson] = await Promise.all([
      api({ url: API_PATHS.lives.getChatAccess, method: 'get' }),
    ])
    dispatch(setChatAccess(chatAccessJson?.data?.data))
  }
}

export const commonSlice = createSlice({
  name: 'auth',
  initialState: initialStateCommon,
  reducers: {
    setOpenLoginDialog: (state, action) => {
      state.openLoginDialog = action.payload
    },
    setChatAccess: (state, action) => {
      state.chatAccess = action.payload
    },
  },
})

export const { setChatAccess, setOpenLoginDialog } = commonSlice.actions

export default commonSlice.reducer
