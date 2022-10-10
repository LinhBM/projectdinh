import DrawerFullScreen from '@common/components/DrawerFullScreen'
import { some } from '@common/constants'
import {
  CloseIcon,
  HeartIcon,
  LeftArrowIcon,
  MessageIcon,
  SendIcon,
  SortListIcon,
} from '@public/icons'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import ProgressiveImg from '../ProgressiveImg'

interface Props {
  data?: some
  onSubmit: (value: some, callback?: () => void) => void
  onClose: () => void
  open: boolean
}

const ReplyBox = (props: Props) => {
  const { open, data = {}, onClose, onSubmit } = props
  const intl = useIntl()

  const { register, handleSubmit, reset, setFocus } = useForm<{
    comment: string
    parent_id?: string
  }>({
    defaultValues: {},
  })

  const renderComment = useCallback((listComment: some[]) => {
    return listComment?.map((item, i) => {
      return (
        <div key={item.id} className="flex gap-3 p-3">
          <ProgressiveImg
            src={item.channel?.avatarImage}
            alt="avatarImage"
            className="avatar h-8 w-8"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="caption1 font-bold">{item.channel?.name}</p>
              <p>•</p>
              <p className="caption1 text-neutral-400">{item.createdAt}</p>
            </div>
            <div className="caption1 break-all">{item.comment}</div>
            <div className="flex gap-6 text-neutral-500">
              <div className="flex items-center">
                <HeartIcon className="scale-75" />
                <p className="caption1"> {item.likeCount}</p>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }, [])

  useEffect(() => {
    reset({ parent_id: data.id })
  }, [data.id, reset])
  return (
    <>
      <DrawerFullScreen
        open={open}
        onClose={onClose}
        classNamePaper="max-h-[50vh] h-[50vh] overflow-hidden"
      >
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-bg2 p-3">
          <div onClick={() => onClose()}>
            <LeftArrowIcon />
          </div>
          <p className="flex-1">
            <FormattedMessage id="reply" />
          </p>
          <div>
            <SortListIcon />
          </div>
          <div onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className="flex gap-3 p-3">
          <ProgressiveImg
            src={data.channel?.avatarImage}
            alt="avatarImage"
            className="avatar h-8 w-8 bg-bg1"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <p className="caption1 font-bold">{data.channel?.name}</p>
              <p>•</p>
              <p className="caption1 text-neutral-400">{data.createdAt}</p>
            </div>
            <div className="caption1 break-all">{data.comment}</div>
            <div className="flex gap-6 text-neutral-500">
              <div className="flex items-center">
                <HeartIcon className="scale-75" />
                <p className="caption1"> {data?.likeCount}</p>
              </div>
              <div
                className=" flex items-center"
                onClick={() => {
                  setFocus('comment')
                }}
              >
                <MessageIcon className="scale-75" />
                <p className="caption1"> {data.commentCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-10 flex h-full flex-col overflow-auto">
          {renderComment(data.children)}
        </div>
        <div className="sticky bottom-0 z-10 flex gap-2 border-t border-neutral-100 bg-bg2 px-3 py-4">
          <div className="avatar h-8 w-8"></div>
          <form
            onSubmit={handleSubmit((value) => {
              onSubmit(value, () => {
                reset()
              })
            })}
            className="text-field"
          >
            <input
              className="w-full border-none bg-transparent outline-none"
              {...register('comment', { required: false, minLength: 10 })}
              placeholder={intl.formatMessage({ id: 'yourComment' })}
              autoFocus
            />
            <button aria-label={'search-btn'} type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
      </DrawerFullScreen>
    </>
  )
}

export default ReplyBox
