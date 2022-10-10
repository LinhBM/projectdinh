import Drawer from '@common/components/Drawer'
import MyLink from '@common/components/MyLink'
import Popper from '@common/components/Popper'
import ProgressiveImg from '@common/components/ProgressiveImg'
import ShareModal from '@common/components/ShareModal'
import VideoOptionBox from '@common/components/VideoOptionBox'
import { some } from '@common/constants'
import { formatTimeVideo, formatView } from '@common/helper'
import {
  AddListIcon,
  DownloadIcon,
  MoreIcon,
  ReportIcon,
  ShareIcon,
  StopIcon,
} from '@public/icons'
import { numberFormatter } from '@utility/utils'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { getTimePlay } from './utils'

export const VideoCardHorizontalSkeleton = () => {
  return (
    <div className="w-full animate-pulse ">
      <div className="relative h-[200px] w-full bg-bg2" />
      <div className="flex items-center gap-3 p-3">
        <div className="avatar h-8 w-8 bg-bg2" />
        <div className="flex flex-1 flex-col gap-1">
          <div className="h-4 w-3/4 rounded bg-bg2" />
          <div className="h-4 w-3/5 rounded bg-bg2" />
        </div>
      </div>
    </div>
  )
}

interface Props {
  data: some | any
  setOptionsVideo: (value: some | any) => void
}

const VideoCardHorizontal = (props: Props) => {
  const [openPopper, setOpenPopper] = useState(false)
  const { data } = props
  return (
    <div className="flex min-h-[84px] ">
      <MyLink
        className="flex w-full items-start justify-center gap-3 px-0 pb-1"
        href={{
          pathname: '/video/[[...slug]]',
          query: {
            slug: [data.id, data.slug],
          },
        }}
      >
        <div className="relative  rounded">
          <ProgressiveImg
            src={data.coverImage}
            alt="coverImage"
            className="h-[68px] w-[127px] shrink-0 rounded"
          />
          <div className="caption1 absolute top-[54px] right-1 flex h-[18px] w-[40px] items-center justify-center rounded bg-black  bg-opacity-60 text-xs">
            {formatTimeVideo(data.duration)}
          </div>
        </div>
        <div className="flex-1">
          <p className="caption1 font-bold  line-clamp-2">{data.name}</p>
          <p className="caption1 font-medium text-neutral-500 line-clamp-2">
            {formatView(data.playTimes)}
            <FormattedMessage id="viewNumber" />
          </p>
        </div>
      </MyLink>
      <Popper
        open={openPopper}
        wrapper={
          <button onClick={() => setOpenPopper(true)} className="h-fit">
            <MoreIcon />
          </button>
        }
        onClose={() => setOpenPopper(false)}
        classNamePaper="w-72"
      >
        <VideoOptionBox
          videoData={{
            ...data,
            linkShare: 'https://mui.com/material-ui/react-modal/#main-content',
          }}
          onCloseModal={() => setOpenPopper(false)}
        />
      </Popper>
    </div>
  )
}
export default VideoCardHorizontal
