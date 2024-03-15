import { GET_COMMENTS_BY_PICTURE } from '@/graphql/queries/comment';
import { useQuery } from '@apollo/client';
import { Comment } from '@/generated/graphql.tsx';
import moment from 'moment';
import PictureCommentForm from '@/components/PictureDetailsDialog/PictureCommentForm';
import { useEffect, useRef } from 'react';

type Props = {
  pictureId: number;
  setErrorMutation: (value: string | null) => void;
};

function PictureCommentList({ pictureId, setErrorMutation }: Props) {
  const commentListRef = useRef<HTMLDivElement>(null);
  const { data, loading, refetch, error } = useQuery(GET_COMMENTS_BY_PICTURE, {
    variables: { pictureId },
  });

  useEffect(() => {
    if (error) {
      setErrorMutation(error.message);
    }
  }, [error, setErrorMutation]);

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="space-y-4 flex flex-col grow">
      <div
        className="space-y-2 pr-6 pl-3 max-h-[500px] grow overflow-y-auto"
        ref={commentListRef}
      >
        {data.commentsByPictureId.map((comment: Comment) => {
          return (
            <div
              key={comment.id}
              className="flex justify-center gap-1 flex-col"
            >
              <div className="flex items-center justify-between">
                <p className="inline-flex items-center mr-3 text-base text-gray-900 dark:text-white font-semibold">
                  {comment.author.firstName} {comment.author.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <time>{moment(comment.createdAt).fromNow()}</time>
                </p>
              </div>
              <p className="text-gray-500 text-wrap break-all text-sm dark:text-gray-400">
                {comment.content}
              </p>
            </div>
          );
        })}
      </div>
      <PictureCommentForm
        pictureId={pictureId}
        refetchCommentList={refetch}
        commentListRef={commentListRef}
        setErrorMutation={setErrorMutation}
      />
    </div>
  );
}

export default PictureCommentList;
