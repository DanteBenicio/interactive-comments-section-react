import axios from 'axios';
import { useEffect, useState } from 'react';
import Comment from './components/Comment';
import CurrentUser from './components/CurrentUser';
import Section from './components/Section';
import { IComment } from './types/comment';

export default function App() {
  const [comments, setComments] = useState<IComment[] | []>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3001/comments?limit=2');
        const { data } = response;

        setComments(data);
      } catch (error) {
        console.error(error);
      }
    })();

    return () => setComments([]);
  }, []);

  return (
    <Section>
      {comments.map((comment) => (
        <Comment
          content={comment.content}
          createdAt={comment.createdAt}
          score={comment.score}
          user={comment.user}
          replies={comment.replies}
        />
      ))}
    </Section>
  );
}

export default App
