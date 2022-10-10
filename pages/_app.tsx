import ConnectedIntlProvider from '@common/intl/ConnectedIntlProvider'
import DefaultLayout from '@layout/DefaultLayout'
import { persistor, store } from '@redux/store'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import '../styles/globals.css'
import '../styles/tailwind.css'
import '../styles/video.css'
import '../styles/banner.css'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const MyApp = (props) => {
  const { Component, pageProps } = props
  const Layout = Component.Layout || EmptyLayout

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Layout>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedIntlProvider>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
            <ToastContainer
              position="bottom-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ConnectedIntlProvider>
        </PersistGate>
      </Provider>
    </Layout>
  )
}

export default MyApp

const EmptyLayout = ({ children }) => <>{children}</>

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return {
    ...pageProps,
  }
}
