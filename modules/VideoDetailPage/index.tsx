import api from '@common/api'
import ActionBox from '@common/components/ActionBox'
import CommentsBox from '@common/components/CommentsBox'
import FollowBox from '@common/components/FollowBox'
import ShareDrawer from '@common/components/ShareDrawer'
import VideoBox from '@common/components/VideoBox'
import { some, VideoObject } from '@common/constants'
import useGeneralHook from '@common/hook/useGeneralHook'
import useGetLinkVideo from '@common/intl/useGetLinkVideo'
import MenuCategories from '@modules/HomePage/MenuCategories'
import { ExploreIcon } from '@public/icons'
import { API_PATHS } from '@utility/API_PATH'
import { ROUTES } from '@utility/constant'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import useSWRInfinite from 'swr/infinite'
import { AUTO_PLAY } from './constants'
import RelativeVideoBox from './RelativeVideoBox'

interface Props {
  dataVideoSSR: VideoObject
  dataRelatedVideoSSR: some[]
  dataCategorySSR: some[]
}

const VideoDetailPage = (props: Props) => {
  const { dataVideoSSR, dataRelatedVideoSSR, dataCategorySSR } = props
  const { query, pathname, push, back } = useRouter()
  const [openComment, setOpenComment] = useState(false)
  const [openShare, setOpenShare] = useState(false)
  const [filmFullWidth, setFilmFullWidth] = useState(false)
  const [openWrapper, setOpenWrapper] = useState(false)
  const videoId = query?.id as any
  const [openDesc, setOpenDesc] = useState(false)
  const { router } = useGeneralHook()

  const { url, loading } = useGetLinkVideo(videoId)
  const categoryId = query.categoryId ? Number(query.categoryId) : 'video'

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
      href: { pathname: ROUTES.phim },
    },
    ...(dataCategorySSR || []).map((val) => ({
      label: val.name,
      categoryId: val.id,
    })),
  ]
  const {
    data: dataRelatedVideoCSR = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(
    (index) =>
      dataVideoSSR
        ? API_PATHS.videos.related({
            page_size: 12,
            page_token: index + 1,
            id: dataVideoSSR?.id,
            channel_id: dataVideoSSR?.channel?.id,
            page_category_id: dataVideoSSR?.categoryId,
          })
        : null,
    async (url) => {
      const json = await api({ url, method: 'get' })
      return json?.data?.data?.[0]?.contents
    },
    { revalidateAll: false, revalidateFirstPage: false }
  )
  const mappedDataRelatedVideo = useMemo(() => {
    return dataRelatedVideoCSR?.reduce(
      (v, c) => [...v, ...c],
      dataRelatedVideoSSR
    )
  }, [dataRelatedVideoCSR, dataRelatedVideoSSR])

  const onScroll = useCallback(
    (e) => {
      if (
        window.innerHeight + window.pageYOffset >=
          document.body.offsetHeight - 290 * 2 &&
        !isValidating &&
        [...dataRelatedVideoSSR, ...(dataRelatedVideoCSR || [])]?.every(
          (item) => item.length > 0
        )
      ) {
        setSize(size + 1)
      }
    },
    [dataRelatedVideoCSR, dataRelatedVideoSSR, isValidating, setSize, size]
  )

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  if (!videoId || pathname === ROUTES.lives) {
    return null
  }

  const renderVideoBox = () =>
    dataVideoSSR ? (
      <VideoBox
        onBackward={{}}
        onSetFilmFullWidth={() => {
          setFilmFullWidth(!filmFullWidth)
        }}
        onEnded={() => {
          if (localStorage.getItem(AUTO_PLAY) === 'true') {
            const video = dataRelatedVideoSSR[0]
            router.push({
              pathname: ROUTES.home + `/video/${video.id}/${video.slug}`,
            })
          }
        }}
        onForward={{
          onClick: () => {
            const video = dataRelatedVideoSSR[0]
            router.push({
              pathname: ROUTES.home + `/video/${video.id}/${video.slug}`,
            })
          },
        }}
        loading={loading}
        videoData={dataVideoSSR}
        videoOptions={{
          sources: [
            {
              src: url,
            },
          ],
          autoplay: true,
          poster: dataVideoSSR?.coverImage || '/icons/default_video.svg',
        }}
      />
    ) : (
      <div
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
      </div>
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
          <p className="headline text-xl font-bold">{dataVideoSSR?.name}</p>
        </div>
        <div className="mt-5 flex justify-between">
          <div className="flex gap-2 text-neutral-500">
            <p>
              <FormattedNumber value={dataVideoSSR?.playTimes || 0} />
              &nbsp;
              <FormattedMessage id="viewNumber" />
            </p>
            <p>•</p>
            <p>1 tháng 3, 2022</p>
          </div>
          <ActionBox
            data={dataVideoSSR}
            setOpenComment={setOpenComment}
            setOpenShare={setOpenShare}
          />
        </div>

        <div className="divider mt-2" />
        <FollowBox channelData={dataVideoSSR?.channel} />
        <div className={`w-[730px] text-justify `}>
          <div
            className={`mt-3 text-sm text-neutral-500 line-clamp-${
              openDesc ? 999999 : 3
            } `}
          >
            {dataVideoSSR?.description}
          </div>
        </div>
        {dataVideoSSR.description && dataVideoSSR.description.length > 400 && (
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
          contentId={dataVideoSSR?.id}
          open={openComment}
          setOpen={setOpenComment}
          total={dataVideoSSR.commentCount || 0}
        />
      </div>
      {openShare && (
        <ShareDrawer
          open={openShare}
          onClose={() => {
            setOpenShare(false)
          }}
          shareUrl={dataVideoSSR?.linkShare}
        />
      )}
    </>
  )
  if (filmFullWidth) {
    return (
      <>
        <MenuCategories
          hasDivider={false}
          tabs={HOME_TABS}
          categoryId={categoryId}
        />
        <div className="container mb-5 ">
          <div>
            <div className="mb-5 flex-1">{renderVideoBox()}</div>
            <div className="flex gap-5">
              <div className="flex-1">{renderComment()}</div>
              <div className="flex  w-[355px] min-w-[355px] flex-col">
                <RelativeVideoBox
                  data={mappedDataRelatedVideo}
                  loading={isValidating}
                  size={size}
                />
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
      <div className="container  mb-5  gap-5">
        <div className="flex   gap-5">
          <div className="flex-1">
            {renderVideoBox()}
            {renderComment()}
          </div>
          <div className="flex  w-[355px] min-w-[355px] flex-col ">
            <RelativeVideoBox
              data={mappedDataRelatedVideo}
              loading={isValidating}
              size={size}
            />
          </div>
        </div>
      </div>
    </>
  )
}
// return (
//   <div className="container py-24">
//     <VideoBox
//       loading={loading}
//       videoOptions={{
//         sources: [
//           {
//             src: url,
//           },
//         ],
//         poster: dataVideoSSR.coverImage,
//         autoplay: true,
//       }}
//       onBackward={{
//         onClick: () => {
//           back()
//         },
//         disabled: query.initial !== '0',
//       }}
//       onForward={{
//         onClick: () => {
//           push({
//             query: {
//               id: mappedDataRelatedVideo[0]?.id,
//               slug: mappedDataRelatedVideo[0]?.slug,
//               initial: 0,
//             },
//           })
//         },
//         disabled: mappedDataRelatedVideo?.length === 0,
//       }}
//       playerReady={(player) => {
//         player.on('ended', () => {
//           if (localStorage.getItem(AUTO_PLAY) === 'true') {
//             setOpenWrapper(true)
//           }
//         })
//       }}
//       wrapper={
//         <AutoWrapperBox
//           open={openWrapper}
//           onClose={setOpenWrapper}
//           data={mappedDataRelatedVideo[0]}
//         />
//       }
//       videoData={dataVideoSSR}
//     />
//     <RelativeVideoBox
//       data={mappedDataRelatedVideo}
//       loading={isValidating}
//       size={size}
//     />
//   </div>
// )

export default VideoDetailPage
