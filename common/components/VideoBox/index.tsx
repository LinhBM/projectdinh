import api from '@common/api'
import { some, VideoObject } from '@common/constants'
import { formatTimeVideo } from '@common/helper'
import useGeneralHook from '@common/hook/useGeneralHook'
import {
  DirectionsIcon,
  FastBackwardIcon,
  FastForwardIcon,
  FullscreenIcon,
  LiveIcon,
  LoadingIcon,
  PauseIcon,
  PlayIcon,
  RefreshIcon,
  SettingFillIcon,
  ShareFillIcon,
  SmallScreenIcon,
  SpeedArrowIcon,
  WatchLaterFillIcon,
} from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { FormattedMessage } from 'react-intl'
import ShareModal from '../ShareModal'
import ShareContent from '../ShareModal/ShareContent'
import SettingController from './SettingController'
import SliderRange from './SliderRange'
import VideoJS from './VideoJS'
import VolumeBox from './VolumeBox'

export interface MetaData {
  volume: number
  playbackRate: number
  playing: boolean
  isLive: boolean
  error: boolean
  ended: boolean
  quality?: any
}
export interface VideoData {
  duration: number
  currentTime: number
  loadedPercent: number
}

interface VideoOptions {
  sources: { src: string; type?: string | 'video/mp4' }[]
  autoplay?: boolean
  controls?: boolean
  responsive?: boolean
  preload?: boolean
  fluid?: boolean
  aspectRatio?: string
  poster?: string
}
interface Props {
  className?: string
  loading?: boolean
  videoData?: VideoObject
  contentInfo?: any
  videoOptions?: VideoOptions
  onBackward?:
    | { onClick: () => void; disabled?: boolean; className?: string }
    | some
  onForward?:
    | { onClick: () => void; disabled?: boolean; className?: string }
    | some
  onEnded?: () => void
  playerReady?: (e: any) => void
  wrapper?: React.ReactNode
  onSetFilmFullWidth?: () => void
  handleVideoEnd?: () => void
}

