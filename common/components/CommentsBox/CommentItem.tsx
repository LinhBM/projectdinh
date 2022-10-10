import { some } from '@common/constants'
import useGeneralHook from '@common/hook/useGeneralHook'
import {
  DeleteIcon,
  EditPen,
  HeartIcon,
  MessageIcon,
  MoreIcon,
} from '@public/icons'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import Popper from '../Popper'
import ProgressiveImg from '../ProgressiveImg'

type Props = {
  item: some
  onReplyMessage: (data: any) => void
}

type State = {}

const CommentItem = (props: Props) => {
  const { item, onReplyMessage } = props
  const [open, setOpen] = useState(false)
  const [openReply, setOpenReply] = useState(false)
  const { register, handleSubmit, reset, control } = useForm<{
    comment: string
    parent_id?: string
  }>()
  const { setMessage, appState, intl, dispatch, isLogin } = useGeneralHook()

  const onSubmit = (values: any) => {
    onReplyMessage({ values, content_id: item.id })
  }

  return (
    <React.Fragment key={item.id}>
      <div className="flex w-full  gap-3 p-3 text-sm">
        <ProgressiveImg
          src={item.channel?.avatarImage}
          alt="avatarImage"
          isAvatar
          className="avatar h-8 w-8 bg-bg1"
        />
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-1">
              {item.channel?.name && (
                <p className="caption1 text-base font-bold">
                  {item.channel?.name}
                </p>
              )}
              <p className="caption1  text-sm text-neutral-400">
                &nbsp;•&nbsp;{item.createdAt}
              </p>
            </div>
            <Popper
              open={open}
              onClose={() => setOpen(false)}
              wrapper={
                <button onClick={() => setOpen(true)}>
                  <MoreIcon />
                </button>
              }
              classNamePaper="z-[100000]"
            >
              <div className="flex flex-col rounded bg-neutral-700">
                <button
                  className="subtitle flex w-full gap-4 whitespace-nowrap rounded px-5 py-3 font-normal hover:bg-neutral-100"
                  onClick={item.onClick}
                >
                  <EditPen />
                  <FormattedMessage id="edit" />
                </button>
                <button
                  className="subtitle flex w-full gap-4 whitespace-nowrap rounded px-5 py-3 font-normal hover:bg-neutral-100"
                  onClick={item.onClick}
                >
                  <DeleteIcon />
                  <FormattedMessage id="deleteComment" />
                </button>
              </div>
            </Popper>
          </div>
          <div className="caption1 break-all text-sm">{item.comment}</div>
          <div className="flex gap-6 text-neutral-500">
            <div
              className="flex items-center"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <HeartIcon className="scale-75" />
              <p className="caption1"> {item.likeCount}</p>
            </div>
            <div
              className=" flex items-center"
              onClick={(e) => {
                e.stopPropagation()
                // setReplyData(item)
              }}
            >
              <MessageIcon className="scale-75" />
              <p className="caption1"> {item.commentCount}</p>
            </div>
            <div
              className=" flex items-center"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <button
                className=" text-xs text-white"
                onClick={() => setOpenReply(true)}
              >
                <FormattedMessage id="reply" />
              </button>
            </div>
          </div>
          {openReply === true && (
            <form
              className="w-full max-w-[600px]"
              onSubmit={handleSubmit((value) => {
                onSubmit(value)
              })}
            >
              <Controller
                name="comment"
                control={control}
                rules={{
                  required: true,
                  validate: (value) => !!value?.trim(),
                }}
                render={({
                  field: { name, onBlur, onChange, ref, value = '' },
                }) => {
                  return (
                    <div className="my-3 flex w-full flex-col gap-3 px-0">
                      <input
                        className="text-field border border-transparent outline-none focus:border-primary"
                        name={name}
                        onBlur={onBlur}
                        onChange={onChange}
                        ref={ref}
                        value={value}
                        placeholder={
                          intl.formatMessage({
                            id: 'enterFeedback',
                          }) + '...'
                        }
                      />
                    </div>
                  )
                }}
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setOpenReply(false)}
                  className="btn w-24 text-sm font-semibold"
                >
                  <FormattedMessage id="cancel" />
                </button>
                <button
                  aria-label={'search-btn'}
                  type="submit"
                  className="btn w-30 bg-primary text-sm font-semibold"
                >
                  <FormattedMessage id="feedback" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  )
}

export default CommentItem
