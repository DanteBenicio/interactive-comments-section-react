/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import React, { useRef, useState } from 'react';
import IconMinus from '../../svgs/icon-minus.jsx';
import IconPlus from '../../svgs/icon-plus.jsx';
import { CommentProps, IComment } from '../../types/comment';
import { RepliesType } from '../../types/replies.js';
import CommentReply from '../CommentReply';
import { Button, UserAvatarIsResponding, WrapperResponding } from '../CurrentUser/styles.js';
import {
  ActionButtons,
  Container, ContainerAddReply, Content, Delete, Edit, FullContainer, Image,
  Minus, Plus, Reply, Score,
  ScoreWrapper, TextContent, UpdateButton, UserContent, UserCreatedAt,
  UserInfo, Username, Wrapper, YouLabel,
} from './styles';

export default function Comment({
  user, createdAt, content, score, replies,
  you, id, comments, setComments, setShowModal, currentUser,
}: CommentProps) {
  const [commentReplies, setCommentReplies] = useState<RepliesType[] | undefined>(replies);
  const [up, setUp] = useState<number>(score);
  const [edit, setEdit] = useState<boolean>(false);
  const [isReply, setIsReply] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  if (edit || isReply) {
    document?.querySelector('body')!.addEventListener('click', e => {
      const section = document.querySelector('section');
      const main = document.querySelector('main');

      if (edit) {
        if (e.target === section || e.target === main) {
          setEdit(false);
        }
      } else if (isReply) {
        if (e.target === section || e.target === main) {
          setIsReply(false);
        }
      }
    });
  }

  async function replyComment() {
    const newCommentReply: RepliesType = {
      id: commentReplies!.length! + 1,
      content: textareaRef.current?.value!,
      createdAt: '1 day',
      replyingTo: user.username,
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      you: true,
    };

    let commentToBeAnswered = comments.find(comment => comment.id === id);

    commentToBeAnswered?.replies?.push(newCommentReply);

    try {
      const response = await axios.put(`http://localhost:3001/comments/${id}`, commentToBeAnswered);
      const { status } = response;

      console.log(status);

      if (status === 200) {
        setCommentReplies(prevCommentReplies => [...prevCommentReplies!, newCommentReply]);
        setIsReply(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function editComment(commentId: number, isReplyComment: boolean) {
    if (isReplyComment) {
      const commentsTotalLength = comments?.map(comment => {
        if (comment.replies?.length) {
          return [comment, ...comment.replies];
        }

        return comment;
      }).flat().length;

      const commentReply = commentReplies?.filter(reply => reply.id === commentId);

      const commentRoot = comments.filter(comment => {
        comment.replies
      })

      console.log(commentReply, commentRoot);

      return;
    }

    const patchComment: IComment[] = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: textareaRef.current?.value! };
      }

      return comment;
    });

    try {
      const data = patchComment.find((comment) => comment.id === commentId);

      const response = await axios.put(`http://localhost:3001/comments/${commentId}`, data);
      const { status } = response;

      if (status === 200) {
        setComments(patchComment);
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <FullContainer>
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
              <Reply onClick={() => setIsReply(true)}>
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
                <UpdateButton onClick={() => editComment(id, false)}>Update</UpdateButton>
              </>
            ) : (
              <UserContent>{content}</UserContent>
            )}
          </Content>
        </Wrapper>
      </Container>
      {isReply && (
      <ContainerAddReply>
        <WrapperResponding>
          <UserAvatarIsResponding src={currentUser.image.png} />
          <TextContent autoFocus ref={textareaRef} />
          <Button onClick={() => replyComment()}>Reply</Button>
        </WrapperResponding>
      </ContainerAddReply>
      )}
      {commentReplies?.length! > 0 && commentReplies?.map(reply => (
        <CommentReply
          content={reply.content}
          createdAt={reply.createdAt}
          editComment={editComment}
          id={reply.id}
          replyingTo={reply.replyingTo}
          score={reply.score}
          setShowModal={setShowModal}
          user={reply.user}
          key={reply.id}
          you={reply.you}
        />
      ))}
    </FullContainer>
  );
}
