import { IComment, User } from '../types/comment';
import { RepliesType } from '../types/replies';

export class CommentUser implements IComment {
  id: number;

  content: string;

  createdAt: string;

  score: number;

  user: User;

  you: boolean;

  replies?: RepliesType[];

  constructor(
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: User,
    you: boolean,
    replies?: RepliesType[],
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.score = score;
    this.user = user;
    this.you = you;
    this.replies = replies;
  }
}
