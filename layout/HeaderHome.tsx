import { LogoIcon } from '@public/icons'
import { FormattedMessage } from 'react-intl'
import HeaderActionBox from './HeaderActionBox'

const HeaderHome = () => {
  return (
    <header
      className={
        'sticky top-0 z-30 flex h-14 items-center justify-between gap-2 bg-black p-4'
      }
    >
      <LogoIcon />

      <HeaderActionBox />
    </header>
  )
}
export default HeaderHome
