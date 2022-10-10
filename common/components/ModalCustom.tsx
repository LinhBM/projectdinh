import useGeneralHook from '@common/hook/useGeneralHook'
import { setModal } from '@redux/modalReducer'
import { AppState } from '@redux/store'
import { useSelector } from 'react-redux'
import { createPortal, re } from 'react-dom'
const Z_INDEX = 999
const ModalCustom = () => {
  const { modal } = useSelector((state: AppState) => state)
  const { dispatch } = useGeneralHook()

  const openModal1 = () => {
    dispatch(
      setModal({
        ...modal,
        open: true,
        content: (
          <div className="bg-purple-700 p-10 text-[100px]">Modal COntent 1</div>
        ),
      })
    )
  }

  console.log(modal)

  return (
    <div
      className="fixed top-0 left-0 bottom-0 right-0 h-screen w-screen bg-black "
      style={{ zIndex: Z_INDEX }}
    >
      <button className="btn bg-primary" onClick={openModal1}>
        Open modal 1
      </button>
      {modal.open && (
        <div
          className="fixed top-0 left-0 bottom-0 right-0 h-screen w-screen bg-black "
          style={{ zIndex: Z_INDEX + 1 }}
        >
          <>{createPortal(modal.content)}</>
        </div>
      )}
    </div>
  )
}

export default ModalCustom
