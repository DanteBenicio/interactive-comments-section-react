export interface IShowModal {
  showModal: boolean
  commentId: number | null
  deleteCommentReply?: (commentId: number) => void
}

export type ModalProps = {
  setShowModal: (showModal: IShowModal) => void
  showModal: IShowModal
  deleteComment: (commentId: number, allComments: IComment[]) => void
  isCommentReply: boolean
}