const VideoBox = (props: Props) => {
  const {
    videoData,
    loading,
    videoOptions,
    className = '',
    onBackward,
    onForward,
    onEnded,
    playerReady,
    onSetFilmFullWidth,
    wrapper,
    handleVideoEnd,
  } = props
  const [key, setKey] = useState(false)
  const { setMessage } = useGeneralHook()
  const [metadata, setMetadata] = useState<MetaData>({
    playing: false,
    volume: 0,
    isLive: false,
    ended: false,
    error: false,
    playbackRate: 1,
  })
  const [dataVideo, setDataVideo] = useState<VideoData>({
    currentTime: 0,
    duration: 0,
    loadedPercent: 0,
  })
  const [openSetting, setOpenSetting] = useState(false)
  const [showBigBtn, setShowBigBtn] = useState(false)

  const prePaused = useRef<boolean>(true)
  const trackingRef = useRef<any>(null)
  const refVideo = useRef<any>(null)
  const refReload = useRef<any>(null)
  const refQualityLevels = useRef<any>(null)
  const refCloseControl = useRef<any>(null)
  const qualityControl = refQualityLevels.current
  const player = refVideo.current
  const { dispatch } = useGeneralHook()

  const handle = useFullScreenHandle()

  const { active, enter, exit } = handle

  const [showControls, setShowControls] = useState(true)
  const [shareVideo, setShareVideo] = useState(false)

  const { currentTime, durationVideo } = useMemo(() => {
    if (!player) {
      return { currentTime: '00:00', durationVideo: '00:00' }
    }
    return {
      currentTime: formatTimeVideo(dataVideo.currentTime),
      durationVideo: formatTimeVideo(dataVideo.duration),
    }
  }, [player, dataVideo.currentTime, dataVideo.duration])

  const handlePlayerError = (playerVideo) => {
    const error = playerVideo.error()
    if (error) {
      //error cannot reload
      if (error.code === 4) {
        setKey((old) => !old)
      }
      setMetadata((one) => ({
        ...one,
        error: error,
      }))
    }
  }

  const handlePlayerReady = async (playerVideo, qualityLevels) => {
    refVideo.current = playerVideo
    refQualityLevels.current = qualityLevels

    playerReady && playerReady(playerVideo)
    qualityLevels.on('change', function (event) {
      setMetadata((one) => ({
        ...one,
        quality: qualityLevels[qualityLevels.selectedIndex],
      }))
    })
    qualityLevels.on('addqualitylevel', function (event) {
      // let qualityLevel = event.qualityLevel;
      // if (qualityLevel.height >= 720) {
      //   qualityLevel.enabled = true;
      // } else {
      //   qualityLevel.enabled = false;
      // }
    })
    let timer: any = null
    let totalTime = 0
    let seeking = 0
    let waiting = 0
    let startTime = 0
    let init_time = 0
    let buffer_times_over_3s = 0

    playerVideo.on('volumechange', () => {
      setMetadata((one) => ({
        ...one,
        volume: playerVideo.volume(),
      }))
    })
    playerVideo.on('ratechange', () => {
      setMetadata((one) => ({
        ...one,
        playbackRate: playerVideo.playbackRate(),
      }))
    })
    playerVideo.on('timeupdate', () => {
      setDataVideo((old) => ({
        ...old,
        duration: playerVideo.duration(),
        currentTime: playerVideo.currentTime(),
      }))
    })
    playerVideo.on('loadedmetadata', () => {
      setDataVideo((old) => ({
        ...old,
        currentTime: playerVideo.currentTime(),
        duration: playerVideo.duration(),
      }))
      setMetadata((old) => ({
        ...old,
        volume: playerVideo.volume(),
        isLive: playerVideo.duration() === Infinity,
        error: false,
        ended: false,
      }))
    })

    playerVideo.on('play', () => {
      console.log('playerVideo.on(play)')
      setMetadata((one) => ({
        ...one,
        playing: true,
      }))
      timer = window.setInterval(function () {
        totalTime += 1
      }, 1000)
    })

    playerVideo.on('pause', () => {
      setMetadata((one) => ({
        ...one,
        playing: false,
      }))
      if (timer) clearInterval(timer)
    })
    playerVideo.on('progress', (e) => {
      let range = 0
      const bf = playerVideo.buffered()
      const time = playerVideo.currentTime()
      if (bf.start(range) === bf.end(range)) {
        return
      }
      while (!(bf.start(range) <= time && time <= bf.end(range))) {
        range += 1
      }
      const loadStartPercentage = bf.start(range) / playerVideo.duration()
      const loadEndPercentage = bf.end(range) / playerVideo.duration()
      const loadedPercent = loadEndPercentage - loadStartPercentage
      setDataVideo((old) => ({
        ...old,
        loadedPercent: loadedPercent,
      }))
    })

    playerVideo.on('canplay', () => {
      playerVideo.volume(0.6)
      init_time = playerVideo!.currentTime() - startTime
      if (init_time > 3) {
        buffer_times_over_3s++
      }
    })

    playerVideo.on('ended', () => {
      //end event Tracking KPI
      trackingRef.current && clearInterval(trackingRef.current)
      seeking = 0
      waiting = 0
      startTime = 0
      init_time = 0
      totalTime = 0
      buffer_times_over_3s = 0
      //---------
      setMetadata((one) => ({
        ...one,
        ended: true,
      }))
      onEnded && onEnded()
    })
    playerVideo.on('seeked', function () {
      seeking++
    })
    playerVideo.on('waiting', function () {
      waiting++
      startTime = playerVideo!.currentTime()
    })
    const json = await api({
      url: API_PATHS.kpi.init,
      method: 'post',
      data: {
        video_id: videoData?.id,
        channel_id: videoData?.channel?.id,
        play_url: videoOptions?.sources?.[0]?.src,
        os_version: '1.0',
        os_type: 'website',
        source: 'source',
        'user-agent': navigator.userAgent || '',
        identity: 'identity',
      },
    })
    const settings = json.data?.data
    if (json.status === 200 && settings) {
      trackingRef.current = setInterval(() => {
        if (playerVideo) {
          try {
            api({
              url: API_PATHS.kpi.trace,
              method: 'post',
              data: {
                token: settings?.token,
                duration_watching: totalTime,
                current_time: playerVideo!.currentTime(),
                pause_time: playerVideo!.paused() ? 1 : 0,
                seeking_times: seeking,
                waiting_times: waiting,
                init_time: init_time,
                buffer_times_over_3s,
                bandwidth_avg: 0,
                bandwidth: 0,
              },
            })
          } catch (err) {}
          startTime = 0
        }
      }, settings.frequency * 1000)
    }
  }

  const videoJsOptions = {
    autoplay: true,
    controls: false,
    // muted: true,
    // responsive: true,
    preload: true,
    fluid: true,
    // aspectRatio: '16:9',
    ...videoOptions,
  }

  const onReload = useCallback(
    (e) => {
      if (player) {
        player.pause()
        player.load()
        player.play().catch((e) => {
          /* error handler */

          console.log(e)
        })
        setMetadata((one) => ({
          ...one,
          ended: false,
        }))
      }
    },
    [player]
  )
  const onPlay = useCallback(
    (e) => {
      if (player) {
        const paused = player?.paused()
        if (paused) {
          player?.play().catch((e) => {
            /* error handler */
            console.log(e)
          })
        } else {
          player?.pause()
        }
      }
    },
    [player]
  )

  const onFastBackward = (e) => {
    if (player) {
      player?.currentTime(player?.currentTime() - 10)
    }
  }

  const onFastForward = (e) => {
    if (player) {
      player?.currentTime(player?.currentTime() + 10)
    }
  }

  const onTimeUpdate = useCallback(
    (value) => {
      setDataVideo((one) => ({
        ...one,
        currentTime: value,
      }))
      if (player) {
        player?.currentTime(value)
      }
    },
    [player]
  )

  useEffect(() => {
    return () => {
      refCloseControl.current && clearTimeout(refCloseControl.current)
    }
  }, [])

  const saveWatchLater = async () => {
    try {
      const json = await api({
        url: API_PATHS.user.insertWatchLater,
        method: 'post',
        data: { videoId: videoData?.id },
      })
      setMessage({ message: json.data?.message })
    } catch (e: any) {
      setMessage({ message: e.response?.data?.message })
    }
  }

  if (loading) {
    return (
      <div style={{ paddingTop: `${900 / 16}%`, position: 'relative' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingIcon className="h-10 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <FullScreen
      handle={handle}
      className={
        'relative z-40 flex w-full select-none items-center justify-center border border-bg2'
      }
    >
      <div
        id="video-component"
        key={`${key}`}
        className={
          'flex h-full min-h-[546px] w-full items-center justify-center ' +
          (className || '')
        }
      >
        <VideoJS
          options={videoJsOptions}
          onReady={handlePlayerReady}
          onError={handlePlayerError}
        />
      </div>
      <div
        onMouseEnter={() => {
          setShowControls(true)
        }}
        onMouseLeave={() => {
          setShowControls(false)
        }}
      >
        <div
          className={'absolute inset-0 z-10' + (showControls ? ' hidden' : '')}
          onClick={() => {
            setShowControls(true)
            refCloseControl.current = setTimeout(() => {
              if (player) {
                !player!.paused() && setShowControls(false)
              }
            }, 3000)
          }}
        />
        {active && (
          <>
            <div
              className={
                ' absolute right-2 top-2 z-[10]  flex h-12  max-h-12 w-28  items-center justify-center gap-4'
              }
              style={{ height: 'calc(100% - 48px)' }}
            >
              {/* <button
                className="btn h-12 w-12 rounded-full bg-[#ffffff1a] p-2"
                onClick={saveWatchLater}
              >
                <WatchLaterFillIcon />
              </button> */}
              <button
                className="btn h-12 w-12  rounded-full  bg-[#ffffff1a] p-2"
                onClick={() => {
                  setShareVideo(true)
                }}
              >
                <ShareFillIcon />
              </button>
            </div>
          </>
        )}
        {shareVideo && (
          <div className="absolute top-1/2 left-1/2  z-[9999] flex h-[252px] w-[515px] -translate-y-1/2 -translate-x-1/2 items-center justify-center rounded-xl bg-black">
            <ShareContent
              onClose={() => {
                setShareVideo(false)
              }}
              shareUrl={videoData?.linkShare}
            />
          </div>
        )}
        {/* <ShareModal
          open={shareVideo}
          onClose={() => {
            setShareVideo(false)
          }}
          shareUrl={videoData?.linkShare}
        /> */}
        <div
          className={
            'absolute inset-0 z-0' +
            ((showControls || openSetting || !metadata.playing) &&
            !metadata.error
              ? ' animate-fade-in'
              : ' animate-fade-out') +
            (metadata.error ? ' hidden' : '')
          }
          onClick={(e) => {
            refCloseControl.current && clearTimeout(refCloseControl.current)
            setOpenSetting(false)
            if (e.target === e.currentTarget) {
              setShowControls(false)
            } else {
              refCloseControl.current = setTimeout(() => {
                if (player) {
                  setShowControls(false)
                }
              }, 3000)
            }
          }}
        >
          {/* Process Control Button */}
          {!metadata.ended && (
            <button
              onClick={onPlay}
              className={
                ' absolute left-0 top-0 bottom-[48px] right-0 flex  w-full  items-center justify-center gap-4'
              }
              style={{ height: 'calc(100% - 48px)' }}
            >
              {/* {metadata.playing ? <PauseIcon /> : <PlayIcon />} */}
            </button>
          )}
          {metadata.ended && (
            <div
              onClick={onReload}
              ref={refReload}
              className={
                ' absolute left-0 top-0 flex  w-full  items-center justify-center gap-4'
              }
              style={{ height: 'calc(100% - 48px)' }}
            >
              <button className="scale-[200%] p-2">
                <RefreshIcon />
              </button>
            </div>
          )}

          {/* Header-Right Controller */}
          {/* <div className="absolute top-3 left-3 right-3 flex gap-3">
            <p className="font-bold line-clamp-1 ">{videoData?.name}</p>
          </div> */}
          {/* Bottom Controller*/}
          <div
            className={
              'absolute bottom-0 left-0 right-0 z-10 flex h-12 items-center gap-2 px-4'
            }
            style={{
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0) 16.67%, #000000 100%)',
            }}
          >
            {/*Pause or play*/}
            {metadata.ended ? (
              <button onClick={onReload} className="p-2">
                <RefreshIcon />
              </button>
            ) : (
              <button onClick={onPlay} className="p-2 outline-none">
                {metadata.playing ? (
                  <PauseIcon id="pause-icon-video-box" />
                ) : (
                  <PlayIcon />
                )}
              </button>
            )}

            {/* Display live label*/}
            {metadata.isLive && (
              <div className="flex items-center rounded bg-red py-1 px-2 font-bold uppercase">
                <LiveIcon className={'scale-75'} />
                <FormattedMessage id="live" />
              </div>
            )}

            {/* {onBackward && (
              <button
                {...onBackward}
                className={
                  'rotate-180 p-2 disabled:text-neutral-500 ' +
                  onBackward.className
                }
              >
                <SpeedArrowIcon />
              </button>
            )} */}

            {onForward && (
              <button
                disabled={onForward.disabled === true ? true : false}
                onClick={async () => {
                  if (active) {
                    await exit()
                  }

                  const timer = setTimeout(() => {
                    onForward.onClick && onForward.onClick()
                    clearTimeout(timer)
                  }, 500)
                }}
                className={
                  'p-2 disabled:cursor-default disabled:text-neutral-200'
                }
              >
                <SpeedArrowIcon />
              </button>
            )}
            {/* 10s back*/}
            <button onClick={onFastBackward} className="p-2">
              <FastBackwardIcon />
            </button>

            {/*  10s forward*/}
            <button onClick={onFastForward} className="p-2">
              <FastForwardIcon />
            </button>
            {/* Volume controller*/}
            <VolumeBox
              value={metadata.volume}
              onChange={(e) => {
                player?.volume(e)
              }}
            />
            {/* Display currentTime*/}
            {!metadata.isLive && (
              <span>
                {currentTime}&nbsp;/&nbsp;
                {durationVideo}
              </span>
            )}
            <div className="flex-1" />
            {!active && (
              <button
                className={'p-1'}
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenSetting((old) => !old)
                }}
              >
                <div
                  className={
                    'transition-all ' + (openSetting ? 'rotate-45' : 'rotate-0')
                  }
                >
                  <SettingFillIcon />
                </div>
              </button>
            )}
            {!active && (
              <button
                className={'p-1'}
                onClick={(e) => {
                  e.stopPropagation()
                  onSetFilmFullWidth && onSetFilmFullWidth()
                }}
              >
                <div>
                  <DirectionsIcon />
                </div>
              </button>
            )}

            {active ? (
              <button
                className="p-1"
                onClick={(e) => {
                  exit()
                }}
              >
                <SmallScreenIcon />
              </button>
            ) : (
              <button
                className="p-1"
                onClick={(e) => {
                  enter()
                }}
              >
                <FullscreenIcon />
              </button>
            )}
            {/* Process line bottom fullscreen*/}
            <SliderRange
              min={0}
              max={dataVideo.duration || 1}
              values={[dataVideo.currentTime]}
              loadedTime={dataVideo.currentTime * (dataVideo.loadedPercent + 1)}
              onMouseDown={async () => {
                prePaused.current = player?.paused()
                !prePaused.current && player?.pause()
              }}
              onMouseUp={() => {
                metadata.ended = false
                !prePaused.current &&
                  player?.play().catch((e) => {
                    /* error handler */
                    console.log(e)
                  })
              }}
              onChange={(value: number[]) => {
                onTimeUpdate(value[0])
              }}
              className={
                'range-sm absolute left-4 top-0 right-4 flex h-0.5 w-auto cursor-pointer appearance-none items-center'
              }
            />
            {/* Fullscreen Controller*/}
          </div>
        </div>
      </div>
      <SettingController
        refVideo={player}
        qualityControlRef={qualityControl}
        metadata={metadata}
        open={openSetting}
      />

      {wrapper}
    </FullScreen>
  )
}

export default VideoBox
