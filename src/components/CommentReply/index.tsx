import {
  useCallback, useContext, useRef, useState,
} from 'react';
import axios from 'axios';
import {
  ActionButtons, CancelButton, Container, ContainerAddReply, Content,
  Delete, Edit, FullContainerReply,
  Image, Minus, Plus, Reply, ReplyingTo, Score,
  ScoreAndActionButtons, ScoreWrapper, TextContent, UpdateButton,
  UserContent, UserCreatedAt, UserInfo, Username, Wrapper, YouLabel,
} from './styles';
import IconMinus from '../../svgs/icon-minus.jsx';
import IconPlus from '../../svgs/icon-plus.jsx';
import { CommentReplyProps, RepliesType } from '../../types/replies';
import { AppContext } from '../../context';
import { IComment, User } from '../../types/comment';
import { Button, UserAvatarIsResponding, WrapperResponding } from '../CurrentUser/styles.js';
import { CurrentUserType } from '../../types/currentUser';
import { CommentAnswer } from '../../model/CommentAnswer';

export default function CommentReply({
  content, createdAt, id, replyingTo, score, user, you, setShowModal,
  comments, commentsReplies, setCommentsReplies, setIsCommentReply, currentUser,
}: CommentReplyProps) {
  const { getRootComment } = useContext(AppContext);
  const [up, setUp] = useState<number>(score);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const editCommentReply = useCallback(async (commentId: number, allComments: IComment[]) => {
    const commentRoot = getRootComment(allComments, commentId);

    const newCommentReply: RepliesType[] = commentRoot?.replies?.map(reply => {
      if (reply.id === commentId) {
        return { ...reply, content: textareaRef.current?.value! };
      }

      return reply;
    })!;

    try {
      const response = await axios.put(`http://localhost:3001/comments/${commentRoot?.id}`, { ...commentRoot, replies: newCommentReply });
      const { status } = response;

      if (status === 200) {
        setCommentsReplies(newCommentReply);
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setCommentsReplies, getRootComment]);

  const deleteCommentReply = useCallback(async (commentId: number) => {
    const commentReplyRemoved = commentsReplies.filter(reply => reply.id !== commentId);

    const commentRoot = getRootComment(comments, commentId);

    try {
      const response = await axios.put(`http://localhost:3001/comments/${commentRoot?.id}`, { ...commentRoot, replies: commentReplyRemoved });
      const { status } = response;

      if (status === 200) {
        setCommentsReplies(commentReplyRemoved);
        setShowModal({ commentId: null, showModal: false });
      }
    } catch (error) {
      console.error(error);
    }
  }, [comments, commentsReplies, setCommentsReplies, setShowModal, getRootComment]);

  // eslint-disable-next-line max-len
  const replyComment = useCallback(async (allComments: IComment[], currentUserParam: CurrentUserType, commentId: number) => {
    const commentsTotalLength = allComments?.map(comment => {
      if (comment.replies?.length) {
        return [comment, ...comment.replies];
      }

      return comment;
    }).flat().length;

    const userCommentReply: User = {
      image: {
        png: currentUserParam.image.png,
        webp: currentUserParam.image.webp,
      },
      username: currentUserParam.username,
    };

    const newCommentReply: RepliesType = {
      id: commentsTotalLength! + 1,
      content: textareaRef.current?.value!,
      createdAt: '1 day',
      replyingTo: user.username,
      score: 0,
      user: userCommentReply,
      you: true,
    };

    const commentRoot = getRootComment(allComments, commentId);

    commentRoot?.replies?.push(newCommentReply);

    try {
      const response = await axios.put(`http://localhost:3001/comments/${commentRoot.id}`, commentRoot);
      const { status } = response;

      console.log(status);

      if (status === 200) {
        setCommentsReplies(prevCommentReplies => [...prevCommentReplies!, newCommentReply]);
        setIsReply(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user.username, setCommentsReplies, getRootComment]);

  return (
    <FullContainerReply>
      <Container>
        <Wrapper>
          <ScoreAndActionButtons>
            <ScoreWrapper>
              <Plus onClick={() => setUp(prevUp => prevUp + 1)}>
                <IconPlus />
              </Plus>
              <Score>{up}</Score>
              <Minus onClick={() => setUp(prevUp => prevUp - 1)}>
                <IconMinus />
              </Minus>
            </ScoreWrapper>
            {you ? (
              <ActionButtons editIsActive={edit}>
                <Delete
                  onClick={() => {
                    setIsCommentReply(true);
                    setShowModal({ showModal: true, commentId: id, deleteCommentReply });
                  }}
                >
                  <img src="assets/icon-delete.svg" alt="delete icon" width="10px" height="11px" />
                  Delete
                </Delete>
                <Edit onClick={() => setEdit(!edit)}>
                  <img src="assets/icon-edit.svg" alt="edit icon" width="11px" height="11px" />
                  {edit ? 'Cancel' : 'Edit'}
                </Edit>
              </ActionButtons>
            ) : (
              <Reply editIsActive={edit} onClick={() => setIsReply(!isReply)}>
                <img src="assets/icon-reply.svg" alt="reply icon" width="12px" height="11px" />
                Reply
              </Reply>
            )}
          </ScoreAndActionButtons>
          <Content>
            <UserInfo>
              <Image src={user.image.webp} alt="userimage in circle" width="35px" height="35px" />
              <Username>{user.username}</Username>
              {you && <YouLabel>you</YouLabel>}
              <UserCreatedAt>{createdAt}</UserCreatedAt>
            </UserInfo>
            {edit ? (
              <>
                <TextContent
                  autoFocus
                  ref={textareaRef}
                  defaultValue={`${content}`}
                />
                <UpdateButton
                  onClick={() => editCommentReply(id, comments)}
                >
                  Update
                </UpdateButton>
                <CancelButton onClick={() => setEdit(false)}>Cancel</CancelButton>
              </>
            ) : (
              <UserContent>
                <ReplyingTo>
                  @
                  {replyingTo}
                </ReplyingTo>
                {` ${content}`}
              </UserContent>
            )}
          </Content>
        </Wrapper>
      </Container>
      {isReply && (
      <ContainerAddReply>
        <WrapperResponding>
          <UserAvatarIsResponding src={currentUser.image.webp} alt="userimage that is responding" width="45px" height="45px" />
          <TextContent autoFocus ref={textareaRef} />
          <Button onClick={() => replyComment(comments, currentUser, id)}>Reply</Button>
        </WrapperResponding>
      </ContainerAddReply>
      )}
    </FullContainerReply>
  );
}
