import { IComment } from './comment';
import { IShowModal } from './modal';

export interface RepliesType extends IComment {
  replyingTo: string
}

export interface CommentReplyProps extends RepliesType {
  setShowModal: (modal: IShowModal) => void
  editComment: (commentId: number, isReply: boolean) => Promise<void>
}
