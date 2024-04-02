import {
  PictureFragmentFragment,
  useGetCommentsByPictureQuery,
} from '@/__generated__/graphql';
import PostCTA from '@/components/PostCTA';
import PictureCommentForm from '@/components/PostDetailsDialog/PostCommentForm';
import { useUserInfo } from '@/providers/UserInfoProvider';
import moment from 'moment';
import { useEffect, useMemo, useRef } from 'react';
import PostCommentItem from '../PostCommentItem';
import QuerySpinner from '@/components/ui/QuerySpinner';

type Props = {
  picture: PictureFragmentFragment;
  setErrorMutation: (value: string | null) => void;
};

function PostCommentList({ picture, setErrorMutation }: Props) {
  const user = useUserInfo();
  const commentListRef = useRef<HTMLDivElement>(null);
  const { data, loading, refetch, error } = useGetCommentsByPictureQuery({
    variables: { pictureId: picture.id },
  });

  useEffect(() => {
    if (error) {
      setErrorMutation(error.message);
    }
  }, [error, setErrorMutation]);

  const hasComments = useMemo(() => {
    if (!data) return false;

    return data.commentsByPictureId.length > 0 || picture.description;
  }, [data, picture.description]);

  return (
    <div className="flex flex-col grow">
      <div
        className="space-y-2 pr-6 p-3 h-0 grow overflow-y-auto"
        ref={commentListRef}
      >
        {loading && <QuerySpinner size={50} className="mt-10" />}

        {!hasComments && !loading && (
          <div className="flex flex-col items-center justify-center grow h-full">
            <span className="font-bold text-2xl">No comments yet.</span>
            <span className="text-sm mt-2">Start the conversation.</span>
          </div>
        )}

        {!loading && (
          <PostCommentItem
            avatar={user.avatar}
            content={picture.description}
            createdAt={picture.createdAt}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        )}

        {data?.commentsByPictureId.map((comment) => {
          return (
            <PostCommentItem
              key={comment.id}
              avatar={comment.user.avatar}
              content={comment.content}
              createdAt={comment.createdAt}
              firstName={comment.user.firstName}
              lastName={comment.user.lastName}
            />
          );
        })}
      </div>
      <div className="border-t border-separator-post p-3 pt-1.5">
        <PostCTA picture={picture} showMessageIcon={false} />
        <span className="text-secondary text-xs">
          {moment(picture?.createdAt).fromNow()}
        </span>
      </div>
      {!picture.disableComments && (
        <PictureCommentForm
          pictureId={picture.id}
          refetchCommentList={refetch}
          commentListRef={commentListRef}
          setErrorMutation={setErrorMutation}
        />
      )}
    </div>
  );
}

export default PostCommentList;
