import ActionBox from '@common/components/ActionBox'
import CommentsBox from '@common/components/CommentsBox'
import DrawerFullScreen from '@common/components/DrawerFullScreen'
import FollowBox from '@common/components/FollowBox'
import ShareDrawer from '@common/components/ShareDrawer'
import VideoBox from '@common/components/VideoBox'
import { some, VideoObject } from '@common/constants'
import useGetLinkVideo from '@common/hook/useGetLinkVideo'
import MenuCategories from '@modules/HomePage/MenuCategories'
import { CloseIcon, ExploreIcon, LeftArrowIcon } from '@public/icons'
import { ROUTES } from '@utility/constant'
import { useRouter } from 'next/router'
import React, { useState, useCallback } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import EpisodeBox from './EpisodeBox'
import RelativeFilmBox from './RelativeFilmBox'

interface Props {
  dataFilmSSR: some
  listFilmSSR: VideoObject[]
  dataRelatedVideoSSR: some[]
  dataCategorySSR: some[]
}

const MoviesDetailPage = (props: Props) => {
  const {
    dataFilmSSR = {},
    listFilmSSR = [],
    dataRelatedVideoSSR = [],
    dataCategorySSR = [],
  } = props
  const handle = useFullScreenHandle()

  const [episodeIndex, setEpisodeIndex] = useState(0)
  const currentEpisode = listFilmSSR?.[episodeIndex]

  const [openComment, setOpenComment] = useState(false)
  const [openShare, setOpenShare] = useState(false)
  const [openDesc, setOpenDesc] = useState(false)
  const [filmFullWidth, setFilmFullWidth] = useState(false)
  const { url, loading } = useGetLinkVideo(currentEpisode?.id)
  const { query } = useRouter()
  const categoryId = query.categoryId ? Number(query.categoryId) : 'phim'

  const HOME_TABS = [
    {
      icon: <ExploreIcon />,
      label: <FormattedMessage id="explore" />,
      href: { pathname: ROUTES.explore },
    },
    {
      label: <FormattedMessage id="offer" />,
      categoryId: '',
    },
    {
      label: <FormattedMessage id="movies" />,
      categoryId: 'phim',
      href: { pathname: ROUTES.phim },
    },
    ...(dataCategorySSR || []).map((val) => ({
      label: val.name,
      categoryId: val.id,
    })),
  ]
  console.log(dataFilmSSR, currentEpisode, 'detail')

  const renderVideoBox = () =>
    currentEpisode ? (
      <VideoBox
        onBackward={{
          onClick: () => {
            setEpisodeIndex(episodeIndex - 1)
          },
          disabled: listFilmSSR.length === 0 || episodeIndex === 0,
        }}
        onSetFilmFullWidth={() => {
          setFilmFullWidth(!filmFullWidth)
        }}
        onForward={{
          onClick: () => {
            setEpisodeIndex(episodeIndex + 1)
          },
          disabled: episodeIndex >= listFilmSSR.length - 1,
        }}
        loading={loading}
        videoData={{ ...currentEpisode, filmChannel: dataFilmSSR?.channel }}
        videoOptions={{
          sources: [
            {
              src: url,
            },
          ],
          autoplay: true,
          poster: dataFilmSSR?.coverImage || '/icons/default_video.svg',
        }}
      />
    ) : (
      <FullScreen
        handle={handle}
        className={
          'relative z-40 flex w-full items-center justify-center border border-bg2'
        }
      >
        <div
          id="video-component"
          className={
            'relative flex h-full min-h-[200px]  w-full items-center justify-center '
          }
        >
          <video src="" className="h-full w-full"></video>
          <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center text-xl">
            No compatible source was found for this media.
          </div>
        </div>
      </FullScreen>
    )

  const renderComment = () => (
    <>
      <div className="">
        <div className="mt-7  justify-between gap-4">
          <div className="mb-2">
            <p className="text-xs font-bold text-primary">
              #1 TRONG DANH MỤC ÂM NHẠC THỊNH HÀNH
            </p>
          </div>
          <p className="headline text-xl font-bold">{currentEpisode?.name}</p>
        </div>
        <div className="mt-5 flex justify-between ">
          <div className="flex gap-2 text-neutral-500">
            <p>
              <FormattedNumber value={currentEpisode?.playTimes || 0} />
              &nbsp;
              <FormattedMessage id="viewNumber" />
            </p>
            <p>•</p>
            <p>1 tháng 3, 2022</p>
          </div>
          <ActionBox
            data={currentEpisode}
            setOpenComment={setOpenComment}
            setOpenShare={setOpenShare}
          />
        </div>

        <div className="divider mt-2" />
        <FollowBox channelData={dataFilmSSR?.channel} />
        <div className={`w-[730px] min-w-[730px] text-justify `}>
          {openDesc ? (
            <div className={`line-clamp-9999999 mt-3 text-sm text-neutral-500`}>
              {dataFilmSSR?.description}
            </div>
          ) : (
            <div className={`mt-3 text-sm text-neutral-500 line-clamp-3`}>
              {dataFilmSSR?.description}
            </div>
          )}
        </div>
        {dataFilmSSR.description && dataFilmSSR.description.length > 351 && (
          <div className="mt-1">
            <button
              className="text-sm uppercase text-[#81838E]"
              onClick={() => setOpenDesc(!openDesc)}
            >
              <FormattedMessage id={!openDesc ? 'showMore' : 'showLess'} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-8">
        <CommentsBox
          type="PLAYLIST"
          contentId={dataFilmSSR?.id}
          open={openComment}
          setOpen={setOpenComment}
          total={currentEpisode.commentCount || 0}
        />
      </div>
      <ShareDrawer
        open={openShare}
        onClose={() => {
          setOpenShare(false)
        }}
        shareUrl={currentEpisode?.linkShare}
      />
    </>
  )

  const renderPlaylist = () => (
    <EpisodeBox
      dataFilmSSR={dataFilmSSR}
      listFilmSSR={listFilmSSR}
      episodeIndex={episodeIndex}
      setEpisodeIndex={setEpisodeIndex}
    />
  )

  if (filmFullWidth) {
    return (
      <>
        <MenuCategories
          hasDivider={false}
          tabs={HOME_TABS}
          categoryId={categoryId}
        />
        <div className=" container mb-[134px] ">
          <div>
            <div className="mb-5 flex-1">{renderVideoBox()}</div>
            <div className="flex gap-5">
              <div className="flex-1">{renderComment()}</div>
              <div className="flex h-[738px] w-[355px] min-w-[355px] flex-col bg-bg2">
                {renderPlaylist()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <MenuCategories
        hasDivider={false}
        tabs={HOME_TABS}
        categoryId={categoryId}
      />
      <div className="container  mb-[134px]  gap-5">
        <div className="flex   gap-5">
          <div className="flex-1">
            {renderVideoBox()}
            {renderComment()}
          </div>
          <div className="flex h-[738px] w-[355px] min-w-[355px] flex-col bg-bg2">
            {renderPlaylist()}
          </div>
        </div>
      </div>
    </>
  )
}

export default MoviesDetailPage
