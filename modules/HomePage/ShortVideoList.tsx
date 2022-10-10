import MyLink from '@common/components/MyLink'
import ProgressiveImg from '@common/components/ProgressiveImg'
import { some } from '@common/constants'
import { FormattedMessage } from 'react-intl'

const VideoCard = ({ data }) => {
  return (
    <div className="relative flex h-[351px] w-full shrink-0 flex-col">
      <ProgressiveImg
        src={data?.coverImage}
        className="h-full w-full rounded-lg object-cover"
        alt="coverImage"
      />
      <div
        className="absolute bottom-0 left-0 right-0 p-4 pt-11 line-clamp-2"
        style={{
          background:
            'linear-gradient(180deg, rgba(16, 16, 16, 0) 0%, #000000 90%)',
        }}
      >
        <div className="caption1 mb-2 flex flex-1 flex-wrap gap-1  font-[700]">
          <span className="line-clamp-2">{data?.name}</span>
          <span className="line-clamp-2">
            {data?.hashtag ? `#${data?.hashtag}` : ''}
          </span>
        </div>
        <span className="caption1 text-neutral-400">
          {data?.playTimes} <FormattedMessage id={'view'} />
        </span>
      </div>
    </div>
  )
}
interface Props {
  dataShortSSR: some[]
}
const ShortVideoList = (props: Props) => {
  const { dataShortSSR } = props

  return (
    <div className="container my-11">
      <div className="mb-5 flex gap-3 py-3 ">
        <p className="title text-[24px] font-bold">
          <FormattedMessage id="shortVideo" />
        </p>
        <MyLink href={'/shorts'} className="font-[600] text-neutral-600">
          <FormattedMessage id="seeAll" />
        </MyLink>
      </div>

      <div className="grid grid-cols-7 gap-5">
        {dataShortSSR?.map((items) => (
          <VideoCard key={items.id} data={items} />
        ))}
      </div>
    </div>
  )
}

export default ShortVideoList
