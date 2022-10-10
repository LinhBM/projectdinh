import api from '@common/api'
import Checkbox from '@common/components/Checkbox'
import { some } from '@common/constants'
import fetchThunk from '@common/fetchThunk'
import useGeneralHook from '@common/hook/useGeneralHook'
import { AddIcon, AddPrimaryIcon, CloseIcon, LockedIcon } from '@public/icons'
import { AppState } from '@redux/store'
import { API_PATHS } from '@utility/API_PATH'
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import useSWRInfinite from 'swr/infinite'
import Modal from '../Modal'
import PlaylistItem from './PlaylistItem'
interface Props {
  data: some
  open: boolean
  onClose: (val: boolean) => void
}

const WatchLaterModal = (props: Props) => {
  const { data, open, onClose } = props
  const intl = useIntl()
  const { setMessage, appState, dispatch, isLogin } = useGeneralHook()
  const [openForm, setOpenForm] = useState(false)
  const [value, setValue] = useState('')
  const [rawSelect, setRawSelect] = useState<number[]>([])
  const [selected, setSelected] = useState<number[]>([])
  const [hasWatchLater, setWatchLater] = useState(false)

  const {
    data: listData = [],
    size,
    setSize,
    isValidating,
    mutate,
  } = useSWRInfinite(
    (index) =>
      appState?.auth?.userData?.id && open
        ? API_PATHS.playList.get({
            page_size: 12,
            page_token: index,
            filter: `PLAYLIST_CHANNEL_${appState?.auth?.userData?.id}`,
          })
        : null,
    async (url) => {
      const json = await dispatch(fetchThunk({ url, method: 'get' }))
      return json?.data?.data?.[0]?.contents
    },
    { revalidateAll: false }
  )

  const mappedData = useMemo(() => {
    return listData.filter(Boolean)?.reduce((v, c) => {
      return [...v, ...c]
    }, [])
  }, [listData])

  const onCreateList = useCallback(
    async (values) => {
      try {
        const json = await dispatch(
          fetchThunk({
            url: API_PATHS.playList.insert,
            method: 'post',
            data: { name: values },
          })
        )
        setMessage({ message: json.data?.message })
        mutate()
        setOpenForm(false)
      } catch (e: any) {
        setMessage({ message: e.response?.data?.message })
      }
    },
    [dispatch, mutate, setMessage]
  )

  const getCheckList = useCallback(async () => {
    if (!data?.id || !open || !isLogin) {
      return
    }
    const json = await dispatch(
      fetchThunk({
        url: API_PATHS.playList.checkVideo,
        method: 'post',
        data: {
          video_id: data?.id,
        },
      })
    )
    if (json?.status === 200) {
      setSelected(json?.data.data)
      setRawSelect(json?.data.data)
      setWatchLater(json?.data.data?.includes(0))
    }
  }, [data?.id, dispatch, isLogin, open])

  useEffect(() => {
    setSelected([])
    setWatchLater(false)
    if (open) {
      mutate()
    }
  }, [mutate, open])

  useEffect(() => {
    getCheckList()
  }, [getCheckList])

  if (!isLogin) {
    return <>Login page</>
  }

  const saveWatchLater = async () => {
    try {
      const json = await api({
        url: API_PATHS.user.insertWatchLater,
        method: 'post',
        data: { videoId: data?.id },
      })
      if (json.status === 200) {
        setMessage({
          message:
            intl.formatMessage({
              id: 'addedTo',
            }) +
            ' ' +
            intl.formatMessage({
              id: 'watchLater',
            }),
        })
        // getCheckList()
      } else {
        setMessage({ message: json.data.message })
      }
      onClose(false)
    } catch (e: any) {
      setMessage({ message: e.response?.data?.message })
    }
  }

  const saveToPlaylist = async (item, status) => {
    try {
      const json = await api({
        url: API_PATHS.playList.toggleVideo,
        method: 'post',
        data: { id: item.id, status: status ? 1 : 0, video_id: data?.id },
      })
      if (json.status === 200) {
        if (json.data.data.isAdd) {
          setMessage({
            message:
              intl.formatMessage({
                id: 'addedTo',
              }) +
              ' ' +
              item.name,
          })
        } else {
          setMessage({
            message:
              intl.formatMessage({
                id: 'removed',
              }) +
              ' ' +
              item.name,
          })
        }
      } else {
        // getCheckList()
        setMessage({ message: json.data.message })
      }
      onClose(false)
    } catch (e: any) {
      setMessage({ message: e.response?.data?.message })
    }
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        className={'w-full max-w-sm rounded-xl px-6 py-5'}
      >
        <div className="mb-5 flex items-center justify-between">
          <p className="title flex-1 font-bold">
            <FormattedMessage id="addList" />
          </p>
          <button
            onClick={() => {
              if (openForm) {
                setOpenForm(false)
              } else {
                onClose(false)
                document.body.style.overflow = 'auto'
                document.body.style.paddingRight = ''
              }
            }}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="max-h-60 overflow-auto">
          <div
            className="flex items-center gap-2 p-3"
            onClick={() => {
              if (!hasWatchLater) {
                setWatchLater((old) => !old)
                saveWatchLater()
              }
            }}
          >
            <Checkbox checked={hasWatchLater} />
            <p>
              <FormattedMessage id="watchLater" />
            </p>
          </div>
          {mappedData.map((item) => {
            return (
              <PlaylistItem
                item={item}
                key={item.id}
                checked={selected.includes(item.id)}
                saveToPlaylist={saveToPlaylist}
              />
            )
          })}
        </div>
        <div className="divider" />
        {openForm && (
          <div>
            <div className="text-field mt-4 flex h-10 items-center gap-2 px-4">
              <input
                value={value}
                onChange={(e) =>
                  e.target.value.length <= 100 &&
                  setValue(e.target.value.trim())
                }
                className="w-full border-none bg-transparent outline-none"
                placeholder={intl.formatMessage({ id: 'enterPlayListName' })}
                autoFocus
              />
              <p className="caption2 text-neutral-400">{value.length}/100</p>
            </div>
            <button
              className="btn mt-9 w-full bg-primary"
              onClick={() => onCreateList(value)}
            >
              <FormattedMessage id="create" />
            </button>
          </div>
        )}
        {!openForm && (
          <button
            className="mt-9 flex gap-1 text-primary"
            onClick={() => setOpenForm(true)}
          >
            <AddPrimaryIcon />
            <FormattedMessage id="createNewList" />
          </button>
        )}
        {/* <div className="text-field mt-4 flex h-10 items-center gap-2 px-4">
          <input
            className="w-full border-none bg-transparent outline-none"
            placeholder={intl.formatMessage({ id: 'enterPlayListName' })}
            autoFocus
          />
          <p className="caption2 text-neutral-400">{0}/100</p>
        </div>
        <button
          className="btn mt-9 w-full bg-primary"
          onClick={() => setForm({})}
        >
          <FormattedMessage id="create" />
        </button> */}
      </Modal>
    </>
  )
}

export default WatchLaterModal
