import { ImgHTMLAttributes } from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'
import { createPortal } from 'react-dom'
interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  placeholder?: string
  isAvatar?: boolean
}

const ProgressiveImg = (props: Props) => {
  const { src = '', placeholder, isAvatar, className = '', ...rest } = props
  return (
    <ProgressiveImage
      src={src}
      placeholder={
        placeholder ||
        (!!isAvatar ? '/icons/default_avatar.jpg' : '/icons/default_image.jpg')
      }
    >
      {(value, loading) => {
        return loading ? (
          <div className={'animate-pulse bg-bg2 ' + className} />
        ) : (
          <img
            alt="ProgressiveImage"
            className={className}
            {...rest}
            src={value}
          />
        )
      }}
    </ProgressiveImage>
  )
}
export default ProgressiveImg
