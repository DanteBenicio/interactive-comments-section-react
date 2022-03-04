import axios from 'axios';
import React, { useRef, useState } from 'react';
import IconMinus from '../../svgs/icon-minus.jsx';
import IconPlus from '../../svgs/icon-plus.jsx';
import { CommentProps } from '../../types/comment';
import {
  ActionButtons,
  Container, Content, Delete, Edit, Image,
  Minus, Plus, Reply, Score,
  ScoreWrapper, TextContent, UpdateButton, UserContent, UserCreatedAt,
  UserInfo, Username, Wrapper, YouLabel,
} from './styles';

export default function Comment({
  user, createdAt, content, score, replies, you, id, comments, setComments,
}: CommentProps) {
  const [up, setUp] = useState<number>(score);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // async function replyComment() {
  // }

  async function deleteComment(commentId: number) {
    const filteredComments = comments.filter(comment => comment.id !== commentId);

    try {
      const response = await axios.delete(`http://localhost:3001/comments/${commentId}`);
      const { status } = response;

      console.log(status);
      setComments(filteredComments);
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(commentId: number) {
    if (!textareaRef.current?.value) {
      return;
    }

    const patchComment = comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: textareaRef.current?.value };
      }

      return comment;
    });

    // try {
    //   const response = await axios.put(`http://localhost:3001/comments/${commentId}`, );
    // } catch (error) {
    //   console.error(error);
    // }
    console.log(patchComment[0]);
  }

  return (
    <>
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
                <Delete onClick={() => deleteComment(id)}>
                  <img src="assets/icon-delete.svg" alt="delete icon" />
                  Delete
                </Delete>
                <Edit onClick={() => setEdit(true)}>
                  <img src="assets/icon-edit.svg" alt="edit icon" />
                  Edit
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
                  defaultValue={content}
                />
                <UpdateButton onClick={() => editComment(id)}>Update</UpdateButton>
              </>
            ) : (
              <UserContent>{content}</UserContent>
            )}
          </Content>
        </Wrapper>
      </Container>
      {/* {isReply && (

      )} */}
    </>
  );
}
