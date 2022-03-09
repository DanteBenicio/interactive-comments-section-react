import { Dispatch, SetStateAction } from 'react';
import { IComment } from './comment';
import { CurrentUserType } from './currentUser';
import { IShowModal } from './modal';

export interface RepliesType extends IComment {
  replyingTo: string
}

export interface CommentReplyProps extends RepliesType {
  setShowModal: (modal: IShowModal) => void
  comments: IComment[]
  commentsReplies: RepliesType[]
  setCommentsReplies: Dispatch<SetStateAction<RepliesType[]>>
  setIsCommentReply: (isCommentReply: boolean) => void
  currentUser: CurrentUserType
}
