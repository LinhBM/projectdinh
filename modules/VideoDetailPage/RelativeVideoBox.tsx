import { some, VideoObject } from '@common/constants'
import { VideoCardSkeleton } from '@modules/HomePage/VideoCard'
import VideoCardHorizontal from '@modules/HomePage/VideoCardHorizontal'
import { LoadingIcon } from '@public/icons'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { AUTO_PLAY } from './constants'

interface Props {
  data: some[]
  loading: boolean
  size: number
}

const RelativeVideoBox = (props: Props) => {
  const { size, data, loading } = props
  const [optionsVideo, setOptionsVideo] = useState<VideoObject | undefined>()
  const [autoPlay, setAutoPlay] = useState(false)

  useEffect(() => {
    setAutoPlay(localStorage.getItem(AUTO_PLAY) === 'true')
  }, [])

  return (
    <div className="flex flex-col gap-4 px-3 pb-2 pt-2">
      <div className="flex justify-between">
        <p className="title font-bold line-clamp-1">
          <FormattedMessage id="next" />
        </p>
        <div className="caption1 flex gap-2">
          <FormattedMessage id="autoPlay" />
          <label
            htmlFor="default-toggle"
            className="relative inline-flex cursor-pointer items-center"
          >
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(e) => {
                setAutoPlay(e.target.checked)
                localStorage.setItem('AUTO_PLAY', e.target.checked.toString())
              }}
              id="default-toggle"
              className="peer sr-only"
            />
            <div className="peer-focus:ring-blue-300 peer h-6 w-11 rounded-full bg-neutral-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full  "></div>
          </label>
        </div>
      </div>
      <div className="max scrollbar-y flex h-full flex-col ">
        {data?.map((item) => {
          return (
            <VideoCardHorizontal
              key={item.id}
              data={item}
              setOptionsVideo={setOptionsVideo}
            ></VideoCardHorizontal>
          )
        })}
      </div>

      {loading &&
        (size === 1 ? (
          <VideoCardSkeleton />
        ) : (
          <div className="flex h-[264px] items-center justify-center">
            <LoadingIcon className="h-10 animate-spin" />
          </div>
        ))}
    </div>
  )
}

export default RelativeVideoBox
