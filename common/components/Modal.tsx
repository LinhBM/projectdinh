import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal, re } from 'react-dom'
interface Props {
  children?: any
  className?: string
  open: boolean
  onClose?: (open: boolean) => void
  refParent?: any
}

const Content = (props: Props) => {
  const { onClose, className = '', children, open } = props
  const refContent = useRef<HTMLDivElement | null>(null)
  const refStyle = useRef('')
  useEffect(() => {
    if (open) {
      refStyle.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '17px'
    } else {
      document.body.style.overflow = refStyle.current
      document.body.style.paddingRight = ''
    }
  }, [open])

  return (
    <>
      <div ref={refContent} className={'fixed inset-0 z-50 '}>
        <div
          className="fixed inset-0 -z-10 flex cursor-pointer items-center justify-center bg-black bg-opacity-50 opacity-100 "
          onClick={(e) => {
            onClose && onClose(false)
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
          }}
        />
        <div
          className={
            'absolute top-1/2 left-1/2 max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-2xl bg-bg2  ' +
            className
          }
        >
          {children}
        </div>
      </div>
    </>
  )
}

const Modal = (props: Props) => {
  const { open, refParent } = props
  const ref = useRef<any>(null)

  useEffect(() => {
    ref.current = refParent || document.getElementById('append-root')
  }, [refParent])

  return <>{open && createPortal(<Content {...props} />, ref.current)}</>
}

export default Modal
