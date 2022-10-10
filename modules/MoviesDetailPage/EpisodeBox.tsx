import DrawerFullScreen from '@common/components/DrawerFullScreen'
import ProgressiveImg from '@common/components/ProgressiveImg'
import ShareDrawer from '@common/components/ShareDrawer'
import VideoOptionDrawer from '@common/components/VideoOptionDrawer'
import { some, VideoObject } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import { formatTimeVideo, formatView } from '@common/helper'
import useGeneralHook from '@common/hook/useGeneralHook'
import {
  ChevronDownIcon,
  MoreIcon,
  ShareFillIcon,
  SpeedArrowIcon,
} from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import useSWRInfinite from 'swr/infinite'

interface Props {
  dataFilmSSR: some
  listFilmSSR: VideoObject[]
  episodeIndex: number
  setEpisodeIndex: (value: number) => void
}

const EpisodeBox = (props: Props) => {
  const { dataFilmSSR, listFilmSSR, episodeIndex, setEpisodeIndex } = props
  const { dispatch } = useGeneralHook()
  const [openShare, setOpenShare] = useState(false)

  const [openDrawerSelectEpisode, setOpenDrawerSelectEpisode] = useState(false)
  const [optionsVideo, setOptionsVideo] = useState<VideoObject | undefined>()
  const [open, setOpen] = useState(false)

  // const {
  //   data = [],
  //   size,
  //   setSize,
  //   isValidating,
  // } = useSWRInfinite(
  //   (index) =>
  //     dataFilmSSR?.id
  //       ? API_PATHS.films.child(dataFilmSSR.id as string, {
  //           page_size: 30,
  //           page_token: index + 1,
  //           type: 'FILM',
  //         })
  //       : null,
  //   async (url) => {
  //     const json = await dispatch(fetchThunk({ url, method: 'get' }))
  //     return json?.data?.data?.[0]?.contents
  //   },
  //   { revalidateAll: false, revalidateFirstPage: false }
  // )

  const mappedData = useMemo(() => {
    return [].filter(Boolean)?.reduce((v, c) => {
      return [...v, ...c]
    }, listFilmSSR)
  }, [listFilmSSR])

  return (
    <>
      <div
        className="flex h-12 items-center gap-4 rounded-lg bg-bg2 px-4"
        onClick={() => setOpenDrawerSelectEpisode(true)}
      >
        <p className="caption1 flex-1 font-bold ">{dataFilmSSR.name}</p>
        <p className="caption1 font-bold text-neutral-500">
          <FormattedMessage id="episode" /> {episodeIndex + 1}/
          {dataFilmSSR.numVideo}
        </p>
      </div>
      <div className="divider "></div>
      <div className="item-center mt-[16px] mb-[16px] flex flex-1 gap-6 p-[0px] px-4">
        <button
          className={
            episodeIndex === 0 ? 'text-neutral-200' : 'text-neutral-500'
          }
          disabled={episodeIndex === 0}
          onClick={() => {
            setEpisodeIndex(episodeIndex - 1)
          }}
        >
          <SpeedArrowIcon className="rotate-180" />
        </button>
        <button
          className={
            episodeIndex === mappedData?.length - 1
              ? 'text-neutral-200'
              : 'text-neutral-500'
          }
          disabled={episodeIndex === mappedData?.length - 1}
          onClick={() => {
            setEpisodeIndex(episodeIndex + 1)
          }}
        >
          <SpeedArrowIcon />
        </button>
      </div>
      <div
        className="max scrollbar-y flex  h-[630px] max-h-[630px] flex-col overflow-auto"
        // onScroll={(e) => {
        //   if (
        //     e.currentTarget.scrollTop +
        //       e.currentTarget.offsetHeight +
        //       100 * 6 >=
        //       e.currentTarget.scrollHeight &&
        //     !isValidating &&
        //     data?.every((v) => v.length > 0)
        //   ) {
        //     setSize(size + 1)
        //   }
        // }}
      >
        {mappedData?.map((item, index) => {
          return (
            <div
              key={item.id}
              className={
                'flex h-[84px] items-start justify-center ' +
                (index === episodeIndex ? 'bg-[#30303066]' : 'bg-bg2')
              }
              onClick={() => {
                setEpisodeIndex(index)
              }}
            >
              <div className="flex h-full w-[16px] items-center justify-center p-[20px] text-xs font-bold leading-[68px] ">
                {index + 1}
              </div>
              <div className="flex h-full flex-1 items-center gap-3">
                <div className="relative flex h-full items-center rounded">
                  <ProgressiveImg
                    src={item.coverImage}
                    alt="coverImage"
                    className="h-[68px] w-[127px] shrink-0 rounded"
                  />
                  <div className="caption1 absolute top-[54px] right-1 flex h-[18px] w-[40px] items-center justify-center rounded bg-black  bg-opacity-60 text-xs">
                    {formatTimeVideo(item.duration)}
                  </div>
                </div>
                <div className="h-full flex-1 pt-2 pr-[15px]">
                  <p className="caption1 font-bold  line-clamp-2">
                    {item.name}
                  </p>
                  <p className="caption1 font-medium text-neutral-500 line-clamp-2">
                    {formatView(item.playTimes)}
                    <FormattedMessage id="viewNumber" />
                  </p>
                </div>
              </div>
              {/* <div
                  className="cursor-pointer"
                  onClick={() => {
                    setOpen(true)
                    setOptionsVideo({
                      ...item,
                      filmChannel: dataFilmSSR.channel,
                    })
                  }}
                >
                  <MoreIcon />
                </div> */}
            </div>
          )
        })}
      </div>

      <ShareDrawer
        open={openShare}
        onClose={setOpenShare}
        shareUrl={mappedData?.[episodeIndex]?.linkShare}
      />
    </>
  )
}

export default EpisodeBox
