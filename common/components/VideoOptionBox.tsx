import api from '@common/api'
import ShareModal from '@common/components/ShareModal'
import { VideoObject } from '@common/constants'
import useGeneralHook from '@common/hook/useGeneralHook'
import ReportVideoModal from '@common/ReportVideoModal'
import {
  AddListIcon,
  DownloadIcon,
  ReportIcon,
  ShareIcon,
  StopIcon,
} from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useCallback, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import WatchLaterModal from './WatchLaterModal/WatchLaterModal'

export interface VideoCardProps {
  videoData?: VideoObject | any
  onCloseModal: () => void
}

const VideoOptionBox = ({ videoData, onCloseModal }: VideoCardProps) => {
  const { setMessage } = useGeneralHook()
  const [shareVideo, setShareVideo] = useState(false)
  const [openPlaylist, setOpenPlayList] = useState(false)
  const [openReport, setOpenReport] = useState(false)
  const [hiddenModal, setHiddenModal] = useState(false)

  const onDislikeChannel = useCallback(async () => {
    const json = await api({
      url: API_PATHS.user.dislikeChannel,
      method: 'POST',
      data: { channel_id: videoData?.channel?.id },
    })
    setMessage({ message: json.data?.message })
  }, [setMessage, videoData?.channel?.id])

  return (
    <>
      {!hiddenModal &&
        [
          {
            icon: <AddListIcon />,
            label: <FormattedMessage id="addList" />,
            onClick: () => {
              setOpenPlayList(true)
              setHiddenModal(true)
            },
          },
          { icon: <DownloadIcon />, label: <FormattedMessage id="download" /> },
          {
            icon: <ShareIcon />,
            label: <FormattedMessage id="share" />,
            onClick: () => {
              setShareVideo(true)
              setHiddenModal(true)
            },
            hidden: !videoData?.linkShare,
          },
          {
            icon: <StopIcon />,
            onClick: () => onDislikeChannel(),
            label: <FormattedMessage id="blockThisChanel" />,
          },
          {
            icon: <ReportIcon />,
            onClick: () => {
              setOpenReport(true)
              setHiddenModal(true)
            },
            hidden: !videoData?.id,
            label: <FormattedMessage id="report" />,
          },
        ].map((item, index) => {
          return (
            <button
              key={index}
              className="subtitle flex w-full gap-4 whitespace-nowrap px-5 py-3 font-normal hover:bg-neutral-100"
              onClick={item.onClick}
            >
              {item.icon}
              {item.label}
            </button>
          )
        })}

      <ShareModal
        open={shareVideo}
        onClose={() => {
          setShareVideo(false)
          onCloseModal()
        }}
        shareUrl={videoData?.linkShare}
      />
      <WatchLaterModal
        data={videoData}
        open={openPlaylist}
        onClose={() => {
          setOpenPlayList(false)
          onCloseModal()
        }}
      />
      <ReportVideoModal
        open={openReport}
        onClose={(val) => {
          setOpenReport(val)
          onCloseModal()
        }}
        data={videoData}
        setMessage={setMessage}
      />
    </>
  )
}

export default VideoOptionBox
