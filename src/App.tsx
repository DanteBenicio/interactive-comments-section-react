import {
  useEffect, useContext, useState, useCallback,
} from 'react';
import { API } from './api/axios';
import Comment from './components/Comment';
import CurrentUser from './components/CurrentUser';
import Modal from './components/Modal';
import Section from './components/Section';
import { IComment } from './types/comment';
import { CurrentUserType } from './types/currentUser';
import { IShowModal } from './types/modal';
import { AppContext } from './context';
import Loading from './components/Loading';

export default function App() {
  const { comments, setComments } = useContext(AppContext);
  const [showModal, setShowModal] = useState<IShowModal>();
  const [currentUser, setCurrentUser] = useState<CurrentUserType>();
  const [isCommentReply, setIsCommentReply] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await API.get('/comments');
        const { data } = response;

        const response2 = await API.get('/currentUser');
        const data2 = response2.data;

        setComments(data);
        setCurrentUser(data2.currentUser);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      setComments([]);
    };
  }, []);

  const deleteComment = useCallback(async (commentId: number, allComments: IComment[]) => {
    const commentRemoved = allComments.filter(comment => comment.id !== commentId);

    try {
      const response = await API.delete(`/comments/${commentId}`);
      const { status } = response;

      if (status === 200) {
        setComments(commentRemoved);
        setShowModal({ commentId: null, showModal: false });
      }
    } catch (error) {
      console.error(error);
    }
  }, [setComments]);

  return (
    <Section>
      <Modal
        showModal={showModal!}
        setShowModal={setShowModal}
        deleteComment={deleteComment!}
        isCommentReply={isCommentReply}
      />
      {comments.length ? (
        <>
          {comments.map((comment) => (
            <Comment
              key={comment.content}
              id={comment.id}
              content={comment.content}
              createdAt={comment.createdAt}
              score={comment.score}
              user={comment.user}
              replies={comment.replies}
              you={comment.you}
              showModal={showModal!}
              setShowModal={setShowModal}
              currentUser={currentUser!}
              setIsCommentReply={setIsCommentReply}
            />
          ))}
          <CurrentUser />
        </>
      ) : (
        <Loading />
      )}
    </Section>
  );
}
