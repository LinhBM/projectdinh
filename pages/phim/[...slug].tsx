import { api } from '@common/fetchThunk'
import { some, VideoObject } from '@common/constants'
import MoviesDetailPage from '@modules/MoviesDetailPage'
import { API_PATHS_SERVER } from '@utility/API_PATH'

interface Props {
  dataFilmSSR: some
  listFilmSSR: VideoObject[]
  dataRelatedVideoSSR: some[]
  dataCategorySSR: some[]
}

const NextPage = (props: Props) => {
  return (
    <>
      <MoviesDetailPage {...props} />
    </>
  )
}
export async function getServerSideProps({ query }) {
  const id = query.slug[0];
  try {
    const [dataFilm, listFilm, dataCategory] = await Promise.all([
      api({
        url: API_PATHS_SERVER.films.detail(id as string),
      }),
      api({
        url: API_PATHS_SERVER.films.child(id as string, {
          page_size: 10,
          page_token: 0,
          type: 'FILM',
        }),
      }),
      api({
        url: API_PATHS_SERVER.home.categories({
          page_token: 0,
          page_size: 10,
          filter: 'PARENT',
        }),
      }),
    ])
    let dataRelatedVideoSSR = []
    const dataFilmSSR = dataFilm?.data?.data
    if (dataFilmSSR?.channel?.id && dataFilmSSR?.categoryId && id) {
      const listFilm = await api({
        url: API_PATHS_SERVER.videos.related({
          page_size: 12,
          page_token: 0,
          id,
          channel_id: dataFilmSSR?.channel?.id,
          page_category_id: dataFilmSSR?.categoryId,
        }),
      })
      dataRelatedVideoSSR = listFilm?.data?.data?.[0]?.contents
    }
    return {
      props: {
        dataFilmSSR: dataFilmSSR,
        listFilmSSR: listFilm?.data?.data?.[0]?.contents,
        dataCategorySSR: dataCategory?.data?.data?.[0]?.contents,
        dataRelatedVideoSSR,
      },
    }
  } catch (err) {
    return {
      props: {
        dataFilm: {
          dataFilmSSR: {},
          listFilmSSR: [],
          dataRelatedVideoSSR: [],
          dataCategorySSR: []
        },
      },
    }
  }
}

export default NextPage
