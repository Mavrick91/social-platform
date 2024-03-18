import { useCommentPictureMutation } from '@/__generated__/graphql';
import { Separator } from '@/components/ui/separator';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { useCreateComment } from '@/hooks/useCreateComment';
import { useAppSelector } from '@/store/hooks.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { RefObject, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import * as z from 'zod';

const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment content is required')
    .transform((val) => val.trim()),
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

  const [commentPicture, { error: commentPictureError }] = useCreateComment();

  const { register, handleSubmit, reset, watch } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const content = watch('content');

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
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <Separator />
      <div className="flex items-center">
        <TextareaAutosize
          className="w-full p-2 focus:outline-none resize-none"
          placeholder="Write your comment here..."
          {...register('content')}
          maxRows={4}
        />
        <button
          className="size-12 flex justify-center items-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={!content}
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
}

export default PictureCommentForm;
