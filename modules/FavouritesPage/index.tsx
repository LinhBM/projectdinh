import MyLink from '@common/components/MyLink'
import { some } from '@common/constants'
import Header from '@layout/Header'
import MenuCategories from '@modules/HomePage/MenuCategories'
import { ExploreIcon } from '@public/icons'
import { ROUTES } from '@utility/constant'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import ShortList from './ShortList'
import VideoList from './VideoList'
interface Props {
  dataCategorySSR: some[]
}
const FavouritesPage = (props: Props) => {
  const { dataCategorySSR } = props
  const { query } = useRouter()
  const { type = 'video' } = query
  const categoryId = query.categoryId ? Number(query.categoryId) : 'favorites'

  const HOME_TABS = [
    {
      icon: <ExploreIcon />,
      label: <FormattedMessage id="explore" />,
      href: { pathname: ROUTES.explore },
    },
    {
      label: <FormattedMessage id="offer" />,
      categoryId: '',
    },
    {
      label: <FormattedMessage id="movies" />,
      href: { pathname: ROUTES.phim },
    },
    ...(dataCategorySSR || []).map((val) => ({
      label: val.name,
      categoryId: val.id,
    })),
  ]

  const TABS = [
    {
      label: 'videos',
      type: 'video',
    },
    {
      label: 'shorts',
      type: 'shorts',
    },
  ]

  return (
    <>
      <MenuCategories tabs={HOME_TABS} categoryId={categoryId} />
      <div className="container mb-[134px] min-h-[800px] px-3">
        <p className="pt-5 text-2xl font-semibold">
          <FormattedMessage id="favourites" />
        </p>
        <div className="sticky top-24 z-20 flex overflow-x-auto bg-black pt-9 pb-6 font-semibold">
          <div className="flex gap-5">
            {TABS.map((item, index) => {
              return (
                <MyLink key={index} href={{ query: { type: item.type } }}>
                  <button
                    className={`flex justify-center gap-1 whitespace-nowrap rounded-3xl px-3 py-1.5 ${
                      type === item.type
                        ? 'bg-white text-bg1'
                        : 'bg-bg2 text-inherit'
                    }  pt-1`}
                  >
                    {item.label && <FormattedMessage id={item.label} />}
                  </button>
                </MyLink>
              )
            })}
          </div>
        </div>
        {type === 'video' && <VideoList />}
        {type === 'shorts' && <ShortList />}
      </div>
    </>
  )
}

export default FavouritesPage
