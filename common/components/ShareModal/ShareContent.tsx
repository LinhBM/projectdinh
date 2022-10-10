import { copyToClipboard } from '@common/helper'
import useGeneralHook from '@common/hook/useGeneralHook'
import {
  CloseIcon,
  GoogleIcon,
  MessageFacebookIcon,
  ShareLinkIcon,
  TelegramIcon,
  ZaloIcon,
  TwitterIcon,
} from '@public/icons'
import { stringify } from 'querystring'
import { FormattedMessage } from 'react-intl'
import Modal from '../Modal'

const LIST_SHARE = [
  {
    icon: <ShareLinkIcon />,
    name: 'shareLink',
  },
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
  onClose: (value: boolean) => void
  shareUrl?: string
}
const ShareContent = (props: Props) => {
  const { onClose, shareUrl } = props
  const { setMessage, intl } = useGeneralHook()
  if (!shareUrl) {
    return null
  }
  const onCopy = () => {
    copyToClipboard(shareUrl)
    setMessage({ message: intl.formatMessage({ id: 'copySuccess' }) })
    onClose(false)
  }
  return (
    <div className="px-6 pt-5 pb-6">
      <div className="mb-6 flex justify-between">
        <p className="title font-bold">
          <FormattedMessage id="share" />
        </p>
        <button onClick={() => onClose(false)}>
          <CloseIcon />
        </button>
      </div>
      <div className="mb-6 flex flex-row items-start gap-5 overflow-auto scrollbar-none-height">
        {LIST_SHARE.map((item, index) => {
          if (item.href) {
            return (
              <a
                key={index}
                href={item.href(shareUrl)}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex w-14 flex-col items-center justify-center text-center">
                  <div className="mb-2">{item.icon}</div>
                  <p className="caption2">
                    <FormattedMessage id={item.name} />
                  </p>
                </div>
              </a>
            )
          }
          return (
            <button
              className="flex w-14 flex-col items-center justify-center text-center"
              key={index}
              onClick={() => item.name === 'shareLink' && onCopy()}
            >
              <div className="mb-2">{item.icon}</div>
              <p className="caption2 whitespace-nowrap">
                <FormattedMessage id={item.name} />
              </p>
            </button>
          )
        })}
      </div>
      <div className="flex h-10 w-fit justify-between gap-9 rounded-xl bg-neutral-100 p-2.5 pl-3 pr-5">
        <p className="max-w-xs text-neutral-400 line-clamp-1">{shareUrl}</p>
        <button onClick={() => onCopy()}>
          <p className="headline font-bold uppercase text-primary">
            <FormattedMessage id="copy" />
          </p>
        </button>
      </div>
    </div>
  )
}

export default ShareContent
