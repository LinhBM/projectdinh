import { some } from '@common/constants'
import fetchThunk, { api } from '@common/fetchThunk'
import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  ThunkAction,
} from '@reduxjs/toolkit'
import { API_PATHS } from '@utility/API_PATH'
import { TOKEN } from '@utility/constant'
import { parseJwt } from '@utility/utils'
import Cookies from 'js-cookie'
import { LoadInitialData } from './commonReducer'
import { AppState } from './store'

interface SettingState {
  quality: { id: string; name: string }[]
  feedBack: { id: string; name: string }[]
}
export interface AuthState {
  isLogin: boolean
  loading: boolean
  userData?:
    | {
        id: number
        avatar: string
        user: []
      }
    | some
  profile?: some
  setting?: SettingState
}

export const initialStateAuth: AuthState = {
  isLogin: false,
  loading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    authIn: (state) => {
      state.isLogin = true
    },
    authOut: (state) => {
      state.isLogin = false
    },
    setConfigPage: (state, action) => {
      state.setting = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setProfileData: (state, action) => {
      state.profile = action.payload
    },
  },
})

export const {
  authIn,
  authOut,
  setLoading,
  setConfigPage,
  setProfileData,
  setUserData,
} = authSlice.actions

export function login(
  data: some
): ThunkAction<Promise<some>, AppState, null, AnyAction> {
  return async (dispatch, getState) => {
    dispatch(LoadInitialData())
    dispatch(setLoading(true))
    const json = await api({
      url: API_PATHS.login,
      method: 'post',
      data,
    })
    dispatch(setLoading(false))
    if (json?.data?.token) {
      Cookies.set(TOKEN, json.data.token)
      const tokenInfo = parseJwt(json.data.token)
      dispatch(
        setUserData({user: json.config.data,
          ...json.data,
          id: tokenInfo?.sub,
          avatar: tokenInfo?.context?.avatar,
        })
      )
      const json2 = await api({
        url: API_PATHS.user.getSettings,
      })
      dispatch(setConfigPage(json2.data?.data))
      const profileJson = await dispatch(
        fetchThunk({
          url: API_PATHS.user.profile,
        })
      )
      dispatch(setProfileData(profileJson.data?.data))
      dispatch(authIn())
    }
    return json
  }
}

export default authSlice.reducer
