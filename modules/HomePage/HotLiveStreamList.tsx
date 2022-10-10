import api from '@common/api'
import MyLink from '@common/components/MyLink'
import Popper from '@common/components/Popper'
import ProgressiveImg from '@common/components/ProgressiveImg'
import VideoOptionBox from '@common/components/VideoOptionBox'
import { some } from '@common/constants'
import { LiveIcon, LoadingIcon, MoreIcon, ViewIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import useSWRInfinite from 'swr/infinite'

const VideoCard = ({ data }) => {
  const [openPopper, setOpenPopper] = useState(false)

  return (
    <>
      <div className="w-full">
        <div className="relative mb-3 flex h-[188px] w-full flex-col">
          <ProgressiveImg
            src={data?.coverImage}
            className="h-full w-full rounded-md object-cover"
            alt="coverImage"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-20 p-4 pt-11"
            style={{
              background:
                'linear-gradient(180deg, rgba(16, 16, 16, 0) 0%, #000000 90%)',
            }}
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <div className="caption1 flex h-6 items-center gap-1 rounded bg-red py-1 px-2 font-bold uppercase">
              <LiveIcon className={'scale-75'} />
              <FormattedMessage id="live" />
            </div>
            <div className="caption1 flex h-6 items-center rounded bg-black bg-opacity-60 py-1 px-2">
              <ViewIcon />
              &nbsp;
              {data?.viewerCount}
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-3 pr-3">
            <img
              src={data.channel?.avatarImage}
              alt="avatarImage"
              className="avatar h-8 w-8"
            />
            <div className="flex-1">
              <span className="headline font-bold line-clamp-2 ">
                {data.name}
              </span>
              <div className="mt-1 flex flex-1 flex-wrap gap-1 text-neutral-500">
                <p className="caption1 line-clamp-2">{data?.channel?.name}</p>
                <p className="caption1">
                  &nbsp;&nbsp;•&nbsp;&nbsp;{data.publishedTime}
                </p>
              </div>
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
        </div>{' '}
      </div>
    </>
  )
}
interface Props {
  dataLiveSSR: some[]
}

const ShortVideoList = (props: Props) => {
  const { dataLiveSSR } = props
  const {
    data: dataLiveCSR = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index) => API_PATHS.home.lives({ page_token: index + 1, page_size: 12 }),
    async (url) => {
      const json = await api({ url, method: 'get' })
      return json?.data?.data?.[0]?.contents
    },
    {
      revalidateAll: false,
      revalidateFirstPage: false,
      initialSize: 1,
      revalidateOnMount: false,
      revalidateOnFocus: false,
    }
  )
  const mappedData = useMemo(() => {
    return dataLiveCSR?.reduce((v, c) => {
      return [...v, ...c]
    }, dataLiveSSR)
  }, [dataLiveCSR, dataLiveSSR])

  if (isValidating && size === 1) {
    return (
      <div className="container">
        <div className="flex gap-3 py-3">
          <div className="h-4 w-1/4 rounded bg-bg2" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {Array(4)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className="flex animate-pulse flex-col gap-2">
                  <div className="flex h-48 w-full shrink-0 rounded-md bg-bg2" />
                  <div className="h-4 w-3/4 rounded bg-bg2" />
                  <div className="h-4 w-1/2 rounded bg-bg2" />
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="mb-5 flex items-center gap-3 py-3">
        <p className="text-2xl font-bold leading-6">
          <FormattedMessage id="hotLiveStream" />
        </p>
        <MyLink href={'/lives'} className=" font-semibold text-neutral-400 ">
          <FormattedMessage id="seeAll" />
        </MyLink>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mappedData?.map((items) => (
          <VideoCard key={items.id} data={items} />
        ))}
      </div>
      {isValidating && (
        <div className="shrink-1 flex h-48 w-full items-center justify-center">
          <LoadingIcon className="h-10 animate-spin" />
        </div>
      )}
    </div>
  )
}

export default ShortVideoList
