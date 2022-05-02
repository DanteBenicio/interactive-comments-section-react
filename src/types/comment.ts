import { CurrentUserType } from './currentUser';
import { IShowModal } from './modal';
import { RepliesType } from './replies';

export type User = {
  image: {
    webp: string
  },
  username: string
}

export interface IComment {
  id: number
  content: string
  createdAt: Date
  you?: boolean
  score: number
  user: User
  replies?: RepliesType[]
}

export type CommentProps = {
  id: number
  content: string
  createdAt: Date
  you?: boolean
  showModal: IShowModal
  setIsCommentReply: (isCommentReply: boolean) => void
  setShowModal: (showModal: IShowModal) => void
  currentUser: CurrentUserType
  score: number
  user: {
    image: {
      webp: string
    },
    username: string
  },
  replies?: RepliesType[]
}
