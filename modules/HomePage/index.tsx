import api from '@common/api'
import MyLink from '@common/components/MyLink'
import { some } from '@common/constants'
import { ExploreIcon, LoadingIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { ROUTES } from '@utility/constant'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import useSWRInfinite from 'swr/infinite'
import BannersCarousel from './BannersCarousel'
import HotLiveStreamList from './HotLiveStreamList'
import MenuCategories from './MenuCategories'
import ShortVideoList from './ShortVideoList'
import SuggestChannel from './SuggestChannel'
import SuggestVideosChannel from './SuggestVideosChannel'
import VideoCard, { VideoCardSkeleton } from './VideoCard'
interface Props {
  dataHomeSSR: some[]
  dataLiveSSR: some[]
  dataShortSSR: some[]
  dataCategorySSR: some[]
  bannersSSR: some[]
  listChannelSSR: some[]
  listChannelVideoSSR: some[]
}
const HomePage = (props: Props) => {
  const {
    dataHomeSSR,
    dataLiveSSR,
    dataShortSSR,
    dataCategorySSR,
    bannersSSR,
    listChannelSSR,
    listChannelVideoSSR,
  } = props

  const { query } = useRouter()

  const categoryId = query.categoryId ? Number(query.categoryId) : ''
  const [setOptionsVideo] = useState<some | any>()
  const ref = useRef<any>()

  const HOME_TABS = [
    {
      icon: <ExploreIcon />,
      label: <FormattedMessage id="explore" />,
      href: { pathname: ROUTES.explore },
    },
    {
      label: <FormattedMessage id="offer" />,
      categoryId: '',
    },
    {
      label: <FormattedMessage id="movies" />,
      href: { pathname: ROUTES.phim },
    },
    ...(dataCategorySSR || []).map((val) => ({
      label: val.name,
      categoryId: val.id,
    })),
  ]

  const {
    data: dataChannelVideo = [],
    size: sizeChannel,
    setSize: setSizeChannel,
    isValidating: isValidatingChannel,
  } = useSWRInfinite(
    (pageIndex, prevPageData) => {
      return API_PATHS.home.channelsHome({
        page_token: pageIndex,
        page_size: 5,
        filter: 'CHANNEL_HOME',
      })
    },
    async (url, id) => {
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

  const mappedChannel = useMemo(() => {
    const dataChannelSuggest =
      dataChannelVideo?.reduce((c, v) => {
        return [...c, ...v]
      }, listChannelVideoSSR) || []
    return dataChannelSuggest.filter(
      (value, index, self) => self.map((x) => x.id).indexOf(value.id) == index
    )
  }, [dataChannelVideo, listChannelVideoSSR])

  const onScroll = useCallback(() => {
    if (
      ref?.current?.getBoundingClientRect().top < window?.innerHeight &&
      !isValidatingChannel
    ) {
      setSizeChannel(sizeChannel + 1)
    }
  }, [isValidatingChannel, setSizeChannel, sizeChannel])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])
  if (categoryId) {
    const name = HOME_TABS.find((i: any) => i.categoryId === categoryId)?.label
    return (
      <>
        <MenuCategories tabs={HOME_TABS} categoryId={categoryId} />
        <div className="container min-h-[800px] p-10">
          <p className="text-xl">{name}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <BannersCarousel banners={bannersSSR} />
      <MenuCategories tabs={HOME_TABS} categoryId={categoryId} />
      <div className="h-9"></div>
      <HotLiveStreamList dataLiveSSR={dataLiveSSR} />
      <ShortVideoList dataShortSSR={dataShortSSR} />

      <div className="container my-11">
        <div className="mb-5 flex gap-3 py-3">
          <p className="title text-[24px] font-bold">
            <FormattedMessage id="doYouLikeIt" />
          </p>
          <MyLink href={'/shorts'} className="font-[600] text-neutral-600">
            <FormattedMessage id="seeAll" />
          </MyLink>
        </div>

        <div className="container flex flex-col gap-6 p-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {dataHomeSSR?.map((item: some, index) => {
              return (
                <VideoCard
                  data={item}
                  key={index}
                  setOptionsVideo={setOptionsVideo}
                />
              )
            })}
            {/* {isValidating &&
              (size === 1 ? (
                <VideoCardSkeleton />
              ) : (
                <div className="flex h-[264px] items-center justify-center">
                  <LoadingIcon className="h-10 animate-spin" />
                </div>
              ))} */}
          </div>
        </div>
      </div>
      <SuggestChannel listChannel={listChannelSSR} />

      <SuggestVideosChannel listChannel={mappedChannel} />
      <div ref={ref}>
        <div className="flex h-[264px] items-center justify-center">
          {isValidatingChannel && <LoadingIcon className="h-10 animate-spin" />}
        </div>
      </div>
    </>
  )
}

export default HomePage
