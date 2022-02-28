import { RepliesType } from './replies';

export interface IComment {
  id: number
  content: string
  createdAt: string
  score: number
  user: {
    image: {
      png: string
      webp: string
    },
    username: string
  }
  replies?: RepliesType[]
}

export type CommentProps = {
  content: string
  createdAt: string
  score: number
  user: {
    image: {
      png: string
      webp: string
    },
    username: string
  },
  replies?: RepliesType[]
}
