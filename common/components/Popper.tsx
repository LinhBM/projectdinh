import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  children?: any
  wrapper?: any
  className?: string
  classNamePaper?: string
  open: boolean
  onClose: () => void
}
const Popper = (props: Props) => {
  const {
    children,
    wrapper,
    className = '',
    classNamePaper = '',
    open,
    onClose = () => {},
  } = props
  const refRoot = useRef<HTMLDivElement | null>(null)
  const refContent = useRef<HTMLDivElement | null>(null)
  const ref = useRef<any>(null)
  const refStyle = useRef('')

  const content = useMemo(() => {
    const rect = refRoot?.current?.getBoundingClientRect()

    if (!rect) {
      return null
    }

    return (
      <>
        <div ref={refContent} className={'fixed inset-0 z-50 '}>
          <div
            className="fixed inset-0 -z-10 flex cursor-pointer items-center justify-center bg-transparent opacity-100 "
            onClick={(e) => onClose()}
          />
          <div
            className={
              '-translate-x-full animate-fade-in rounded-md bg-bg2 ' +
              classNamePaper
            }
            style={{
              position: 'absolute',
              top: rect?.y + 40,
              left: rect?.x + rect?.width,
            }}
          >
            {typeof children === 'function'
              ? children({ open, onClose })
              : children}
          </div>
        </div>
      </>
    )
  }, [children, classNamePaper, onClose, open])

  useEffect(() => {
    ref.current = document.getElementById('append-root')
  }, [])

  useEffect(() => {
    if (open) {
      refStyle.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '17px'
      document.addEventListener('scroll', onClose)
    } else {
      refContent.current && ref.current?.removeChild(refContent.current)
      document.body.style.overflow = refStyle.current
      document.body.style.paddingRight = 'unset'
      document.body.style.height = '100%'
      document.removeEventListener('scroll', onClose)
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.height = '100%'
      document.body.style.paddingRight = ''
      document.removeEventListener('scroll', onClose)
    }
  }, [content, onClose, open])

  return (
    <>
      <div
        tabIndex={-1}
        className={'h-fit w-fit cursor-pointer ' + className}
        ref={refRoot}
      >
        {wrapper}
      </div>
      {open && createPortal(content, ref.current)}
    </>
  )
}

export default Popper
