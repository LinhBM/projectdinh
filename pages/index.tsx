import api from '@common/api'
import { some } from '@common/constants'
import HomePage from '@modules/HomePage'
import { API_PATHS, API_PATHS_SERVER } from '@utility/API_PATH'

interface Props {
  dataHomeSSR: some[]
  dataLiveSSR: some[]
  dataShortSSR: some[]
  dataCategorySSR: some[]
  bannersSSR: some[]
  listChannelSSR: some[]
  listChannelVideoSSR: some[]
}

const NextPage = (props: Props) => {
  return (
    <>
      <HomePage {...props} />
    </>
  )
}
export async function getServerSideProps() {
  const [
    dataHome,
    dataLive,
    dataShort,
    dataCategory,
    banners,
    listChannel,
    listChannelVideo,
  ] = await Promise.all([
    api({
      url: API_PATHS_SERVER.home.home({ page_token: 0, page_size: 8 }),
    }),
    api({
      url: API_PATHS_SERVER.home.lives({ page_token: 0, page_size: 4 }),
    }),
    api({
      url: API_PATHS_SERVER.home.shorts({ page_token: 0, page_size: 7 }),
    }),
    api({
      url: API_PATHS_SERVER.home.categories({
        page_token: 0,
        filter: 'PARENT',
      }),
    }),
    api({
      url: API_PATHS_SERVER.home.banner({
        filter: 'LOCATION_HOME',
        page_token: 0,
        page_size: 10,
      }),
    }),
    api({
      url: API_PATHS_SERVER.home.channelsHome({
        filter: 'CHANNEL_RECOMMEND',
        page_token: 0,
        page_size: 9,
      }),
    }),
    api({
      url: API_PATHS_SERVER.home.channelsHome({
        filter: 'CHANNEL_HOME',
        page_token: 0,
        page_size: 5,
      }),
    }),
  ])
  return {
    props: {
      dataHomeSSR: dataHome?.data?.data?.[0]?.contents,
      dataLiveSSR: dataLive?.data?.data?.[0]?.contents,
      dataShortSSR: dataShort?.data?.data?.[0]?.contents,
      dataCategorySSR: dataCategory?.data?.data?.[0]?.contents,
      bannersSSR: banners?.data?.data?.[0]?.contents,
      listChannelSSR: listChannel?.data?.data?.[0]?.contents || [],
      listChannelVideoSSR: listChannelVideo?.data?.data?.[0]?.contents || [],
    },
  }
}

export default NextPage
