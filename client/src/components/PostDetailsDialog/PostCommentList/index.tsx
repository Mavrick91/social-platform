import { useGetCommentsByPictureQuery } from '@/__generated__/graphql';
import PictureCommentForm from '@/components/PostDetailsDialog/PostCommentForm';
import moment from 'moment';
import { useEffect, useRef } from 'react';

type Props = {
  pictureId: number;
  setErrorMutation: (value: string | null) => void;
};

function PostCommentList({ pictureId, setErrorMutation }: Props) {
  const commentListRef = useRef<HTMLDivElement>(null);
  const { data, loading, refetch, error } = useGetCommentsByPictureQuery({
    variables: { pictureId },
  });

  useEffect(() => {
    if (error) {
      setErrorMutation(error.message);
    }
  }, [error, setErrorMutation]);

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="flex flex-col grow">
      <div
        className="space-y-2 pr-6 p-3 h-0 grow overflow-y-auto"
        ref={commentListRef}
      >
        {data?.commentsByPictureId.map((comment) => {
          return (
            <div
              key={comment.id}
              className="flex justify-center gap-1 flex-col"
            >
              <div className="flex items-center justify-between">
                <p className="inline-flex items-center mr-3 text-base text-gray-900 dark:text-white font-semibold">
                  {comment.user?.firstName} {comment.user?.lastName}
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

export default PostCommentList;
