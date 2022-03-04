import { IComment } from './comment';

export type CurrentUserType = {
  image: {
    png: string
    webp: string
  },
  username: string
}

export type CurrentUserProps = {
  replyingTo?: string
  comments: IComment[]
  setComments: (comments: IComment[]) => void
}
