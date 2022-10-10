import { some } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { API_PATHS } from '@utility/API_PATH'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

const useGetLinkVideo = (
  videoId: number,
  optionsSWR?: { refreshInterval?: number }
) => {
  const { dispatch } = useGeneralHook()

  const {
    data: url,
    isValidating: loading,
    mutate,
  } = useSWR(
    videoId ? API_PATHS.videos.getLink(videoId) : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
      return json?.data?.data
    },
    {
      revalidateOnFocus: false,
      ...optionsSWR,
    }
  )

  return { url, loading, mutate }
}
export default useGetLinkVideo
