export type some = { [key: string]: any }

export interface VideoObject {
  categoryId?: number
  channel?: {
    avatarImage: string
    followCount: number
    id: number
    name: string
    status: number
    videoCount: number
  }
  filmChannel?: {
    avatarImage: string
    followCount: number
    id: number
    name: string
    status: number
    videoCount: number
  }
  commentCount?: number
  convertStatusStr?: string
  coverImage?: string
  description?: string
  duration: number
  hashtag?: string
  id: number
  likeCount?: number
  viewerCount?: number
  link?: string
  linkShare?: string
  linkSocial?: string
  name?: string
  playTimes: number
  publishedTime?: string
  reason?: string
  slug: string
  status: number
  type?: 'VOD' | 'FILM'
}

export const SUCCESS_CODE = 200
export const PAGE_SIZE = 10
