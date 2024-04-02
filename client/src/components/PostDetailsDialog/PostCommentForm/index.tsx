import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCreateComment } from '@/hooks/graphql/useCreateComment';
import { useUserInfo } from '@/providers/UserInfoProvider';
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

function PostCommentForm({
  pictureId,
  refetchCommentList,
  commentListRef,
  setErrorMutation,
}: Props) {
  const user = useUserInfo();

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
            userId: user.id,
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
      <Separator />
      <div className="flex items-center h-14 pr-4 pl-2">
        <TextareaAutosize
          className="w-full p-2 placeholder:text-secondary text-sm focus:outline-none resize-none"
          placeholder="Add a comment..."
          {...register('content')}
          maxRows={4}
        />
        <Button
          className="size-12 flex justify-center items-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          variant="ghost"
          disabled={!content}
        >
          Post
        </Button>
      </div>
    </form>
  );
}

export default PostCommentForm;
