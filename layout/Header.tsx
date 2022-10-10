import MyLink from '@common/components/MyLink'
import {
  ActiveHome,
  ExploreIcon,
  HeartFilled,
  HeartIcon,
  HomeIcon,
  LiveIcon,
  LogoIcon,
  LotusIcon,
  SearchIcon,
  UserIcon,
} from '@public/icons'
import { useRouter } from 'next/router'
import { FormattedMessage, useIntl } from 'react-intl'
import HeaderActionBox from './HeaderActionBox'

const ROUTES = [
  {
    icon: <HomeIcon />,
    activeIcon: <ActiveHome />,
    label: 'home',
    href: '/',
    children: ['/', '/video/[...slug]', '/phim', '/phim/[...slug]'],
  },
  {
    icon: <LotusIcon />,
    label: 'shortVideo',
    href: '/shorts',
    children: ['/shorts'],
  },
  {
    icon: <LiveIcon />,
    label: 'live',
    href: '/lives',
    children: ['/lives'],
  },
  {
    icon: <ExploreIcon />,
    label: 'explore',
    href: '/explore',
    children: ['/explore'],
  },
]

interface Props {}
const Header = (props: Props) => {
  const { pathname } = useRouter()
  const intl = useIntl()
  return (
    <header className={'sticky top-0 z-50 h-24 bg-black'}>
      <div className={'container flex h-full items-center gap-2 bg-black p-4 '}>
        <MyLink href="/">
          <div className="flex items-center gap-2">
            <LogoIcon />
            <p className="text-xl font-semibold leading-6">
              <FormattedMessage id="myClip" />
            </p>
          </div>
        </MyLink>
        <div className="ml-8 flex flex-1 gap-7 text-base">
          {ROUTES.map((item, index) => {
            return (
              <MyLink
                key={index}
                href={{
                  pathname: item.href,
                }}
                className={
                  'whitespace-nowrap font-bold ' +
                  (item.children.includes(pathname) ? '' : 'text-neutral-500')
                }
              >
                <FormattedMessage id={item.label} />
              </MyLink>
            )
          })}
        </div>
        <div className="flex items-center gap-6">
          <div className="text-field text-neutral-400">
            <SearchIcon />
            <input
              className="w-full border-none bg-transparent outline-none"
              placeholder={intl.formatMessage({ id: 'search' })}
              autoFocus
            />
          </div>
          <HeaderActionBox />
        </div>
      </div>
    </header>
  )
}
export default Header
