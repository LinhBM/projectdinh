import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { API_PATHS } from '@utility/API_PATH'
import useSWR from 'swr'

const useGetLinkStream = (videoId: number) => {
  const { dispatch } = useGeneralHook()

  const {
    data: url,
    isValidating: loading,
    mutate,
  } = useSWR(
    videoId ? API_PATHS.lives.getLink(videoId) : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
      return json?.data?.data.streamUrl
    },
    {
      revalidateOnFocus: false,
    }
  )

  return { url, loading, mutate }
}
export default useGetLinkStream
