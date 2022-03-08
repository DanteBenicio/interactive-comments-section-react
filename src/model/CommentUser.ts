import { User } from '../types/comment';
import { RepliesType } from '../types/replies';

export class CommentUser implements RepliesType {
  id: number;

  content: string;

  createdAt: string;

  replyingTo: string;

  score: number;

  user: User;

  you: boolean;

  constructor(
    id: number,
    content: string,
    createdAt: string,
    replyingTo: string,
    score: number,
    user: User,
    you: boolean,
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.replyingTo = replyingTo;
    this.score = score;
    this.user = user;
    this.you = you;
  }
}
