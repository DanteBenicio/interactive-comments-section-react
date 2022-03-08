/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import Comment from './components/Comment';
import CurrentUser from './components/CurrentUser';
import Modal from './components/Modal';
import Section from './components/Section';
import { IComment } from './types/comment';
import { CurrentUserType } from './types/currentUser';
import { IShowModal } from './types/modal';

export default function App() {
  const [comments, setComments] = useState<IComment[] | []>([]);
  const [showModal, setShowModal] = useState<IShowModal>();
  const [currentUser, setCurrentUser] = useState<CurrentUserType>();
  const [isCommentReply, setIsCommentReply] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3001/comments');
        const { data } = response;

        const response2 = await axios.get('http://localhost:3001/currentUser');
        const data2 = response2.data;

        setComments(data);
        setCurrentUser(data2);
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
      const response = await axios.delete(`http://localhost:3001/comments/${commentId}`);
      const { status } = response;

      if (status === 200) {
        setComments(commentRemoved);
        setShowModal({ commentId: null, showModal: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

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
              setComments={setComments}
              comments={comments}
              showModal={showModal!}
              setShowModal={setShowModal}
              currentUser={currentUser!}
              setIsCommentReply={setIsCommentReply}
            />
          ))}
          <CurrentUser />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Section>
  );
}
