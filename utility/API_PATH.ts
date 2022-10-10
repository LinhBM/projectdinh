import { some } from '@common/constants'
import { stringify } from 'query-string'

export const IS_DEV_EVN: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const DOMAIN = process.env.NEXT_PUBLIC_API_ROOT
const DOMAIN_PROXY = IS_DEV_EVN ? '/api' : DOMAIN

export const API_PATHS = {
  login: `${DOMAIN_PROXY}/users/login`,
  lives: {
    getChatAccess: `${DOMAIN_PROXY}/lives/get-chat-assets`,
    getChatRoom: (video_id: number) =>
      `${DOMAIN_PROXY}/lives/get-chat-room?live_id=${video_id}`,
    banners: (params: some) => `${DOMAIN_PROXY}/banners?${stringify(params)}`,
    getLink: (video_id: number) =>
      `${DOMAIN_PROXY}/lives/stream?live_id=${video_id}`,
  },
  home: {
    shorts: (params: some) => `${DOMAIN_PROXY}/shorts?${stringify(params)}`,
    lives: (params: some) => `${DOMAIN_PROXY}/lives?${stringify(params)}`,
    home: (params: some) => `${DOMAIN_PROXY}/home?${stringify(params)}`,
    listVideo: (params: some) => `${DOMAIN_PROXY}/videos?${stringify(params)}`,
    channelsHome: (params: some) =>
      `${DOMAIN_PROXY}/home/channels?${stringify(params)}`,
  },
  films: {
    index: (params: some) => `${DOMAIN_PROXY}/films?${stringify(params)}`,
    topicsFilm: (params: some) =>
      `${DOMAIN_PROXY}/films/topic-film?${stringify(params)}`,
    topics: (params: some) => `${DOMAIN_PROXY}/topics?${stringify(params)}`,
    detail: (id: string) => `${DOMAIN_PROXY}/films/${id}`,

    video: (video_id: number) =>
      `${DOMAIN_PROXY}/videos/stream?video_id=${video_id}`,
    child: (
      id: string,
      params: { page_size: number; page_token: number; type: 'FILM' }
    ) => `${DOMAIN_PROXY}/playlists/childs/${id}?${stringify(params)}`,
  },
  videos: {
    detail: (id: string) => `${DOMAIN_PROXY}/videos/${id}`,
    related: (params: some) =>
      `${DOMAIN_PROXY}/videos/related?${stringify(params)}`,
    getLink: (video_id: number) =>
      `${DOMAIN_PROXY}/videos/stream?video_id=${video_id}`,
    checkLike: (params: some) =>
      `${DOMAIN_PROXY}/users/cache/get?${stringify(params)}`,
  },
  kpi: {
    init: `${DOMAIN_PROXY}/kpi/init`,
    trace: `${DOMAIN_PROXY}/kpi/trace`,
  },
  user: {
    like: `${DOMAIN_PROXY}/users/cache/like`,
    followChannel: `${DOMAIN_PROXY}/users/follow-channel`,
    dislikeChannel: `${DOMAIN_PROXY}/users/dislike-channel`,
    getSettings: `${DOMAIN_PROXY}/users/get-setting`,
    get: (params: some) =>
      `${DOMAIN_PROXY}/users/cache/get?${stringify(params)}`,
    feedBack: `${DOMAIN_PROXY}/users/feedback`,
    insertWatchLater: `${DOMAIN_PROXY}/users/cache/insert-watch-later`,
    captcha: `${DOMAIN_PROXY}/users/captcha`,
    profile: `${DOMAIN_PROXY}/users/profile`,
  },
  comment: {
    get: (params: some) => `${DOMAIN_PROXY}/comments?${stringify(params)}`,
    commentQuick: (params: some) =>
      `${DOMAIN}/quick-comments?${stringify(params)}`,
    sendComment: `${DOMAIN_PROXY}/comments/send`,
  },
  playList: {
    get: (params: some) => `${DOMAIN_PROXY}/playlists?${stringify(params)}`,
    insert: `${DOMAIN_PROXY}/playlists/create`,
    toggleVideo: `${DOMAIN_PROXY}/playlists/toggle-video`,
    checkVideo: `${DOMAIN_PROXY}/playlists/check-video`,
  },
  favourites: {
    videos: (params: some) =>
      `${DOMAIN_PROXY}/users/cache/get?${stringify(params)}`,
    shorts: (params: some) =>
      `${DOMAIN_PROXY}/users/cache/get?${stringify(params)}`,
  },
}

export const API_PATHS_SERVER = {
  home: {
    shorts: (params: some) => `${DOMAIN}/shorts?${stringify(params)}`,
    lives: (params: some) => `${DOMAIN}/lives?${stringify(params)}`,
    home: (params: some) => `${DOMAIN}/home?${stringify(params)}`,
    categories: (params: some) => `${DOMAIN}/categories?${stringify(params)}`,
    banner: (params: some) => `${DOMAIN}/banners?${stringify(params)}`,
    channelsHome: (params: some) =>
      `${DOMAIN}/home/channels?${stringify(params)}`,
  },
  films: {
    index: (params: some) => `${DOMAIN}/films?${stringify(params)}`,
    topicsFilm: (params: some) =>
      `${DOMAIN}/films/topic-film?${stringify(params)}`,
    topics: (params: some) => `${DOMAIN}/topics?${stringify(params)}`,
    detail: (id: string) => `${DOMAIN}/films/${id}`,
    video: (video_id: string) => `${DOMAIN}/videos/stream?video_id=${video_id}`,
    child: (
      id: string,
      params: { page_size: number; page_token: number; type: 'FILM' }
    ) => `${DOMAIN}/playlists/childs/${id}?${stringify(params)}`,
  },
  playList: {
    insert: `${DOMAIN}/playlist/create`,
  },
  videos: {
    home: (params: some) => `${DOMAIN}/videos?${stringify(params)}`,
    detail: (id: string) => `${DOMAIN}/videos/${id}`,
    related: (params: {
      page_size: number
      page_category_id: string
      channel_id: string
      id: string
      page_token: number
    }) => `${DOMAIN}/videos/related?${stringify(params)}`,
  },
  favourites: {
    videos: (params: some) => `${DOMAIN}/users/cache/get?${stringify(params)}`,
    shorts: (params: some) => `${DOMAIN}/users/cache/get?${stringify(params)}`,
  },
}
