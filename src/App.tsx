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

        setComments(data);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      setComments([]);
    };
  }, []);

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
