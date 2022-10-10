import { api } from '@common/fetchThunk'
import { some, VideoObject } from '@common/constants'
import MoviesDetailPage from '@modules/MoviesDetailPage'
import { API_PATHS_SERVER } from '@utility/API_PATH'
import VideoListByCategoryID from '@modules/VideoListByCategoryID'

interface Props {
  dataVideoListSSR: some[]
  dataCategorySSR: some[]
}

const NextPage = (props: Props) => {
  console.log(props)

  return (
    <>
      <VideoListByCategoryID {...props} />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { categoryId } = query

  try {
    const [dataVideoList, dataCategory] = await Promise.all([
      api({
        url: API_PATHS_SERVER.videos.home({
          filter: `CATEGORY_${categoryId}`,
          page_token: 0,
          page_size: 16,
        }),
      }),
      api({
        url: API_PATHS_SERVER.home.categories({
          page_token: 0,
          filter: 'PARENT',
        }),
      }),
    ])

    return {
      props: {
        dataVideoListSSR: dataVideoList?.data?.data?.[0]?.contents,
        dataCategorySSR: dataCategory?.data?.data?.[0]?.contents,
      },
    }
  } catch (err: any) {
    return {
      props: {
        dataVideoListSSR: [],
        dataCategorySSR: [],
      },
    }
  }
}

export default NextPage
