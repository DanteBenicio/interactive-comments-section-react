/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-no-useless-fragment */
import axios from 'axios';
import React, {
  memo, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { Container } from '../Comment/styles';
import {
  Button, TextContent, UserAvatarIsResponding, WrapperResponding,
} from './styles';
import { CurrentUserType } from '../../types/currentUser';
import { IComment, User } from '../../types/comment';
import { AppContext } from '../../context';
import { CommentUser } from '../../model/CommentUser';

export default function CurrenUser() {
  const { comments, setComments } = useContext(AppContext);
  const [currentUser, setCurrentUser] = useState<CurrentUserType>();
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

  const sendComment = useCallback(async (
    allComments: IComment[],
    currentUserParam: CurrentUserType,
  ) => {
    if (!textareaRef.current?.value) {
      return;
    }

    const commentsTotalLength = allComments?.map(comment => {
      if (comment.replies?.length) {
        return [comment, ...comment.replies];
      }

      return comment;
    }).flat().length;

    const date = new Intl.DateTimeFormat('en-US').format(new Date());

    const user: User = {
      image: {
        png: currentUserParam?.image.png!,
        webp: currentUserParam?.image.webp!,
      },
      username: currentUserParam?.username!,
    };

    const comment = new CommentUser(
      commentsTotalLength + 1,
      textareaRef.current?.value!,
      date,
      0,
      user,
      true,
      [],
    );

    try {
      const response = await axios.post('http://localhost:3001/comments', comment);
      const { status } = response;

      if (status === 201) {
        if (textareaRef.current) {
          textareaRef.current.value = '';
        }

        setComments(state => [...state, comment]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setComments]);

  return (
    <Container>
      <WrapperResponding>
        <UserAvatarIsResponding src={currentUser?.image.webp} alt="userimage that is responding" width="45px" height="45px" />
        <TextContent wrap="wrap" autoFocus ref={textareaRef} placeholder="Add a comment" />
        <Button onClick={() => sendComment(comments, currentUser!)}>Send</Button>
      </WrapperResponding>
    </Container>
  );
}
