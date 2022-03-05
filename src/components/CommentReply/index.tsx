import React, { useRef, useState } from 'react';
import {
  ActionButtons, Container, Content, Delete, Edit, FullContainerReply,
  Image, Minus, Plus, Reply, Score, ScoreWrapper, TextContent, UpdateButton,
  UserContent, UserCreatedAt, UserInfo, Username, Wrapper, YouLabel,
} from './styles';
import IconMinus from '../../svgs/icon-minus.jsx';
import IconPlus from '../../svgs/icon-plus.jsx';
import { CommentReplyProps } from '../../types/replies';

export default function CommentReply({
  content, createdAt, id, replyingTo, score, user, you, setShowModal, editComment,
}: CommentReplyProps) {
  const [up, setUp] = useState<number>(score);
  const [edit, setEdit] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  if (edit) {
    document?.querySelector('body')!.addEventListener('click', e => {
      const section = document.querySelector('section');
      const main = document.querySelector('main');

      if (e.target === section || e.target === main) {
        setEdit(false);
      }
    });
  }

  return (
    <FullContainerReply>
      <Container>
        <Wrapper>
          <ScoreWrapper>
            <Plus onClick={() => setUp(prevUp => prevUp + 1)}>
              <IconPlus />
            </Plus>
            <Score>{up}</Score>
            <Minus onClick={() => setUp(prevUp => prevUp - 1)}>
              <IconMinus />
            </Minus>
          </ScoreWrapper>
          <Content>
            <UserInfo>
              <Image src={user.image.png} alt="userimage in circle" />
              <Username>{user.username}</Username>
              {you && <YouLabel>you</YouLabel>}
              <UserCreatedAt>{createdAt}</UserCreatedAt>
            </UserInfo>
            {you ? (
              <ActionButtons>
                <Delete onClick={() => setShowModal({ commentId: id, showModal: true })}>
                  <img src="assets/icon-delete.svg" alt="delete icon" />
                  Delete
                </Delete>
                <Edit onClick={() => setEdit(!edit)}>
                  <img src="assets/icon-edit.svg" alt="edit icon" />
                  {edit ? 'Cancel' : 'Edit'}
                </Edit>
              </ActionButtons>
            ) : (
              <Reply>
                <img src="assets/icon-reply.svg" alt="reply icon" />
                Reply
              </Reply>
            )}
            {edit ? (
              <>
                <TextContent
                  autoFocus
                  ref={textareaRef}
                  defaultValue={`@${replyingTo} ${content}`}
                />
                <UpdateButton onClick={() => editComment(id, true)}>Update</UpdateButton>
              </>
            ) : (
              <UserContent>{`@${replyingTo} ${content}`}</UserContent>
            )}
          </Content>
        </Wrapper>
      </Container>
    </FullContainerReply>
  );
}
