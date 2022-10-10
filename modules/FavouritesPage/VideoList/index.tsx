import api from '@common/api'
import VideoOptionDrawer from '@common/components/VideoOptionBox'
import { some } from '@common/constants'
import { LoadingIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import VideoCard, { VideoCardSkeleton } from './VideoCard'

interface Props {}

const VideoList = (props: Props) => {
  const [optionsVideo, setOptionsVideo] = useState<some | undefined>()

  const {
    data: dataVideoCSR = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index) =>
      API_PATHS.favourites.videos({
        page_token: index,
        page_size: 10,
        filter: 'LIKE_VIDEO',
      }),
    async (url) => {
      const json = await api({ url, method: 'get' })
      return json?.data?.data?.[0]?.contents
    },
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    }
  )

  const mappedData = useMemo(() => {
    return dataVideoCSR?.reduce((v, c) => {
      return [...v, ...c]
    }, [])
  }, [dataVideoCSR])

  const onScroll = useCallback(
    (e) => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 290 * 2 &&
        !isValidating &&
        dataVideoCSR?.every((item) => item.length > 0)
      ) {
        setSize(size + 1)
      }
    },
    [dataVideoCSR, isValidating, setSize, size]
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  if (isValidating && size === 1) {
    return (
      <div className="flex flex-col gap-3">
        {Array(6)
          .fill(0)
          .map((_, index) => {
            return <VideoCardSkeleton key={index} />
          })}
      </div>
    )
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mappedData?.map((item: some, index) => {
          return <VideoCard key={index} data={item} />
        })}
        {isValidating && (
          <div className="flex h-36 w-full shrink-0 items-center justify-center">
            <LoadingIcon className="h-10 animate-spin" />
          </div>
        )}
      </div>
    </>
  )
}
export default VideoList
