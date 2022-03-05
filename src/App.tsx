import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comment from './components/Comment';
import CurrentUser from './components/CurrentUser';
import Section from './components/Section';
import { IComment } from './types/comment';

export default function App() {
  const [comments, setComments] = useState<IComment[] | []>([]);

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

  async function deleteComment(commentId: number) {
    const filteredComments = comments.filter(comment => comment.id !== commentId);

    try {
      const response = await axios.delete(`http://localhost:3001/comments/${commentId}`);
      const { status } = response;

      if (status === 200) {
        setComments(filteredComments);
        setShowModal({ commentId: null, showModal: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Section>
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
            />
          ))}
          <CurrentUser
            setComments={setComments}
            comments={comments}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Section>
  );
}
