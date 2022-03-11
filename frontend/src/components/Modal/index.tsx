import { useContext } from 'react';
import { AppContext } from '../../context';
import { ModalProps } from '../../types/modal';
import {
  ButtonsContainer, CancelButton, DeleteButton,
  Description, ModalContainer, ModalContent, Title,
} from './styles';

export default function Modal({
  showModal, setShowModal, deleteComment, isCommentReply,
}: ModalProps) {
  const { comments } = useContext(AppContext);

  return (
    <ModalContainer showModal={showModal?.showModal!}>
      <ModalContent>
        <Title>Delete Comment</Title>
        <Description>
          Are you sure you want to delete this comment?
          This will remove the comment and can&apos;t be undone
        </Description>
        <ButtonsContainer>
          <CancelButton
            onClick={() => setShowModal({ commentId: null, showModal: false })}
          >
            No, Cancel
          </CancelButton>
          {isCommentReply ? (
            <DeleteButton
              onClick={() => showModal.deleteCommentReply!(showModal?.commentId!)}
            >
              Yes, Delete
            </DeleteButton>
          ) : (
            <DeleteButton onClick={() => deleteComment(showModal?.commentId!, comments)}>
              Yes, Delete
            </DeleteButton>
          )}
        </ButtonsContainer>
      </ModalContent>
    </ModalContainer>
  );
}
