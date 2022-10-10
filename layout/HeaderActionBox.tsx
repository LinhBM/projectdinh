import Popper from '@common/components/Popper'
import {
  AddIcon,
  BookIcon,
  CameraOnIcon,
  CashIcon,
  ContactIcon,
  CrownIcon,
  DefaultAvavar,
  DocumentIcon,
  DollarIcon,
  HeartMenuIcon,
  LinkIcon,
  ListMenuIcon,
  LockedMenuIcon,
  LogoutIcon,
  NotificationIcon,
  RecentIcon,
  ShieldIcon,
  UserCheckedIcon,
  WatchLaterIcon,
} from '@public/icons'
import { ROUTES } from '@utility/constant'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

const HeaderActionBox = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const MENU_USER_2 = [
    {
      id: 'cash',
      list: [
        {
          name: 'dataPack',
          icon: <DollarIcon />,
        },
        {
          name: 'moneySign',
          icon: <CashIcon />,
        },
      ],
    },
    {
      id: 'scroreBoard',
      list: [
        {
          name: 'scoreBoard',
          icon: <CrownIcon />,
        },
      ],
    },
    {
      id: 'action',
      list: [
        {
          name: 'myVideo',
          icon: <CameraOnIcon />,
        },
        {
          name: 'favourites',
          icon: <HeartMenuIcon />,
          action: () => router.push({ pathname: ROUTES.favourites }),
        },
        {
          name: 'followChannels',
          icon: <UserCheckedIcon />,
        },
        {
          name: 'watchLater',
          icon: <WatchLaterIcon />,
        },
        {
          name: 'watchRecently',
          icon: <RecentIcon />,
        },
        {
          name: 'playlist',
          icon: <ListMenuIcon />,
        },
        {
          name: 'accountLink',
          icon: <LinkIcon />,
        },
      ],
    },
    {
      id: 'option',
      list: [
        {
          name: 'changePassword',
          icon: <LockedMenuIcon />,
        },
        {
          name: 'intro',
          icon: <DocumentIcon />,
        },
        {
          name: 'policy',
          icon: <ShieldIcon />,
        },
        {
          name: 'guide',
          icon: <BookIcon />,
        },
        {
          name: 'supportContact',
          icon: <ContactIcon />,
        },
      ],
    },
    {
      id: 'logout',
      list: [
        {
          name: 'logout',
          icon: <LogoutIcon />,
        },
      ],
    },
  ]

  return (
    <>
      <button className="btn uppercase">
        <AddIcon />
        <FormattedMessage id="create" />
      </button>
      <button>
        <NotificationIcon />
      </button>
      <Popper
        open={open}
        onClose={() => setOpen(false)}
        wrapper={
          <DefaultAvavar
            className="avatar h-10 w-10"
            onClick={() => setOpen(true)}
          />
        }
        classNamePaper="z-[100000]"
      >
        <div className="py-4">
          <div className="mb-5 flex items-center gap-3 px-5">
            <DefaultAvavar />
            <p>Misthy</p>
          </div>
          <div className={`max-h-[70vh] overflow-auto`}>
            {MENU_USER_2.map((v, index) => {
              return (
                <div key={v.id} className="mb-3.5">
                  <div className="mb-1.5 flex w-60 flex-col gap-4">
                    {v.list.map((item, index2) => (
                      <button
                        key={index2}
                        className="flex items-center gap-3 px-5 "
                        onClick={item.action}
                      >
                        {item.icon}
                        <p className={v.id === 'logout' ? 'text-red' : ''}>
                          <FormattedMessage id={item.name} />
                        </p>
                      </button>
                    ))}
                  </div>
                  {index + 1 < MENU_USER_2.length && (
                    <div className="divider mt-3.5" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Popper>
    </>
  )
}
export default HeaderActionBox
