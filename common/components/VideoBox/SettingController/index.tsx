import { PlaybackSpeedIcon, SettingIcon } from '@public/icons'
import { useCallback, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { MetaData } from '..'
import PlaybackQualityBox from './PlaybackQualityBox'
import PlaybackSpeedBox, { OPTIONS_PLAYBACK } from './PlaybackSpeedBox'

interface Props {
  refVideo: any
  qualityControlRef: any
  metadata: MetaData
  open: boolean
}

export default function SettingController(props: Props) {
  const { open, refVideo, metadata, qualityControlRef } = props
  const [openSpeedControl, setOpenSpeedControl] = useState(false)
  const [openQualityControl, setOpenQualityControl] = useState(false)

  const isAutoQuality = useCallback(() => {
    for (var i = 0; i < qualityControlRef?.length; i++) {
      let qualityLevel = qualityControlRef[i]
      if (!qualityLevel.enabled) {
        return false
      }
    }
    return true
  }, [qualityControlRef])

  const OPTIONS = useMemo(() => {
    return [
      {
        icon: <SettingIcon />,
        label: (
          <span>
            <FormattedMessage id="quality" />
            {metadata.quality?.height && (
              <span className="text-neutral-300">
                &nbsp;•&nbsp;
                {isAutoQuality() ? (
                  <><FormattedMessage id="autoQuality" /> ({metadata.quality.height}p)</>
                  
                ) : (
                  `${metadata.quality?.height}p`
                )}
              </span>
            )}
          </span>
        ),
        onClick: () => setOpenQualityControl(true),
      },
      {
        icon: <PlaybackSpeedIcon />,
        label: (
          <span>
            <FormattedMessage id="playbackSpeed" />
            {metadata.quality?.height && (
              <span className="text-neutral-300">
                &nbsp;•&nbsp;
                {
                  OPTIONS_PLAYBACK.find(
                    (v) => v.value === metadata.playbackRate
                  )?.label
                }
              </span>
            )}
          </span>
        ),
        onClick: () => setOpenSpeedControl(true),
      },
    ]
  }, [isAutoQuality, metadata.playbackRate, metadata.quality?.height])

  const settingContent = useMemo(() => {
    if (openSpeedControl || openQualityControl) {
      return null
    }
    return (
      <>
        {OPTIONS.map((item, index) => {
          return (
            <button
              key={index}
              className="flex w-full items-center gap-3 py-3 px-4"
              onClick={() => {
                item.onClick && item.onClick()
              }}
            >
              {item.icon}
              {item.label}
            </button>
          )
        })}
      </>
    )
  }, [OPTIONS, openQualityControl, openSpeedControl])

  if (!open) {
    return null
  }

  return (
    <>
      <div
        className="qualityControl-video z-10 absolute right-4 bottom-14 w-[263px] overflow-hidden rounded-lg bg-bg2 bg-opacity-80 backdrop-blur-[27px] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {settingContent}
        <PlaybackQualityBox
          qualityControlRef={qualityControlRef}
          open={openQualityControl}
          qualityMetaData={metadata.quality}
          onClose={() => setOpenQualityControl(false)}
          isAuto={isAutoQuality()}
        />
        <PlaybackSpeedBox
          refVideo={refVideo}
          open={openSpeedControl}
          playbackRate={metadata.playbackRate}
          onClose={() => setOpenSpeedControl(false)}
        />
      </div>
    </>
  )
}
