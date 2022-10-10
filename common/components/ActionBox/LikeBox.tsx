import { VideoObject } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { HeartFilled, HeartFilledColor, HeartIcon } from '@public/icons'
import { setOpenLoginDialog } from '@redux/commonReducer'
import { API_PATHS } from '@utility/API_PATH'
import { useState } from 'react'
import useSWR from 'swr'

interface Props {
  data: VideoObject
  type?: 'VIDEO' | 'SHORT'
  className?: string
}

const LikeBox = (props: Props) => {
  const { data, type = 'VIDEO', className = '' } = props
  console.log(data, 'LikeBox')
  const { setMessage, dispatch, isLogin } = useGeneralHook()
  const [likeCount, setLikeCount] = useState(data?.likeCount)

  const { data: status = 0, mutate } = useSWR(
    data?.id && isLogin
      ? API_PATHS.user.get({
          filter: `LIKE_${type}_${data?.id}`,
          page_size: 12,
          page_token: 0,
        })
      : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
      return json?.data?.data?.[0].status
    },
    {
      revalidateOnFocus: false,
    }
  )

  const onLike = async (status) => {
    try {
      const json = await dispatch(
        fetchThunk(
          {
            url: API_PATHS.user.like,
            method: 'post',
            data: {
              id: data.id,
              type: type,
              status: status,
            },
          },
          true
        )
      )
      if (json.status === 200) {
        setLikeCount((old = 0) => (status ? old + 1 : old - 1))
        mutate()
      }
    } catch (e: any) {
      setMessage({ message: e.response?.data?.message })
    }
  }

  if (type === 'SHORT') {
    return (
      <button
        className={
          'flex flex-1 flex-col items-center justify-center gap-2 ' + className
        }
        onClick={() => onLike(status ? 0 : 1)}
      >
        <div className={status ? 'text-primary' : 'text-white'}>
          <HeartFilled />
        </div>
        <p className="caption1">
          {likeCount && likeCount > 0 ? likeCount : ''}
        </p>
      </button>
    )
  }
  console.log(likeCount, 'likeCount')

  return (
    <button
      className="flex items-center gap-2"
      onClick={() => {
        if (!isLogin) {
          dispatch(setOpenLoginDialog(true))
        } else {
          onLike(status ? 0 : 1)
        }
      }}
    >
      {status === 1 ? <HeartFilledColor /> : <HeartIcon />}
      <p className="caption1">{likeCount && likeCount > 0 ? likeCount : ''}</p>
    </button>
  )
}

export default LikeBox
