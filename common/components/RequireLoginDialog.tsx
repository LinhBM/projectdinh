import useGeneralHook from '@common/hook/useGeneralHook'
import { setOpenLoginDialog } from '@redux/commonReducer'
import { ROUTES } from '@utility/constant'
import { FormattedMessage } from 'react-intl'
import Modal from './Modal'

interface Props {
  open?: boolean
  onClose?: (value: boolean) => void
}
const RequireLoginDialog = (props: Props) => {
  const { open, onClose } = props
  const { appState, dispatch, router } = useGeneralHook()
  return (
    <>
      <Modal
        open={open || appState.common.openLoginDialog}
        onClose={() => {
          onClose && onClose(false)
          dispatch(setOpenLoginDialog(false))
        }}
      >
        <div className="p-8 text-center">
          <p className="title font-bold">
            <FormattedMessage id="notify" />
          </p>
          <p className="mx-auto mt-4 mb-6 w-52 text-neutral-500">
            <FormattedMessage id="requireLogin" />
          </p>
          <div className="flex gap-4">
            <button
              className="btn headline w-full font-bold"
              onClick={() => {
                onClose && onClose(false)
                dispatch(setOpenLoginDialog(false))
              }}
            >
              <FormattedMessage id="pass" />
            </button>
            <button
              className="btn-container headline w-full font-bold"
              onClick={() => {
                dispatch(setOpenLoginDialog(false))
                router.push({ pathname: ROUTES.login })
              }}
            >
              <FormattedMessage id="login" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default RequireLoginDialog
