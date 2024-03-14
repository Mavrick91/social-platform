import { Textarea } from '@/components/ui/textarea.tsx';
import { Button } from '@/components/ui/button.tsx';
import { COMMENT_PICTURE_MUTATION } from '@/graphql/mutation/comment.ts';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { RefObject, useEffect } from 'react';

const commentSchema = z.object({
  content: z.string().min(1, 'Comment content is required'),
});

type CommentFormData = z.infer<typeof commentSchema>;

type Props = {
  pictureId: number;
  refetchCommentList: () => void;
  commentListRef: RefObject<HTMLDivElement>;
  setErrorMutation: (value: string | null) => void;
};

function PictureCommentForm({
  pictureId,
  refetchCommentList,
  commentListRef,
  setErrorMutation,
}: Props) {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const [
    commentPicture,
    { loading: commentPictureLoading, error: commentPictureError },
  ] = useMutation(COMMENT_PICTURE_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    if (commentPictureError) {
      setErrorMutation(commentPictureError.message);
    }
  }, [commentPictureError, setErrorMutation]);

  const onSubmit = async (data: CommentFormData) => {
    try {
      await commentPicture({
        variables: {
          createCommentInput: {
            content: data.content,
            authorId: userInfo.sub,
            pictureId,
          },
        },
      });
      refetchCommentList();
      commentListRef.current?.scroll({
        top: 0,
        behavior: 'smooth',
      });
      reset();
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        placeholder="Write your comment here..."
        {...register('content')}
        error={errors.content?.message}
      />
      <div className="flex justify-end mt-4">
        <Button size="sm" type="submit" loading={commentPictureLoading}>
          Post Comment
        </Button>
      </div>
    </form>
  );
}

export default PictureCommentForm;
