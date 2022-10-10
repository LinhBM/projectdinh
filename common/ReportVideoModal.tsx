import api from '@common/api'
import Modal from '@common/components/Modal'
import Radio from '@common/components/Radio'
import { VideoObject } from '@common/constants'
import useGeneralHook from '@common/hook/useGeneralHook'
import { CloseIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
interface Props {
  data?: VideoObject
  open: boolean
  onClose: (val: boolean) => void
  setMessage: (val: any) => void
}

const ReportVideoModal = (props: Props) => {
  const { data, open, onClose, setMessage } = props
  const { appState } = useGeneralHook()
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
    <Modal
      open={open}
      onClose={onClose}
      className="w-full min-w-[480px] max-w-sm"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <div className="title font-bold">
          <FormattedMessage id="reportVideo" />
        </div>
        <button onClick={() => onClose(false)}>
          <CloseIcon />
        </button>
      </div>
      <div className="px-6">
        {appState.auth.setting?.feedBack?.map((item) => {
          const checked = selected?.id === item.id
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 py-3"
              onClick={() => {
                setSelected(item)
              }}
            >
              <Radio checked={checked} />
              <p>{item.name}</p>
            </div>
          )
        })}
      </div>
      <div className="divider" />
      <div className="px-6">
        <p className="mt-4 mb-9 text-neutral-500">
          <FormattedMessage
            id="reportNote"
            values={{
              note: (
                <span className="text-primary">
                  <FormattedMessage id="followInstructions" />
                </span>
              ),
            }}
          />
        </p>
        <div className="flex justify-end gap-4">
          <button className="btn w-40" onClick={() => onClose(false)}>
            <FormattedMessage id="cancel" />
          </button>
          <button className="btn-container w-40" onClick={onSubmit}>
            <FormattedMessage id="report" />
          </button>
        </div>
      </div>
      F
    </Modal>
  )
}
export default ReportVideoModal
