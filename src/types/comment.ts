import { Dispatch, SetStateAction } from 'react';
import { RepliesType } from './replies';

export interface IComment {
  id: number
  content: string
  createdAt: string
  you?: boolean
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
  id: number
  content: string
  createdAt: string
  you?: boolean
  comments: IComment[]
  setComments: Dispatch<SetStateAction<[] | IComment[]>>
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
