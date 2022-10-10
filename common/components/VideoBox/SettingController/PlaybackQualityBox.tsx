import { CheckIcon, LeftArrowIcon } from '@public/icons'
import { FormattedMessage } from 'react-intl'
import { MetaData } from '..'

interface Props {
  qualityControlRef: any
  open: boolean
  onClose: () => void
  qualityMetaData?: MetaData['quality']
  isAuto?: boolean
}

export default function PlaybackQualityBox(props: Props) {
  const { qualityMetaData, open, qualityControlRef, isAuto, onClose } = props

  if (!open) {
    return null
  }

  return (
    <>
      <div
        className={
          'flex w-full items-center gap-3 border-b border-neutral-200 py-4 px-4 '
        }
        onClick={onClose}
      >
        <LeftArrowIcon className={'hidden md:block'} />
        <span className="headline  text-sm font-semibold">
          <FormattedMessage id="playbackQuality" />
        </span>
      </div>

      {qualityControlRef?.levels_?.map((item) => {
        return (
          <button
            key={item.id}
            className={
              'flex h-12 w-full items-center gap-3 py-3 px-4  text-sm' +
              (!isAuto && qualityMetaData?.id === item.id ? 'text-primary' : '')
            }
            onClick={() => {
              for (var i = 0; i < qualityControlRef.length; i++) {
                let qualityLevel = qualityControlRef[i]
                if (qualityLevel.id === item.id) {
                  qualityLevel.enabled = true
                } else {
                  qualityLevel.enabled = false
                }
              }
              // onClose()
            }}
          >
            {!isAuto && qualityMetaData?.id === item.id ? (
              <CheckIcon />
            ) : (
              <div className="w-6" />
            )}
            {item.height}p
          </button>
        )
      })}
      <button
        className={
          'flex h-12 w-full items-center gap-3 py-3 px-4  text-sm' +
          (isAuto ? 'text-primary' : '')
        }
        onClick={() => {
          for (var i = 0; i < qualityControlRef.length; i++) {
            let qualityLevel = qualityControlRef[i]
            qualityLevel.enabled = true
          }
          // onClose()
        }}
      >
        {isAuto ? <CheckIcon /> : <div className="w-6" />}
        <FormattedMessage id="autoQuality" />
      </button>
      <div className="divider" />
    </>
  )
}
