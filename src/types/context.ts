import { Dispatch, SetStateAction } from 'react';
import { IComment } from './comment';

export interface IContext {
  getRootComment: (comments: IComment[], commentId: number) => IComment
  comments: IComment[]
  setComments: Dispatch<SetStateAction<IComment[]>>
}
