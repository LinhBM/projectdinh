import MyLink from '@common/components/MyLink'
import { some } from '@common/constants'
import { numberFormatter } from '@utility/utils'
import React from 'react'
import { FormattedMessage } from 'react-intl'

interface Props {
  listChannel: some[]
}

const ChannelCard = ({ data }) => {
  return (
    <div className="flex w-28 flex-col items-center">
      <img
        src={data?.avatarImage}
        alt={data?.name}
        className="mb-3 h-28 w-28 rounded-full object-cover"
      />
      <p className="mb-0.5 text-center font-bold line-clamp-1">{data?.name}</p>
      <p className="caption2 mb-4 text-center text-neutral-500">
        <FormattedMessage
          id="followerCount"
          values={{ num: numberFormatter(data.followCount, 1) || 0 }}
        />
      </p>
      <button className="btn">
        <p className="font-semibold">
          <FormattedMessage id="follow" />
        </p>
      </button>
    </div>
  )
}

const SuggestChannel: React.FC<Props> = (props) => {
  const { listChannel } = props
  return (
    <div className="container mb-10">
      <div className="mb-5 flex items-center gap-3 py-3">
        <p className="text-2xl font-bold leading-6">
          <FormattedMessage id="suggestChannel" />
        </p>
        <p className=" font-semibold text-neutral-400 ">
          <FormattedMessage id="seeAll" />
        </p>
      </div>
      <div className="grid grid-cols-9 gap-[52px]">
        {listChannel.map((v, index) => (
          <ChannelCard data={v} key={index} />
        ))}
      </div>
    </div>
  )
}

export default SuggestChannel
