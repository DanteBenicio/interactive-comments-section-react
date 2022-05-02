import {
  useCallback, useContext, useRef, useState,
} from 'react';
import moment from 'moment';
import { API } from '../../api/axios';
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
  const [scores, setScores] = useState<number>(score);
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
      const response = await API.put(`/comments/${commentRoot?.id}`, { ...commentRoot, replies: newCommentReply });
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
      const response = await API.put(`/comments/${commentRoot?.id}`, { ...commentRoot, replies: commentReplyRemoved });
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
        webp: currentUserParam.image.webp,
      },
      username: currentUserParam.username,
    };

    const date = new Date();

    const newCommentReply = new CommentAnswer(
      commentsTotalLength + 1,
      textareaRef.current?.value!,
      date,
      0,
      user.username,
      userCommentReply,
      true,
    );

    const commentRoot = getRootComment(allComments, commentId);

    commentRoot?.replies?.push(newCommentReply);

    try {
      const response = await API.put(`/comments/${commentRoot.id}`, commentRoot);
      const { status } = response;

      if (status === 200) {
        setCommentsReplies(prevCommentReplies => [...prevCommentReplies!, newCommentReply]);
        setIsReply(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [user.username, setCommentsReplies, getRootComment]);

  // eslint-disable-next-line max-len
  const updateScore = useCallback(async (commentId: number, subtract: boolean, commentScore: number) => {
    if (commentScore === 0 && subtract) {
      return '';
    }

    const commentRoot = getRootComment(comments, commentId);

    if (subtract) {
      const commentToBeUpdated = commentRoot.replies?.map(reply => {
        if (reply.id === commentId) {
          return { ...reply, score: commentScore - 1 };
        }
        return reply;
      });

      try {
        const response = await API.put(`/comments/${commentRoot.id}`, { ...commentRoot, replies: commentToBeUpdated });
        const { status } = response;
        if (status === 200) {
          setScores(prevScore => prevScore - 1);
        }
      } catch (error) {
        console.error(error);
      }

      return '';
    }

    const commentToBeUpdated = commentRoot.replies?.map(reply => {
      if (reply.id === commentId) {
        return { ...reply, score: commentScore + 1 };
      }
      return reply;
    });

    try {
      const response = await API.put(`/comments/${commentRoot.id}`, { ...commentRoot, replies: commentToBeUpdated });
      const { status } = response;

      if (status === 200) {
        setScores(prevScore => prevScore + 1);
      }
    } catch (error) {
      console.error(error);
    }

    return '';
  }, [comments, getRootComment]);

  return (
    <FullContainerReply>
      <Container>
        <Wrapper>
          <ScoreAndActionButtons>
            <ScoreWrapper>
              <Plus onClick={() => updateScore(id, false, scores)}>
                <IconPlus />
              </Plus>
              <Score>{scores}</Score>
              <Minus onClick={() => updateScore(id, true, scores)}>
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
            ) : isReply ? (
              <Reply editIsActive={edit} onClick={() => setIsReply(false)} style={{ color: 'hsl(358, 79%, 66%)' }}>
                <img src="assets/icon-delete.svg" alt="reply icon" width="12px" height="11px" />
                Cancel
              </Reply>
            ) : (
              <Reply editIsActive={edit} onClick={() => setIsReply(true)}>
                <img src="assets/icon-reply.svg" alt="reply icon" width="12px" height="11px" />
                Reply
              </Reply>
            )}
          </ScoreAndActionButtons>
          <Content>
            <UserInfo>
              <Image src={user.image?.webp} alt="userimage in circle" width="35px" height="35px" />
              <Username>{user.username}</Username>
              {you && <YouLabel>you</YouLabel>}
              <UserCreatedAt>{moment(createdAt).fromNow()}</UserCreatedAt>
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
          <UserAvatarIsResponding src={currentUser?.image.webp} alt="userimage that is responding" width="45px" height="45px" />
          <TextContent autoFocus ref={textareaRef} />
          <Button onClick={() => replyComment(comments, currentUser, id)}>Reply</Button>
        </WrapperResponding>
      </ContainerAddReply>
      )}
    </FullContainerReply>
  );
}
