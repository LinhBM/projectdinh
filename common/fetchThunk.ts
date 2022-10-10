import { setOpenLoginDialog } from '@redux/commonReducer'
import { AppState } from '@redux/store'
import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { TOKEN } from '@utility/constant'
import axios, { AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const request = axios.create({
  headers: {
    'accept-language': 'vi',
    'Content-Type': 'application/json',
  },
  method: 'get',
})

export const api = (options: AxiosRequestConfig) => {
  return request(options)
}
function fetchThunk(
  options: AxiosRequestConfig,
  requireLogin?: boolean
): ThunkAction<Promise<any>, AppState, null, AnyAction> {
  return async (dispatch, getState) => {
    const isLogin = getState().auth.isLogin
    const loading = getState().auth.loading
    if (requireLogin && !isLogin) {
      dispatch(setOpenLoginDialog(true))
      return {}
    }
    do {
      await new Promise((resolve) => setTimeout(resolve, 250))
      if (!getState().auth.loading || isLogin) {
        break
      }
    } while (loading && requireLogin)

    try {
      const json = await api({
        ...options,
        headers: {
          Authorization: `Bearer ${Cookies.get(TOKEN)}`,
          ...options.headers,
        },
      })
      return json || {}
    } catch (e: any) {
      if (e.response.status === 401 && requireLogin) {
        dispatch(setOpenLoginDialog(true))
      }
      throw e
    }
  }
}

export default fetchThunk
