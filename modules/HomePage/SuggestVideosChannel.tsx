import api from '@common/api'
import { some } from '@common/constants'
import { API_PATHS } from '@utility/API_PATH'
import React, { useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import VideoCard from './VideoCard'

interface Props {
  listChannel: some[]
}

const ChannelVideoItem = ({ data }) => {
  const [listVideo, setListVideo] = useState([])
  const getSuggestedChannelList = useCallback(async (id: number) => {
    const json = await api({
      url: API_PATHS.home.listVideo({
        filter: [`CHANNEL_${id}`, 'LATEST'],
        page_token: 0,
        page_size: 8,
      }),
    })
    setListVideo(json?.data?.data?.[0]?.contents)
  }, [])

  useEffect(() => {
    data?.id && getSuggestedChannelList(data?.id)
  }, [data?.id, getSuggestedChannelList])
  if (listVideo.length === 0) {
    return <></>
  }
  return (
    <div>
      <div className="mb-5 flex items-center gap-3 py-3">
        <p className="text-2xl font-bold leading-6">{data?.name}</p>
        <p className=" font-semibold text-neutral-400 ">
          <FormattedMessage id="seeAll" />
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listVideo?.map((item: some, index) => {
          return (
            <VideoCard data={item} key={index} setOptionsVideo={() => {}} />
          )
        })}
      </div>
    </div>
  )
}

const SuggestVideosChannel: React.FC<Props> = (props) => {
  const { listChannel } = props

  return (
    <div className="container">
      <div className="flex flex-col gap-11">
        {listChannel.map((v, index) => (
          <ChannelVideoItem data={v} key={index} />
        ))}
      </div>
    </div>
  )
}

export default SuggestVideosChannel
