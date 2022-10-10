import api from '@common/api'
import { some } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useCheckLikeVideo from '@common/hook/useCheckLikeVideo'
import useGeneralHook from '@common/hook/useGeneralHook'
import ReportVideoModal from '@common/ReportVideoModal'
import {
  DownloadIcon,
  HeartIcon,
  MessageIcon,
  ReportIcon,
  ShareIcon,
} from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import useSWR from 'swr'
import ShareModal from '../ShareModal'
import LikeBox from './LikeBox'
import ReportBox from './ReportBox'
import WatchLaterBox from './WatchLaterBox'

interface Props {
  data: some | any
  setOpenComment: (value: boolean) => void
  setOpenShare: (value: boolean) => void
}

const ActionBox = (props: Props) => {
  const { setMessage, dispatch } = useGeneralHook()
  const { data, setOpenComment } = props
  const [openReport, setOpenReport] = useState(false)
  const [openShare, setOpenShare] = useState(false)

  const TABS = [
    {
      component: <LikeBox data={data} />,
    },
    {
      component: <WatchLaterBox data={data} />,
    },
    {
      icon: <ShareIcon />,
      label: <FormattedMessage id="share" />,
      onClick: () => setOpenShare(true),
    },
    {
      icon: <ReportIcon />,
      label: <FormattedMessage id="report" />,
      onClick: () => setOpenReport(true),
    },
  ]
  return (
    <div className="flex gap-5 text-neutral-500">
      {TABS.map((item, index) => {
        if (item.component) {
          return <React.Fragment key={index}>{item.component}</React.Fragment>
        }
        return (
          <button
            key={index}
            className="flex items-center gap-2"
            onClick={item.onClick}
          >
            {item.icon}
            <p className="caption1">{item.label}</p>
          </button>
        )
      })}
      <ReportVideoModal
        open={openReport}
        onClose={(val) => {
          setOpenReport(val)
          document.body.style.overflow = 'auto'
          document.body.style.paddingRight = ''
        }}
        data={data}
        setMessage={setMessage}
      />
      <ShareModal
        open={openShare}
        onClose={() => {
          setOpenShare(false)
          document.body.style.overflow = 'auto'
          document.body.style.paddingRight = ''
        }}
        shareUrl={data?.linkShare}
      />
    </div>
  )
}

export default ActionBox
