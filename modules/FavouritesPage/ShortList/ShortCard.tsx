import ProgressiveImg from '@common/components/ProgressiveImg'
import { some } from '@common/constants'
import { PlayIcon, PlaySmall } from '@public/icons'
import { FormattedMessage } from 'react-intl'
import { formatView } from '../ultils'

export const ShortCardSkeleton = () => {
  return (
    <div className="relative h-52 w-full animate-pulse rounded-lg bg-bg2">
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <div className="h-3 w-3/4 rounded bg-neutral-100"></div>
      </div>
    </div>
  )
}

interface Props {
  data: some
}

const ShortCard = (props: Props) => {
  const { data } = props
  return (
    <div className="flex flex-col">
      <div className="relative h-96">
        <ProgressiveImg
          src={data?.coverImage}
          className="absolute h-full w-full rounded-t-lg object-cover"
          alt="coverImage"
        />
        <div
          className="caption2 absolute bottom-[-1px] left-[-1px] right-[-1px] flex h-[108px] items-end rounded-none py-1 px-4"
          style={{
            mixBlendMode: 'normal',
            background:
              'linear-gradient(180deg, rgba(16, 16, 16, 0) 0%, #000000 86.57%)',
          }}
        >
          <div className="flex items-center gap-1 pt-0">
            <PlaySmall />
            {formatView(data.playTimes)}
            <FormattedMessage id="view" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShortCard
