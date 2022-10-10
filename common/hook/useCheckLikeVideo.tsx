import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { API_PATHS } from '@utility/API_PATH'
import useSWR from 'swr'

const useCheckLikeVideo = (videoId: number) => {
  const { dispatch } = useGeneralHook()

  const {
    data: url,
    isValidating: loading,
    mutate,
  } = useSWR(
    videoId
      ? API_PATHS.videos.checkLike({ filter: `LIKE_VIDEO_${videoId}` })
      : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
      console.log(json, 'JSON')

      return json?.data?.data[0].status
    },
    {
      revalidateOnFocus: false,
    }
  )

  return { checkLike: url, loading, mutate }
}
export default useCheckLikeVideo
