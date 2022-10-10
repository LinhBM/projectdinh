import Drawer from '@common/components/Drawer'
import ShareDrawer from '@common/components/ShareDrawer'
import { VideoObject } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import {
  AddListIcon,
  DownloadIcon,
  ReportIcon,
  ShareIcon,
  StopIcon,
} from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useCallback, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import DrawerReportVideo from './VideoBox/SettingController/DrawerReportVideo'
import WatchLaterDrawer from './WatchLaterDrawer'

export interface VideoCardProps {
  videoData?: VideoObject
  open: boolean
  onClose: (value: boolean) => void
  hiddenBlockChannel?: boolean
}

const VideoOptionDrawer = ({
  videoData,
  open,
  onClose,
  hiddenBlockChannel,
}: VideoCardProps) => {
  const { setMessage, dispatch } = useGeneralHook()
  const [shareVideo, setShareVideo] = useState(false)
  const [openPlaylist, setOpenPlayList] = useState(false)
  const [openReport, setOpenReport] = useState(false)
  const [dataTmp, setDataTmp] = useState<VideoObject | undefined>()

  const onDislikeChannel = useCallback(async () => {
    try {
      const json = await dispatch(
        fetchThunk(
          {
            url: API_PATHS.user.dislikeChannel,
            method: 'POST',
            data: {
              channel_id: dataTmp?.filmChannel?.id || dataTmp?.channel?.id,
            },
          },
          true
        )
      )
      setMessage({ message: json.data?.message })
      onClose(false)
    } catch (e: any) {
      setMessage({ message: e.response?.data?.message })
    }
  }, [
    dispatch,
    onClose,
    setMessage,
    dataTmp?.channel?.id,
    dataTmp?.filmChannel?.id,
  ])

  useEffect(() => {
    if (open) {
      setDataTmp(videoData)
    }
  }, [open, videoData])

  return (
    <>
      <Drawer open={open} onClose={onClose}>
        {[
          {
            icon: <AddListIcon />,
            label: <FormattedMessage id="addList" />,
            onClick: () => setOpenPlayList(true),
          },
          {
            icon: <DownloadIcon />,
            label: <FormattedMessage id="download" />,
          },
          {
            icon: <ShareIcon />,
            label: <FormattedMessage id="share" />,
            onClick: () => setShareVideo(true),
            hidden: !dataTmp?.linkShare,
          },
          {
            icon: <StopIcon />,
            onClick: () => onDislikeChannel(),
            label: <FormattedMessage id="blockThisChanel" />,
            hidden: !!hiddenBlockChannel || !dataTmp?.channel?.id,
          },
          {
            icon: <ReportIcon />,
            onClick: () => setOpenReport(true),
            hidden: !dataTmp?.id,
            label: <FormattedMessage id="report" />,
          },
        ]
          .filter((v) => !v.hidden)
          .map((item, index) => {
            return (
              <button
                key={index}
                className="subtitle flex gap-4 px-5 py-3"
                onClick={() => {
                  item.onClick && item.onClick()
                  onClose && onClose(false)
                }}
              >
                {item.icon}
                {item.label}
              </button>
            )
          })}
      </Drawer>
      <ShareDrawer
        open={shareVideo}
        onClose={() => setShareVideo(false)}
        shareUrl={dataTmp?.linkShare}
      />
      <WatchLaterDrawer
        data={dataTmp}
        open={openPlaylist}
        onClose={() => setOpenPlayList(false)}
      />
      <DrawerReportVideo
        open={openReport}
        onClose={setOpenReport}
        data={dataTmp}
      />
    </>
  )
}

export default VideoOptionDrawer
