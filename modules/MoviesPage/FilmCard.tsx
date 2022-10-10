import MyLink from '@common/components/MyLink'
import Popper from '@common/components/Popper'
import ProgressiveImg from '@common/components/ProgressiveImg'
import VideoOptionBox from '@common/components/VideoOptionBox'
import { some } from '@common/constants'
import { formatView } from '@modules/FavouritesPage/ultils'
import { MoreIcon } from '@public/icons'
import { numberFormatter } from '@utility/utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

interface Props {
  data: some | any
  className?: string
}
const FilmCard = (props: Props) => {
  const { data, className } = props
  const [openPopper, setOpenPopper] = useState(false)

  const { query } = useRouter()
  return (
    <div className="w-full">
      <MyLink
        key={`${data.id}`}
        href={{
          pathname: '/phim/[...slug]',
          query: { ...query, slug: [`${data.id}`, data.slug] },
        }}
        title={data.description}
        className={'relative ' + className}
      >
        <ProgressiveImg
          src={data.coverImage}
          alt="coverImage"
          className="h-80 w-full rounded-lg object-cover"
        />{' '}
        {data.numVideo > 1 && (
          <div className="caption2 absolute left-0 bottom-3 flex items-center rounded-r-full bg-red px-2 py-1 font-bold">
            {data.numVideo}&nbsp;
            <FormattedMessage id="episode" />
          </div>
        )}
      </MyLink>
      <div className="flex gap-3 py-3">
        <MyLink
          className="w-full"
          href={{
            pathname: '/video/[[...slug]]',
            query: {
              slug: [data.id, data.slug],
            },
          }}
        >
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="headline size-[16]  font-[700] line-clamp-2">
                {data.name}
              </p>
              <p className="size-[14] mt-0.5 font-[400] text-[#B0B0B8] line-clamp-2">
                {formatView(data?.playTimes) || 0}
                <FormattedMessage id="viewText" />
              </p>
            </div>
          </div>
        </MyLink>
        <Popper
          open={openPopper}
          wrapper={
            <button onClick={() => setOpenPopper(true)} className="h-fit">
              <MoreIcon />
            </button>
          }
          onClose={() => setOpenPopper(false)}
          classNamePaper="w-72"
        >
          <VideoOptionBox
            videoData={{
              ...data,
              linkShare:
                'https://mui.com/material-ui/react-modal/#main-content',
            }}
            onCloseModal={() => setOpenPopper(false)}
          />
        </Popper>
      </div>
      <div className="pt-2">
        {/* <Popper
         open={open}
         wrapper={
           <button onClick={() => setOpen(true)} className="h-fit">
             <MoreIcon />
           </button>
         }
         onClose={() => setOpen(false)}
         classNamePaper="w-72"
       ></Popper> */}
      </div>
    </div>
  )
}

export default FilmCard
