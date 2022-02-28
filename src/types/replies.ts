import { IComment } from './comment';

export interface RepliesType extends IComment {
  replyingTo: string
}
