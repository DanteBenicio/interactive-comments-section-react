import { IComment } from './comment';
import { IShowModal } from './modal';

export interface RepliesType extends IComment {
  replyingTo: string
}

export interface CommentReplyProps extends RepliesType {
  setShowModal: (modal: IShowModal) => void
  comments: IComment[]
  commentsReplies: RepliesType[]
  setCommentsReplies: Dispatch<SetStateAction<RepliesType[]>>
}
