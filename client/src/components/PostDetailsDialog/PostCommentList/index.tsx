import { useEffect, useMemo, useRef } from 'react';
import moment from 'moment';
import {
  PictureFragmentFragment,
  useGetCommentsByPictureQuery,
} from '@/__generated__/graphql';
import { useUserInfo } from '@/providers/UserInfoProvider';
import PostCTA from '@/components/PostCTA';
import PictureCommentForm from '@/components/PostDetailsDialog/PostCommentForm';
import PostCommentItem from '../PostCommentItem';
import QuerySpinner from '@/components/ui/QuerySpinner';

type Props = {
  picture: PictureFragmentFragment;
  setErrorMutation: (value: string | null) => void;
};

const PostCommentList = ({ picture, setErrorMutation }: Props) => {
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

    return data?.commentsByPictureId.length > 0 || picture.description;
  }, [data, picture.description]);

  const renderComments = () => {
    if (loading) {
      return <QuerySpinner size={50} className="mt-10" />;
    }

    if (!hasComments || picture.disableComments) {
      return (
        <div className="flex flex-col items-center justify-center grow h-full">
          <span className="font-bold text-2xl">No comments yet.</span>
          <span className="text-sm mt-2">Start the conversation.</span>
        </div>
      );
    }

    return (
      <>
        {picture.description && (
          <PostCommentItem
            avatar={picture.user.avatar}
            content={picture.description}
            createdAt={picture.createdAt}
            firstName={picture.user.firstName}
            lastName={picture.user.lastName}
          />
        )}
        {data?.commentsByPictureId.map((comment) => (
          <PostCommentItem
            key={comment.id}
            avatar={comment.user.avatar}
            content={comment.content}
            createdAt={comment.createdAt}
            firstName={comment.user.firstName}
            lastName={comment.user.lastName}
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex flex-col grow">
      <div
        className="space-y-2 pr-6 p-3 h-0 grow overflow-y-auto"
        ref={commentListRef}
      >
        {renderComments()}
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
};

export default PostCommentList;
