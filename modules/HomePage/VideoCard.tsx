import Drawer from '@common/components/Drawer'
import MyLink from '@common/components/MyLink'
import Popper from '@common/components/Popper'
import ProgressiveImg from '@common/components/ProgressiveImg'
import ShareModal from '@common/components/ShareModal'
import VideoOptionBox from '@common/components/VideoOptionBox'
import { some } from '@common/constants'
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

export const VideoCardSkeleton = () => {
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

const VideoCard = (props: Props) => {
  const [openPopper, setOpenPopper] = useState(false)
  const { data } = props
  return (
    <div className="w-full">
      <MyLink
        className="w-full"
        href={{
          pathname: '/video/[[...slug]]',
          query: {
            slug: [data.id, data.slug],
          },
        }}
      >
        <div className="relative h-[200px] w-full">
          <ProgressiveImg
            src={data?.coverImage}
            className="h-full w-full rounded-md object-cover"
          />

          <div className="caption1 absolute bottom-2 right-2 h-6 rounded bg-black bg-opacity-60 p-1">
            {getTimePlay(data.duration)}
          </div>
        </div>
      </MyLink>
      <div className="flex gap-3 p-3">
        <ProgressiveImg
          src={data?.channel?.avatarImage}
          isAvatar
          className="avatar h-8 w-8 object-cover"
        />
        <MyLink
          className="w-full"
          href={{
            pathname: '/video/[[...slug]]',
            query: {
              slug: [data.id, data.slug],
            },
          }}
        >
          <div className="flex-1">
            <p className="headline font-bold line-clamp-2">{data.name}</p>
            <span className=" caption1  flex flex-col text-neutral-500">
              <span className="flex-1">
                {data.channel?.name && <>{data.channel.name}</>}
              </span>
              <span className="flex-1">
                {numberFormatter(data.playTimes, 1)}{' '}
                <FormattedMessage id="viewNumber" />
                &nbsp;• &nbsp; {data.publishedTime}
              </span>
            </span>
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
              linkShare:
                'https://mui.com/material-ui/react-modal/#main-content',
            }}
            onCloseModal={() => setOpenPopper(false)}
          />
        </Popper>
        {/* <div onClick={() => setOptionsVideo(data)}>
          <MoreIcon />
        </div> */}
      </div>
    </div>
  )
}
export default VideoCard
