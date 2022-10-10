import { setMessage } from '@redux/snackbarReducer'
import { AppState } from '@redux/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'

const useGeneralHook = () => {
  const router = useRouter()
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch()
  const appState = useSelector((state: AppState) => state)
  const intl = useIntl()
  return {
    intl,
    appState,
    dispatch,
    router,
    setMessage: (value: { message: any; className?: string }) =>
      dispatch(setMessage(value)),
    isLogin: appState.auth.isLogin,
  }
}

export default useGeneralHook
