import SnackbarProvider from '@common/components/SnackbarProvider'
import { login } from '@redux/authReducer'
import { AppState } from '@redux/store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Footer from './Footer'
import Header from './Header'

const DefaultLayout = ({ children }) => {
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch()
  const [a, setA] = useState(0)
  const revalidateToken = useCallback(async () => {
    dispatch(
      login({
        captcha: '',
        password: '123123aA@',
        username: 'aladin',
      })
    )
  }, [dispatch])

  useEffect(() => {
    revalidateToken()
  }, [revalidateToken])

  return (
    <>
      <Header />
      {children}
      <SnackbarProvider />
      <Footer />
    </>
  )
}
export default DefaultLayout
