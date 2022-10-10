import React, { useEffect, useRef, useState } from 'react'

interface Props {
  children?: any
  open: boolean
  onClose?: (val: boolean) => void
  classNamePaper?: string
  className?: string
  classNameBackdrop?: string
}

export default function DrawerFullScreen(props: Props) {
  const {
    children,
    classNamePaper = '',
    classNameBackdrop = '',
    className = '',
    open,
    onClose,
  } = props
  const refStyle = useRef('')
  const [openTmp, setOpenTmp] = useState(open)

  useEffect(() => {
    if (open) {
      setOpenTmp(true)
    }
  }, [open])

  if (!openTmp) {
    return null
  }

  return (
    <main className={'fixed inset-0 top-0 z-50 overflow-hidden bg-transparent'}>
      <section
        onAnimationEnd={() => {
          setOpenTmp(open)
          if (!open) {
            document.body!.style!.overflow = ''
          }
        }}
        onAnimationStart={() => {
          if (open) {
            refStyle.current = document.body.style.overflow
            document.body!.style!.overflow = 'hidden'
          } else {
            document.body.style.overflow = refStyle.current
          }
        }}
        className={
          'absolute left-0 top-1/2  right-0 min-h-[150px] overflow-hidden rounded-2xl bg-bg2 md:mx-auto md:max-w-sm ' +
          className +
          (open ? ' animate-slide-up' : ' animate-slide-up-out')
        }
        style={{transform: 'translateY(-50%)'}}
      >
        <article
          className={
            'relative flex max-h-screen w-full flex-col ' + classNamePaper
          }
        >
          {children}
        </article>
      </section>
      <section
        className={
          'h-full w-screen cursor-none bg-black bg-opacity-60 ' +
          (open ? '' : ' hidden ') +
          classNameBackdrop
        }
        onClick={() => {
          onClose && onClose(false)
        }}
      ></section>
    </main>
  )
}
