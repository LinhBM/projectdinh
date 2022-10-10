import DrawerFullScreen from '@common/components/DrawerFullScreen'
import { some } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import {
  CloseIcon,
  DefaultAvavar,
  DeleteIcon,
  EditPen,
  HeartIcon,
  LeftArrowIcon,
  LoadingIcon,
  MessageIcon,
  SendIcon,
  SortListIcon,
} from '@public/icons'
import { setOpenLoginDialog } from '@redux/commonReducer'
import { API_PATHS } from '@utility/API_PATH'
import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import useSWRInfinite from 'swr/infinite'
import Drawer from '../Drawer'
import ProgressiveImg from '../ProgressiveImg'
import TouchContainer from '../TouchContainer'
import CommentItem from './CommentItem'
import ReplyBox from './ReplyBox'
interface Props {
  type: 'PLAYLIST' | 'VOD' | 'SHORT'
  contentId?: number
  open: boolean
  setOpen: (value: boolean) => void
  total?: number
}

const CommentsBox = (props: Props) => {
  const {
    total = 0,
    type = 'PLAYLIST',
    contentId: content_id = '',
    open,
    setOpen,
  } = props
  const { setMessage, appState, intl, dispatch, isLogin } = useGeneralHook()
  const [replyData, setReplyData] = useState<some | undefined>()
  const [openOption, setOpenOption] = useState(false)

  const { register, handleSubmit, reset, control } = useForm<{
    comment: string
    parent_id?: string
  }>()

  const {
    data: listComment = [],
    mutate,
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index) =>
      content_id
        ? API_PATHS.comment.get({
            content_id,
            type,
            page_token: index,
            page_size: 12,
          })
        : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
      return json?.data?.data?.[0]?.contents
    },
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      revalidateAll: true,
    }
  )

  const mappedData = useMemo(() => {
    return listComment.filter(Boolean)?.reduce((v, c) => {
      return [...v, ...c]
    }, [])
  }, [listComment])

  const onScroll = useCallback(
    (e) => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 290 * 2 &&
        !isValidating &&
        listComment?.every((item) => item.length > 0)
      ) {
        setSize(size + 1)
      }
    },
    [listComment, isValidating, setSize, size]
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  const onSubmit = useCallback(
    async ({ values, id_content }, callback?: () => void) => {
      console.log(values, id_content)

      if (isLogin) {
        try {
          await dispatch(
            fetchThunk({
              url: API_PATHS.comment.sendComment,
              method: 'post',
              data: {
                ...values,
                content_id: id_content,
                type,
              },
            })
          )
        } catch (e: any) {
          setMessage({ message: e.response?.data })
        } finally {
          reset()
          mutate()
          callback && callback()
        }
      } else {
        setMessage({ message: 'isLogin = false' })
      }
    },
    [dispatch, isLogin, mutate, reset, setMessage, type]
  )

  const onReplyMessage = useCallback(
    ({ values, content_id }) => {
      onSubmit({ values, id_content: content_id })
    },
    [onSubmit]
  )

  const renderComment = useCallback(
    (listComment: some[]) => {
      return listComment.map((item, i) => {
        return (
          <CommentItem item={item} key={i} onReplyMessage={onReplyMessage} />
        )
      })
    },
    [onReplyMessage]
  )
  console.log(total, 'total')

  return (
    <div className="z-10 mt-5 gap-2 rounded-xl bg-bg2 px-2 pb-4">
      <div className="flex h-14 items-center gap-4 px-3">
        <p className="text-xl font-bold">
          {total > 0 ? total : ''}&nbsp; <FormattedMessage id="comment" />
        </p>
        <button className="flex text-neutral-400">
          <SortListIcon /> <FormattedMessage id="orderBy" />
        </button>
      </div>
      <div>
        <form
          onSubmit={handleSubmit((value) => {
            onSubmit({ values: value, id_content: content_id })
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
                <div className="my-3 flex w-full gap-2 px-3">
                  <DefaultAvavar
                    className="avatar h-10 w-10"
                    onClick={() => setOpen(true)}
                  />
                  <input
                    className="text-field border border-transparent outline-none focus:border-primary"
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    onFocus={() => {
                      if (!isLogin) {
                        dispatch(setOpenLoginDialog(true))
                      }
                    }}
                    placeholder={intl.formatMessage({ id: 'yourComment' })}
                  />
                  <button
                    aria-label={'search-btn'}
                    type="submit"
                    disabled={!value.trim()}
                    className="btn w-36 bg-primary"
                  >
                    <FormattedMessage id="comment" />
                  </button>
                </div>
              )
            }}
          />
        </form>
      </div>
      <div>{renderComment(mappedData)}</div>
      {/* <div>
            <ProgressiveImg
                className="avatar h-8 w-8"
                alt="avatar"
                isAvatar
                src={appState.auth.userData?.avatar}
            />
            <form
                onSubmit={handleSubmit((value) => {
                    onSubmit(value)
                })}
                className="text-field"
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
                            <>
                                <input
                                    className="w-full border-none bg-transparent outline-none"
                                    name={name}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    ref={ref}
                                    value={value}
                                    onFocus={() => {
                                        if (!isLogin) {
                                            dispatch(setOpenLoginDialog(true))
                                        }
                                    }}
                                    placeholder={intl.formatMessage({ id: 'yourComment' })}
                                />
                                <button
                                    aria-label={'search-btn'}
                                    type="submit"
                                    disabled={!value.trim()}
                                    className="text-primary disabled:text-neutral-300"
                                >
                                    <SendIcon />
                                </button>
                            </>
                        )
                    }}
                />
            </form>
        </div> */}
    </div>
  )
  return (
    <>
      {type !== 'SHORT' && (
        <div className="rounded-xl bg-bg2 p-3" onClick={() => setOpen(true)}>
          <div className="flex justify-between">
            <p className="font-semibold">
              <FormattedMessage id="comment" />
            </p>
            <LeftArrowIcon className="-rotate-90 text-neutral-400" />
          </div>
          {mappedData[0] && (
            <div className="mt-7 flex items-center gap-3">
              <ProgressiveImg
                src={mappedData[0]?.channel?.avatarImage}
                alt="avatarImage"
                isAvatar
                className="avatar h-12 w-12 bg-bg1"
              />
              <div>
                <div className="caption1 flex items-center gap-1">
                  {mappedData[0]?.channel?.name && (
                    <p className="font-bold">
                      {mappedData[0]?.channel?.name}&nbsp;•&nbsp;
                    </p>
                  )}
                  <p className="caption1 text-neutral-400">
                    {mappedData[0]?.createdAt}
                  </p>
                </div>
                <p className="caption1 mt-0.5 break-all">
                  {mappedData[0]?.comment}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <DrawerFullScreen
        open={open && !replyData}
        onClose={setOpen}
        classNamePaper="drawer-video overflow-hidden"
        classNameBackdrop="bg-transparent"
      >
        <div />
      </DrawerFullScreen>
      <ReplyBox
        open={!!replyData}
        onClose={() => {
          setReplyData(undefined)
        }}
        // onCloseAll={() => {
        //   setReplyData(undefined)
        //   setOpen(false)
        // }}
        data={mappedData.find((v) => v.id === replyData?.id)}
        onSubmit={onSubmit}
      />
      <Drawer
        open={openOption}
        onClose={() => {
          setOpenOption(false)
        }}
      >
        <div className="flex flex-col">
          <button className="flex h-12 flex-row items-center px-6">
            <EditPen className="mr-2" stroke="black" />
            <p>
              <FormattedMessage id="edit" />
            </p>
          </button>
          <button className="flex h-12 flex-row items-center px-6">
            <DeleteIcon className="mr-2" />
            <p>
              <FormattedMessage id="removeComment" />
            </p>
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default CommentsBox
