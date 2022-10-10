import React from 'react'
interface Props {
  children: any
  open: boolean
  onClose: (val: boolean) => void
  classNamePaper?: string
  className?: string
}

export default function Drawer(props: Props) {
  const { children, classNamePaper, className = '', open, onClose } = props
  return (
    <main
      className={
        'fixed inset-0 top-0 z-50 transform overflow-hidden bg-transparent ease-in-out' +
        (open
          ? ' translate-y-0 opacity-100 transition-opacity duration-500 '
          : ' translate-y-full opacity-0 transition-all delay-500  ')
      }
    >
      <section
        className={
          'delay-400 absolute left-3 bottom-6  right-3 min-h-[150px] transform rounded-2xl bg-bg2 transition-all duration-500 ease-in-out md:mx-auto md:max-w-sm ' +
          className +
          (open ? ' translate-y-0' : ' translate-y-full')
        }
      >
        <div className="flex h-6 items-center justify-center">
          <div className="h-1 w-8 shrink-0 bg-neutral-200 rounded" />
        </div>
        <article
          className={
            'relative flex h-full max-h-[75vh] w-full flex-col overflow-y-scroll ' +
            classNamePaper
          }
        >
          {children}
        </article>
      </section>
      <section
        className="h-full w-screen cursor-none "
        onClick={() => {
          onClose(false)
        }}
      ></section>
    </main>
  )
}
