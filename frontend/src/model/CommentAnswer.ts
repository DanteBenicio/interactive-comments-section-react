import { User } from '../types/comment';
import { RepliesType } from '../types/replies';

export class CommentAnswer implements RepliesType {
  id: number;

  content: string;

  createdAt: string;

  score: number;

  replyingTo: string;

  user: User;

  you?: boolean;

  constructor(
    id: number,
    content: string,
    createdAt: string,
    score: number,
    replyingTo: string,
    user: User,
    you: boolean,
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.score = score;
    this.replyingTo = replyingTo;
    this.user = user;
    this.you = you;
  }
}
