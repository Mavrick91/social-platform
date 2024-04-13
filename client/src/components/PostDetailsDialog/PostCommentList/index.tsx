import {
  PictureFragmentFragment,
  useGetCommentsByPictureQuery,
} from '@/__generated__/graphql';
import PostCTA from '@/components/PostCTA';
import PictureCommentForm from '@/components/PostDetailsDialog/PostCommentForm';
import QuerySpinner from '@/components/ui/QuerySpinner';
import moment from 'moment';
import { useMemo, useRef } from 'react';
import PostCommentItem from '../PostCommentItem';

type Props = {
  picture: PictureFragmentFragment;
};

const PostCommentList = ({ picture }: Props) => {
  const commentListRef = useRef<HTMLDivElement>(null);
  const { data, loading, refetch } = useGetCommentsByPictureQuery({
    variables: { pictureId: picture.id },
  });

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
        <div className="flex flex-col items-center justify-center grow h-full text-primary-text">
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
            username={picture.user.username}
          />
        )}
        {data?.commentsByPictureId.map((comment) => (
          <PostCommentItem
            key={comment.id}
            avatar={comment.user.avatar}
            content={comment.content}
            username={comment.user.username}
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
        className="space-y-2 pr-6 p-3 h-0 grow overflow-y-auto text-primary-text"
        ref={commentListRef}
      >
        {renderComments()}
      </div>
      <div className="border-t border-separator p-3 pt-1.5">
        <PostCTA picture={picture} showMessageIcon={false} />
        <span className="text-secondary text-xs">
          {moment(picture?.createdAt).format('D MMMM YYYY')}
        </span>
      </div>
      {!picture.disableComments && (
        <PictureCommentForm
          pictureId={picture.id}
          refetchCommentList={refetch}
          commentListRef={commentListRef}
        />
      )}
    </div>
  );
};

export default PostCommentList;
