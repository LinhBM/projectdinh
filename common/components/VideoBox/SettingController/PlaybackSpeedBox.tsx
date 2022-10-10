import { CheckIcon, LeftArrowIcon } from '@public/icons'
import { FormattedMessage } from 'react-intl'

export const OPTIONS_PLAYBACK = [
  {
    label: '0.25x',
    value: 0.25,
  },
  {
    label: '0.5x',
    value: 0.5,
  },
  {
    label: '0.75x',
    value: 0.75,
  },
  {
    label: <FormattedMessage id="normal" />,
    value: 1,
  },
  {
    label: '1.25x',
    value: 1.25,
  },
  {
    label: '1.5x',
    value: 1.5,
  },
  {
    label: '1.75x',
    value: 1.75,
  },
  {
    label: '2x',
    value: 2,
  },
]
interface Props {
  refVideo: any
  open: boolean
  onClose: () => void
  playbackRate: number
}

export default function PlaybackSpeedBox(props: Props) {
  const { playbackRate, open, refVideo, onClose } = props

  if (!open) {
    return null
  }

  return (
    <>
      <div
        className="flex w-full items-center gap-3 border-b border-neutral-200 py-4 px-4 "
        onClick={onClose}
      >
        <LeftArrowIcon className={'hidden md:block'} />
        <span className="headline  text-sm font-semibold">
          <FormattedMessage id="playbackSpeed" />
        </span>
      </div>
      {OPTIONS_PLAYBACK.map((item, index) => {
        return (
          <button
            key={index}
            className={
              'flex h-12 w-full items-center gap-3 py-3 px-4  text-sm' +
              (playbackRate === item.value ? 'text-primary' : '')
            }
            onClick={() => {
              refVideo.playbackRate(item.value)
              onClose()
            }}
          >
            {playbackRate === item.value ? (
              <CheckIcon />
            ) : (
              <div className="w-6 " />
            )}
            {item.label}
          </button>
        )
      })}
    </>
  )
}
