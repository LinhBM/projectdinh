import MyLink from '@common/components/MyLink'
import Popper from '@common/components/Popper'
import ProgressiveImg from '@common/components/ProgressiveImg'
import { some } from '@common/constants'
import { MoreIcon } from '@public/icons'
import { FormattedMessage } from 'react-intl'
import { formatView, getTimePlay } from '../ultils'
import { useState } from 'react'
import VideoOptionBox from '@common/components/VideoOptionBox'

export const VideoCardSkeleton = () => {
  return (
    <div className="gap flex animate-pulse flex-row rounded-sm">
      <div className=" mx-3 h-20 w-5/12 rounded-md bg-bg2" />
      <div className="w-1/2">
        <div className="flex gap-4 p-2">
          <div className="flex flex-1 flex-col gap-2">
            <div className="avatar h-2.5 w-3/4 bg-bg2" />
            <div className="avatar h-2.5 w-3/4 bg-bg2" />
            <div className="avatar h-2.5 w-3/5 bg-bg2" />
          </div>
        </div>
      </div>
    </div>
  )
}
interface Props {
  data: some
}

const VideoCard = (props: Props) => {
  const { data } = props
  console.log(data, 'data')

  const [openPopper, setOpenPopper] = useState(false)

  return (
    <div className="max-w-52 flex flex-col">
      <MyLink
        href={{
          pathname: '/video/[...slug]',
          query: {
            slug: [data.id, data.slug],
          },
        }}
        className="min-h-48 w-full"
      >
        <div className="relative h-full w-full">
          <ProgressiveImg
            src={data?.coverImage}
            className="h-48 w-full rounded object-cover"
          />
          <div className="caption1 absolute bottom-2 right-2 rounded bg-black bg-opacity-60 px-1 py-0.5">
            {getTimePlay(data.duration)}
          </div>
        </div>
      </MyLink>
      <div className="flex gap-2 p-3 ">
        <div className="flex-1">
          <MyLink
            href={{
              pathname: '/video/[[...slug]]',
              query: {
                slug: [data.id, data.slug],
              },
            }}
          >
            <div className="flex gap-3">
              <ProgressiveImg
                src={data.channel?.avatarImage}
                alt="avatarImage"
                className="avatar h-8 w-8 shrink-0"
              />
              <div className="flex-1">
                <p className="body headline font-bold  line-clamp-2">
                  {data.name}
                </p>
                <p className="caption1 text-neutral-500  line-clamp-1">
                  {data.channel?.name && <>{data.channel?.name}</>}
                </p>
                <p className="caption1 text-neutral-500">
                  {formatView(data.playTimes)}
                  <FormattedMessage id="view" />
                  &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{data.publishedTime}
                </p>
              </div>
            </div>
          </MyLink>
        </div>
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
      </div>
    </div>
  )
}

export default VideoCard
