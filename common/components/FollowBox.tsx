import ProgressiveImg from '@common/components/ProgressiveImg'
import { some } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { CheckIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useCallback, useState } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import useSWR from 'swr'
import Dialog from './Dialog'
interface Props {
  channelData?: some
}

const FollowBox = (props: Props) => {
  const { channelData } = props
  console.log(channelData, 'channelData')

  const { setMessage, dispatch } = useGeneralHook()
  const [followCount, setFollowCount] = useState(channelData?.followCount || 0)
  const [open, setOpen] = useState(false)

  const { data: listChannelFollowed, mutate } = useSWR(
    channelData
      ? API_PATHS.user.get({ filter: `FOLLOW_CHANNEL_${channelData?.id}` })
      : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
      return json?.data?.data?.[0]?.contents
    }
  )

  const follow = useCallback(
    async (status) => {
      try {
        const json = await dispatch(
          fetchThunk({
            url: API_PATHS.user.followChannel,
            method: 'post',
            data: {
              id: channelData?.id,
              status: status,
              notification_type: 2,
            },
          })
        )
        if (json.data?.data?.followCount) {
          setFollowCount(json.data?.data?.followCount)
          mutate()
          setOpen(false)
        }
        setMessage({ message: json.data?.message })
      } catch (e: any) {
        setMessage({ message: e.response?.data?.message })
      }
    },
    [channelData?.id, dispatch, mutate, setMessage]
  )

  const isFollow =
    listChannelFollowed?.length > 0
      ? listChannelFollowed?.findIndex(
          (v) => v.id === channelData?.id && v.status === 1
        ) !== -1
      : false

  return (
    <div className="flex h-24 items-center gap-2">
      <ProgressiveImg
        src={channelData?.avatarImage}
        alt="avatarImage"
        className="avatar h-12 w-12 shrink-0"
      />
      <div className="flex-1">
        <p className="font-semibold line-clamp-1">{channelData?.name}</p>
        <p className="caption1 mt-1 text-neutral-500">
          <FormattedNumber value={followCount || 0} /> &nbsp;
          <FormattedMessage id={'follower'} />
        </p>
      </div>
      <button
        className={'btn-small shrink-0 ' + (isFollow ? 'btn' : 'btn-container')}
        onClick={() => {
          if (isFollow) {
            setOpen(true)
          } else {
            follow(1)
          }
        }}
      >
        {isFollow && <CheckIcon />}
        <FormattedMessage id={isFollow ? 'following' : 'follow'} />
      </button>
      <Dialog open={open} onClose={setOpen} className="px-7 py-8 text-center">
        <p className="title font-bold">
          <FormattedMessage id="unFollowConfirm" />
          <br />
          {channelData?.name}?
        </p>
        <div className="mt-10 flex gap-2">
          <button className="btn w-full" onClick={() => setOpen(false)}>
            <FormattedMessage id="cancel" />
          </button>
          <button className="btn-container w-full " onClick={() => follow(0)}>
            <FormattedMessage id="unFollow" />
          </button>
        </div>
      </Dialog>
    </div>
  )
}

export default FollowBox
