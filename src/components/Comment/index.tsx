import {
  useContext, useEffect, useRef, useState, useCallback,
} from 'react';
import moment from 'moment';
import { API } from '../../api/axios';
import { AppContext } from '../../context';
import IconMinus from '../../svgs/icon-minus.jsx';
import IconPlus from '../../svgs/icon-plus.jsx';
import { CommentProps, IComment, User } from '../../types/comment';
import { CurrentUserType } from '../../types/currentUser';
import { RepliesType } from '../../types/replies.js';
import CommentReply from '../CommentReply';
import { Button, UserAvatarIsResponding, WrapperResponding } from '../CurrentUser/styles.js';
import {
  ActionButtons,
  CancelButton,
  Container, ContainerAddReply, Content, Delete, Edit, FullContainer, Image,
  Minus, Plus, Reply, Score,
  ScoreAndReply,
  ScoreWrapper, TextContent, UpdateButton, UserContent, UserCreatedAt,
  UserInfo, Username, Wrapper, YouLabel,
} from './styles';
import { CommentAnswer } from '../../model/CommentAnswer';

export default function Comment({
  user, createdAt, content, score, replies,
  you, id, setShowModal, currentUser, setIsCommentReply,
}: CommentProps) {
  const { comments, setComments } = useContext(AppContext);
  const [commentReplies, setCommentReplies] = useState<RepliesType[]>(replies!);
  const [scores, setScores] = useState<number>(score);
  const [edit, setEdit] = useState<boolean>(false);
  const [isReply, setIsReply] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    (async () => {
      const response = await API.get('/comments');
      const { data } = response;

      setComments(data);
    })();
  }, [commentReplies, setComments]);

  // eslint-disable-next-line max-len
  const replyComment = useCallback(async (allComments: IComment[], currentUserParam: CurrentUserType) => {
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

    const commentToBeAnswered = allComments.find(comment => comment.id === id);

    commentToBeAnswered?.replies?.push(newCommentReply);

    try {
      const response = await API.put(`/comments/${id}`, commentToBeAnswered);
      const { status } = response;

      if (status === 200) {
        setCommentReplies(prevCommentReplies => [...prevCommentReplies!, newCommentReply]);
        setIsReply(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, user.username]);

  async function editComment(commentId: number) {
    const patchComment: IComment[] = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, content: textareaRef.current?.value! };
      }

      return comment;
    });

    try {
      const data = patchComment.find((comment) => comment.id === commentId);

      const response = await API.put(`/comments/${commentId}`, data);
      const { status } = response;

      if (status === 200) {
        setComments(patchComment);
        setEdit(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // eslint-disable-next-line max-len
  const updateScore = useCallback(async (commentId: number, subtract: boolean, commentScore: number) => {
    if (commentScore === 0 && subtract) {
      return '';
    }

    const commentToBeUpdated = comments.find(comment => comment.id === commentId);

    if (subtract) {
      try {
        const response = await API.put(`/comments/${commentId}`, { ...commentToBeUpdated, score: commentScore - 1 });
        const { status } = response;

        if (status === 200) {
          setScores(prevScore => prevScore - 1);
        }
      } catch (error) {
        console.error(error);
      }
      return '';
    }
    try {
      const response = await API.put(`/comments/${commentId}`, { ...commentToBeUpdated, score: commentScore + 1 });
      const { status } = response;

      if (status === 200) {
        setScores(prevScore => prevScore + 1);
      }
    } catch (error) {
      console.error(error);
    }
    return '';
  }, [comments]);

  return (
    <FullContainer>
      <Container data-comment={id}>
        <Wrapper>
          <ScoreAndReply>
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
                <Delete onClick={() => {
                  setIsCommentReply(false);
                  setShowModal({ commentId: id, showModal: true });
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
              <Reply onClick={() => setIsReply(false)} style={{ color: 'hsl(358, 79%, 66%)' }}>
                <img src="assets/icon-delete.svg" alt="reply icon" width="11.84px" height="11px" />
                Cancel
              </Reply>
            ) : (
              <Reply onClick={() => setIsReply(true)}>
                <img src="assets/icon-reply.svg" alt="reply icon" width="11.84px" height="11px" />
                Reply
              </Reply>
            )}
          </ScoreAndReply>
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
                  defaultValue={content}
                />
                <UpdateButton onClick={() => editComment(id)}>Update</UpdateButton>
                <CancelButton onClick={() => setEdit(false)}>Cancel</CancelButton>
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
          <UserAvatarIsResponding
            src={currentUser.image?.webp}
            alt="userimage that is responding"
            width="45px"
            height="45px"
          />
          <TextContent autoFocus ref={textareaRef} />
          <Button onClick={() => replyComment(comments, currentUser)}>Reply</Button>
        </WrapperResponding>
      </ContainerAddReply>
      )}
      {commentReplies?.length! > 0 && commentReplies?.map(reply => (
        <CommentReply
          comments={comments}
          commentsReplies={commentReplies}
          currentUser={currentUser}
          setCommentsReplies={setCommentReplies!}
          content={reply.content}
          createdAt={reply.createdAt}
          id={reply.id}
          replyingTo={reply.replyingTo}
          score={reply.score}
          setShowModal={setShowModal}
          user={reply.user}
          key={reply.id + Math.random() * 1000}
          you={reply.you}
          setIsCommentReply={setIsCommentReply}
        />
      ))}
    </FullContainer>
  );
}
