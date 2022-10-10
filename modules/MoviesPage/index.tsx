import MyLink from '@common/components/MyLink'
import { some } from '@common/constants'
import MenuCategories from '@modules/HomePage/MenuCategories'
import { ExploreIcon, PhimIcon } from '@public/icons'
import { ROUTES } from '@utility/constant'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import AllFilmBox from './AllFilmBox'
import TopicFilmBox from './TopicFilmBox'

interface Props {
  dataTopicSSR: some[]
  dataFilmSSR: some[]
  topicSSR: some[]
  dataCategorySSR: some[]
}

const MoviesPage = (props: Props) => {
  const { query } = useRouter()
  const { dataFilmSSR, topicSSR, dataTopicSSR, dataCategorySSR } = props
  const categoryId = query.categoryId ? Number(query.categoryId) : 'phim'
  const { topic_id = '' } = query

  const TABS = [
    {
      id: '',
      name: <FormattedMessage id={'all'} />,
    },
    ...(dataTopicSSR || []),
  ]

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
      categoryId: 'phim',
    },
    ...(dataCategorySSR || []).map((val) => ({
      label: val.name,
      categoryId: val.id,
    })),
  ]

  return (
    <div className="container min-h-[800px]">
      <MenuCategories tabs={HOME_TABS} categoryId={categoryId} />
      {/* <div className=" animate-pulse ">
        <div className="h-72 w-full rounded-2xl bg-neutral-500" />
      </div> */}
      <div className="flex h-[120px] items-center  px-3">
        <div className="flex h-[72px] items-center gap-6">
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#ffffff26]">
            <PhimIcon />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">
              <FormattedMessage id={'movie'} />
            </p>
            <p>
              <span className="mr-2 text-base font-[700]">
                {new Intl.NumberFormat('de-DE').format(23563254)}
              </span>
              <span className="font-[600] text-[#8A8B93]">
                <FormattedMessage id={'view'} />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-10 scrollbar-x sticky top-24 flex gap-3 overflow-x-auto overflow-y-hidden bg-bg1 px-3">
        {TABS.map((item, index) => {
          return (
            <MyLink
              key={index}
              href={{
                query: { ...query, topic_id: `${item.id}` },
              }}
              className={
                'flex flex-col font-bold ' +
                (topic_id === `${item.id}`
                  ? 'text-inherit '
                  : 'text-neutral-500')
              }
            >
              <div className="flex gap-1 whitespace-nowrap px-2 pt-1 font-semibold">
                {item.name}
              </div>
              {topic_id === `${item.id}` && (
                <div className="mt-0.5 h-1 w-full rounded bg-primary" />
              )}
            </MyLink>
          )
        })}
      </div>
      <AllFilmBox dataFilmSSR={dataFilmSSR} />
      <TopicFilmBox topicSSR={topicSSR} />
    </div>
  )
}

export default MoviesPage
