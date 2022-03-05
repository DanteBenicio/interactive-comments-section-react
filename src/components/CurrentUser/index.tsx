/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Container } from '../Comment/styles';
import {
  Button, TextContent, UserAvatarIsResponding, WrapperResponding,
} from './styles';
import { CurrentUserProps, CurrentUserType } from '../../types/currentUser';
import { IComment } from '../../types/comment';

export default function CurrentUser({
  replyingTo,
  setComments, comments,
}: CurrentUserProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUserType | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://localhost:3001/currentUser');
        const { data } = response;

        setCurrentUser(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function sendComment() {
    if (!textareaRef.current?.value) {
      return;
    }

    const commentsTotalLength = comments?.map(comment => {
      if (comment.replies?.length) {
        return [comment, ...comment.replies];
      }

      return comment;
    }).flat().length;

    const commentData: IComment = {
      id: commentsTotalLength + 1,
      you: true,
      content: textareaRef.current?.value!,
      createdAt: '1 week',
      score: 0,
      user: {
        image: {
          png: currentUser?.image.png!,
          webp: currentUser?.image.webp!,
        },
        username: currentUser?.username!,
      },
      replies: [],
    };

    try {
      const response = await axios.post('http://localhost:3001/comments', commentData);
      const { status } = response;
      console.log(status);

      if (status === 201) {
        if (textareaRef.current) {
          textareaRef.current.value = '';
        }

        setComments([...comments, commentData]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {replyingTo ? (
        <Container>
          <WrapperResponding>
            <UserAvatarIsResponding src={currentUser?.image.png} />
            <TextContent wrap="wrap" autoFocus ref={textareaRef} value={`@${replyingTo}`} />
            <Button>Reply</Button>
          </WrapperResponding>
        </Container>
      ) : (
        <Container>
          <WrapperResponding>
            <UserAvatarIsResponding src={currentUser?.image.png} />
            <TextContent wrap="wrap" autoFocus ref={textareaRef} placeholder="Add a comment" />
            <Button onClick={sendComment}>Send</Button>
          </WrapperResponding>
        </Container>
      )}
    </>
  );
}
