import axios from 'axios';
import {
  useContext, useEffect, useRef, useState, useCallback,
} from 'react';
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
  const [up, setUp] = useState<number>(score);
  const [edit, setEdit] = useState<boolean>(false);
  const [isReply, setIsReply] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3001/comments');
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
        png: currentUserParam.image.png,
        webp: currentUserParam.image.webp,
      },
      username: currentUserParam.username,
    };

    const date = new Intl.DateTimeFormat('en-US').format(new Date());

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
      <Container data-comment={id}>
        <Wrapper>
          <ScoreAndReply>
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
              <Reply onClick={() => setIsReply(false)}>
                <img src="assets/icon-reply.svg" alt="reply icon" width="11.84px" height="11px" />
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
            src={currentUser.image.webp}
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
