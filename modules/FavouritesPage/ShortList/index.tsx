import api from '@common/api'
import { some } from '@common/constants'
import { LoadingIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useCallback, useEffect, useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import ShortCard, { ShortCardSkeleton } from './ShortCard'

interface Props {}

const ShortList = (props: Props) => {
  const {
    data: dataShortCSR = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index) =>
      API_PATHS.favourites.videos({
        page_token: index,
        page_size: 10,
        filter: 'LIKE_SHORT',
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
    return dataShortCSR?.reduce((v, c) => {
      return [...v, ...c]
    }, [])
  }, [dataShortCSR])

  const onScroll = useCallback(
    (e) => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 290 * 2 &&
        !isValidating &&
        dataShortCSR?.every((item) => item.length > 0)
      ) {
        setSize(size + 1)
      }
    },
    [dataShortCSR, isValidating, setSize, size]
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  if (isValidating && size === 1) {
    return (
      <div className="grid grid-cols-3 gap-1">
        {Array(6)
          .fill(0)
          .map((_, index) => {
            return <ShortCardSkeleton key={index} />
          })}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-6 gap-5">
      {mappedData?.map((item: some, index) => {
        return <ShortCard key={index} data={item} />
      })}
      <div className="flex h-36 w-full shrink-0 items-center justify-center">
        {isValidating && <LoadingIcon className="h-10 animate-spin" />}
      </div>
    </div>
  )
}
export default ShortList
