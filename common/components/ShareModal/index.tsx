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
import ShareContent from './ShareContent'

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
  open: boolean
  onClose: (value: boolean) => void
  shareUrl?: string
}
const ShareModal = (props: Props) => {
  const { open, onClose, shareUrl } = props
  const { setMessage, intl } = useGeneralHook()
  if (!shareUrl) {
    return null
  }
  const onCopy = () => {
    copyToClipboard(shareUrl)
    setMessage({ message: intl.formatMessage({ id: 'copySuccess' }) })
  }
  return (
    <Modal open={open} onClose={onClose}>
      <ShareContent onClose={onClose} shareUrl={shareUrl} />
    </Modal>
  )
}

export default ShareModal
