import { copyToClipboard } from '@common/helper'
import useGeneralHook from '@common/hook/useGeneralHook'
import {
  CloseIcon,
  GoogleIcon,
  MessageFacebookIcon,
  ShareLinkIcon,
  TelegramIcon,
  TwitterIcon,
  ZaloIcon,
} from '@public/icons'
import { stringify } from 'querystring'
import { FormattedMessage } from 'react-intl'
import DrawerFullScreen from '../DrawerFullScreen'
import ShareModal from '../ShareModal'

const LIST_SHARE = [
  {
    icon: <MessageFacebookIcon />,
    name: 'facebookMessenger',
    href: (url: string) =>
      `https://www.facebook.com/dialog/share?app_id=1144853306266692&&href=${encodeURIComponent(
        url
      )}&display=popup`,
  },
  {
    icon: <TwitterIcon />,
    name: 'twitter',
    href: (url) => `https://twitter.com/share?url=${url}`,
  },
  {
    icon: <GoogleIcon />,
    name: 'gmail',
    href: (url: string, subject?: string) =>
      `mailto:?${stringify({ url, subject })}`,
  },

  {
    icon: <TelegramIcon />,
    name: 'telegram',
    href: (url: string) => `https://t.me/share/url?url=${url}`,
  },
  {
    icon: <ZaloIcon />,
    name: 'zalo',
    href: (url: string) => `https://chat.zalo.me/`,
  },
]

interface Props {
  open: boolean
  onClose: (value: boolean) => void
  shareUrl?: string
}
const ShareDrawer = (props: Props) => {
  const { open, onClose, shareUrl = '' } = props
  const { setMessage } = useGeneralHook()

  return (
    <ShareModal {...props} />
    // <DrawerFullScreen open={open} onClose={onClose}>
    //   <div
    //     className="flex h-6 items-center justify-center md:hidden"
    //     onClick={() => onClose(open)}
    //   >
    //     <div className="h-1 w-8 shrink-0 rounded bg-neutral-200" />
    //   </div>
    //   <div className="px-3 py-3">
    //     <div className="headline mb-5 flex items-start justify-between font-bold">
    //       <FormattedMessage id="share" />
    //       <button onClick={() => onClose(open)}>
    //         <CloseIcon />
    //       </button>
    //     </div>
    //     <div className="flex flex-row items-start gap-5 overflow-auto scrollbar-none-height">
    //       <button
    //         className="flex w-14 flex-col items-center justify-center text-center "
    //         onClick={() => {
    //           const success = copyToClipboard(shareUrl)
    //           if (success) {
    //             setMessage({ message: <FormattedMessage id="copySuccess" /> })
    //             onClose(false)
    //           }
    //         }}
    //       >
    //         <div className="mb-2 text-primary">
    //           <ShareLinkIcon />
    //         </div>
    //         <p className="caption2 whitespace-nowrap">
    //           <FormattedMessage id={'shareLink'} />
    //         </p>
    //       </button>
    //       {LIST_SHARE.map((item, index) => {
    //         return (
    //           <a
    //             key={index}
    //             href={item.href(shareUrl)}
    //             target="_blank"
    //             rel="noreferrer"
    //             onClick={() => onClose(false)}
    //           >
    //             <div className="flex w-14 flex-col items-center justify-center text-center">
    //               <div className="mb-2">{item.icon}</div>
    //               <p className="caption2">
    //                 <FormattedMessage id={item.name} />
    //               </p>
    //             </div>
    //           </a>
    //         )
    //       })}
    //     </div>
    //   </div>
    // </DrawerFullScreen>
  )
}

export default ShareDrawer
