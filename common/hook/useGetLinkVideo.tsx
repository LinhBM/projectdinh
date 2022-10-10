import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { API_PATHS } from '@utility/API_PATH'
import useSWR from 'swr'

const useGetLinkVideo = (videoId: number) => {
  const { dispatch } = useGeneralHook()

  const {
    data: url,
    isValidating: loading,
    mutate,
  } = useSWR(
    videoId ? API_PATHS.videos.getLink(videoId) : null,
    async (url) => {
      console.log(url, 'url')
      const json = await dispatch(fetchThunk({ url, method: 'get' }))

      return json?.data?.data
    },
    {
      revalidateOnFocus: false,
    }
  )

  return { url, loading, mutate }
}
export default useGetLinkVideo
