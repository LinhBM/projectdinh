import api from '@common/api'
import DrawerFullScreen from '@common/components/DrawerFullScreen'
import Radio from '@common/components/Radio'
import { VideoObject } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { API_PATHS } from '@utility/API_PATH'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
interface Props {
  data?: VideoObject
  open: boolean
  onClose: (val: boolean) => void
}

const DrawerReportVideo = (props: Props) => {
  const { data, open, onClose } = props
  const { appState, setMessage, dispatch, isLogin } = useGeneralHook()
  const [selected, setSelected] = useState<any>()

  const onSubmit = async () => {
    if (selected) {
      try {
        const json = await api({
          url: API_PATHS.user.feedBack,
          method: 'POST',
          data: {
            item_id: data?.id,
            content: data?.name,
            type: data?.type,
            id: selected?.id,
          },
        })

        setMessage({
          message: 'Gửi thông báo lỗi thành công',
        })
        onClose(false)
      } catch (e: any) {
        if (e.response) {
          setMessage({ message: e.response?.data?.message })
          onClose(false)
        }
      }
    }
  }

  useEffect(() => {
    setSelected(undefined)
  }, [open])

  return (
    <DrawerFullScreen open={open} onClose={onClose}>
      <div
        className="flex h-6 items-center justify-center md:hidden"
        onClick={() => onClose && onClose(false)}
      >
        <div className="h-1 w-8 shrink-0 rounded bg-neutral-200" />
      </div>
      <div className="title p-3 font-bold">
        <FormattedMessage id="reportVideo" />
      </div>
      {appState.auth.setting?.feedBack?.map((item) => {
        const checked = selected?.id === item.id
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3"
            onClick={() => {
              setSelected(item)
            }}
          >
            <Radio checked={checked} />
            <p>{item.name}</p>
          </div>
        )
      })}
      <div className="flex gap-4 p-4 ">
        <button className="btn w-full" onClick={() => onClose(false)}>
          <FormattedMessage id="cancel" />
        </button>
        <button className="btn-container w-full" onClick={onSubmit}>
          <FormattedMessage id="send" />
        </button>
      </div>
    </DrawerFullScreen>
  )
}
export default DrawerReportVideo
