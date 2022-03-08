import {
  createContext, ReactNode, useCallback, useMemo, useState,
} from 'react';
import { IComment } from '../types/comment';
import { IContext } from '../types/context';

const initialValueContext = {
  getRootComment: (comments: IComment[], commentId: number) => ({} as IComment),
  comments: [] as IComment[],
  setComments: () => {},
};

export const AppContext = createContext<IContext>(initialValueContext);

type AppProviderProps = {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  const [comments, setComments] = useState<IComment[] | []>([]);

  const getRootComment = useCallback((allComments, commentId) => {
    return allComments.find((comment: IComment) => {
      if (comment.replies?.length) {
        return comment.replies?.find(reply => {
          if (reply.id === commentId) {
            return comment;
          }

          return false;
        });
      }

      return false;
    });
  }, []);

  const contextValue = useMemo(() => (
    { getRootComment, comments, setComments }
  ), [getRootComment, comments, setComments]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
