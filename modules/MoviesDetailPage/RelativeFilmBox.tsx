import { some, VideoObject } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import FilmCard from '@modules/MoviesPage/FilmCard'
import { LoadingIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import useSWRInfinite from 'swr/infinite'
interface Props {
  dataFilmSSR: some
  dataRelatedVideoSSR: some[]
  currentEpisode?: VideoObject
}

const RelativeFilmBox = (props: Props) => {
  const { currentEpisode, dataFilmSSR, dataRelatedVideoSSR } = props
  console.log({ currentEpisode, dataFilmSSR, dataRelatedVideoSSR })

  const { dispatch } = useGeneralHook()

  const {
    data: dataRelatedVideoCSR = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index) =>
      currentEpisode?.id && dataFilmSSR?.channel?.id
        ? API_PATHS.videos.related({
            page_size: 12,
            page_token: index,
            id: currentEpisode?.id,
            channel_id: dataFilmSSR?.channel?.id,
            page_category_id: dataFilmSSR?.categoryId,
          })
        : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
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

  const mappedDataRelatedVideo = useMemo(() => {
    return dataRelatedVideoCSR
      .filter(Boolean)
      ?.reduce((v, c) => [...v, ...c], dataRelatedVideoSSR)
  }, [dataRelatedVideoCSR, dataRelatedVideoSSR])

  if (!mappedDataRelatedVideo.length && !isValidating) {
    return null
  }

  return (
    <div className="py-6">
      <p className="title mb-3 px-3 font-bold">
        <FormattedMessage id="relatedFilm" />
      </p>
      <div
        className="flex flex-nowrap justify-start gap-2 overflow-x-auto px-3 scrollbar-none-height"
        onScroll={(e) => {
          if (
            e.currentTarget.scrollLeft +
              e.currentTarget.offsetWidth +
              135 * 2 >=
              e.currentTarget.scrollWidth &&
            !isValidating &&
            dataRelatedVideoCSR?.every((v) => v.length > 0)
          ) {
            setSize(size + 1)
          }
        }}
      >
        {mappedDataRelatedVideo?.map((items) => (
          <FilmCard key={items.id} data={items} className={'w-28'} />
        ))}
        <div className="flex h-[264px] items-center justify-center">
          {isValidating &&
            (size === 1 ? (
              <></>
            ) : (
              <LoadingIcon className="h-10 animate-spin" />
            ))}
        </div>
      </div>
    </div>
  )
}

export default RelativeFilmBox
