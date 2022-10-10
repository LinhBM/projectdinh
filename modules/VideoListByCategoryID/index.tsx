import api from '@common/api'
import { some } from '@common/constants'
import MenuCategories from '@modules/HomePage/MenuCategories'
import { ExploreIcon, LoadingIcon } from '@public/icons'
import { API_PATHS, API_PATHS_SERVER } from '@utility/API_PATH'
import { ROUTES } from '@utility/constant'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import useSWRInfinite from 'swr/infinite'

interface Props {
  dataVideoListSSR: some[]
  dataCategorySSR: some[]
}

const VideoListByCategoryID = (props: Props) => {
  const { dataVideoListSSR, dataCategorySSR } = props

  const { query } = useRouter()
  const { categoryId } = query
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
    data = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index) => {
      return !categoryId
        ? API_PATHS_SERVER.videos.home({
            filter: `CATEGORY_${categoryId}`,
            page_token: 0,
            page_size: 16,
          })
        : null
    },
    async (url) => {
      const json = await api({ url, method: 'get' })
      return json?.data?.data?.[0]?.contents || []
    },
    {
      revalidateAll: false,
      revalidateFirstPage: false,
      initialSize: 1,
      revalidateOnMount: false,
      revalidateOnFocus: false,
      persistSize: true,
    }
  )

  const mappedData = useMemo(() => {
    return data?.reduce((v, c) => {
      return [...v, ...c]
    }, dataVideoListSSR)
  }, [data, dataVideoListSSR])

  const onScroll = useCallback(
    (e) => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 320 * 2 &&
        !isValidating &&
        dataVideoListSSR.length > 0 &&
        data?.every((item) => item.length > 0)
      ) {
        setSize(size + 1)
      }
    },
    [data, dataVideoListSSR.length, isValidating, setSize, size]
  )
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  console.log(mappedData, 'mappedData')

  return (
    <div className="min-h-[800px]">
      <MenuCategories tabs={HOME_TABS} categoryId={categoryId} />
      <div
        className={
          ' grid-cols-2 gap-3 p-3 first-letter:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  xl:grid-cols-6'
        }
      >
        <p className="text-xl">API ERROR</p>
        <p className="text-xl">
          {`http://localhost:8788/v5/videos?filter=CATEGORY_${categoryId}&page_size=10&page_token=0`}
        </p>
        <p className="text-xl">
          {JSON.stringify({
            message: 'Request không hợp lệ.',
            data: null,
          })}
        </p>
      </div>
      <div className="flex h-36 w-full shrink-0 items-center justify-center">
        {isValidating && <LoadingIcon className="h-10 animate-spin" />}
      </div>
    </div>
  )
}

export default VideoListByCategoryID
