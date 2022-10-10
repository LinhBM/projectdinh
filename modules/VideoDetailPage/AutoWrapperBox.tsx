import ProgressiveImg from '@common/components/ProgressiveImg'
import { some } from '@common/constants'
import { formatTimeVideo, formatView } from '@common/helper'
import { CloseIcon } from '@public/icons'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

interface Props {
  open: boolean
  onClose: (value: boolean) => void
  data?: some
}
const AutoWrapperBox = (props: Props) => {
  const { data, onClose, open } = props
  const { push } = useRouter()
  const [time, setTime] = useState(0)

  const ref = useRef<any>(null)

  useEffect(() => {
    ref.current = setInterval(() => {
      setTime((old) => old + 1)
    }, 1000)
    return () => {
      ref.current && clearInterval(ref.current)
    }
  }, [data?.id, data?.slug, open])

  useEffect(() => {
    if (time >= 7) {
      ref.current && clearInterval(ref.current)
      onClose(false)
      push({
        query: {
          id: data?.id,
          slug: data?.slug,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])
  useEffect(() => {
    if (!open) {
      ref.current && clearInterval(ref.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  if (!open) {
    return null
  }
  return (
    <div className="absolute inset-0 bg-bg2 p-3">
      <div className="flex justify-between">
        <p className="caption1 text-neutral-400">
          <FormattedMessage id="forwardIn" />
          &nbsp;<span className="text-white">{7 - time}</span>
        </p>
        <button className="text-white" onClick={() => onClose(false)}>
          <CloseIcon />
        </button>
      </div>
      <div className="mt-6 flex gap-3">
        <div className="relative">
          <ProgressiveImg
            src={data?.coverImage}
            alt="coverImage"
            className="h-20 w-[150px] shrink-0"
          />
          <div className="caption1 absolute bottom-2 right-2 rounded bg-black bg-opacity-60 px-1 py-0.5">
            {formatTimeVideo(data?.duration)}
          </div>
        </div>
        <div className="relative">
          <p className="caption1 font-bold">{data?.name}</p>
          <p className="caption1 mt-1 text-neutral-300">
            {formatView(data?.playTimes || 0)}
            &nbsp;
            <FormattedMessage id="viewNumber" />
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        <button className="btn w-full" onClick={() => onClose(false)}>
          <FormattedMessage id="cancel" />
        </button>
        <button
          className="btn-container w-full"
          onClick={() => {
            ref.current && clearInterval(ref.current)
            onClose(false)
            push({
              query: {
                id: data?.id,
                slug: data?.slug,
              },
            })
          }}
        >
          <FormattedMessage id="playNow" />
        </button>
      </div>
    </div>
  )
}
export default AutoWrapperBox
