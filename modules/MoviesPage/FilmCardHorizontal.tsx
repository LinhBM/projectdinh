import MyLink from '@common/components/MyLink'
import Popper from '@common/components/Popper'
import ProgressiveImg from '@common/components/ProgressiveImg'
import { some } from '@common/constants'
import { formatView } from '@modules/FavouritesPage/ultils'
import { MoreIcon } from '@public/icons'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

interface Props {
  data: some
  index: number
  className?: string
}
const FilmCardHorizontal = (props: Props) => {
  const { data, className, index } = props
  const { query } = useRouter()
  console.log(data, 'data')
  return (
    <MyLink
      key={`${data.id}`}
      href={{
        pathname: '/phim/[...slug]',
        query: { ...query, slug: [`${data.id}`, data.slug] },
      }}
      title={data.description}
      className={'flex gap-3 px-3 py-2'}
    >
      <div className="flex w-[18px] min-w-[18px] items-center">{index + 1}</div>
      <div className="relative h-[68px] min-h-[68px] w-[128px] min-w-[128px] rounded  bg-black">
        <ProgressiveImg
          src={data.coverImage}
          alt="coverImage"
          className="h-full w-full rounded object-cover"
        />
        {/* <div className="absolute bottom-0 right-0">
          {formatView(data?.playTimes)}
        </div> */}
      </div>
      <div>
        <div className=" text-xs font-bold line-clamp-2">{data.name}</div>
        <div>
          <p className=" text-neutral-500 line-clamp-2">
            {formatView(data?.playTimes) || 0}&nbsp;
            <FormattedMessage id="viewText" />
          </p>
        </div>
      </div>
      {/* <div className="flex gap-3">
        <div className="flex-1">
          <p className="headline mt-2 font-bold line-clamp-2">{data.name}</p>
          <p className="mt-0.5 text-neutral-500 line-clamp-2">
            {formatView(data?.playTimes) || 0}&nbsp;
            <FormattedMessage id="viewText" />
          </p>
        </div>
        <div className="pt-2">
          <Popper
            wrapper={
              <button onClick={() => {}} className="h-fit">
                <MoreIcon />
              </button>
            }
            classNamePaper="w-72"
          ></Popper>
        </div>
      </div> */}
    </MyLink>
  )
}

export default FilmCardHorizontal
