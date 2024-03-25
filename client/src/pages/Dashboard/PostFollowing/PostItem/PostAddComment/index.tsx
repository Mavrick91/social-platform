import { useCreateComment } from '@/hooks/graphql/useCreateComment';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { z } from 'zod';

const schema = z.object({
  comment: z.string().min(1, { message: 'Comment is required' }),
});

type Inputs = z.infer<typeof schema>;

type Props = {
  pictureId: number;
};

export default function PostAddComment({ pictureId }: Props) {
  const { reset, register, handleSubmit, watch } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const { user } = useUserInfo();
  const [createComment] = useCreateComment();
  const watchComment = watch('comment');

  const onSubmit = async (data: Inputs) => {
    await createComment({
      variables: {
        createCommentInput: {
          authorId: user.id,
          pictureId,
          content: data.comment,
        },
      },
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-2 flex items-center"
    >
      <TextareaAutosize
        className="bg-transparent min-h-5 pr-12 resize-none max-h-52 w-full outline-none text-gray-800 text-sm placeholder:text-zinc-500"
        placeholder="Add a comment"
        {...register('comment')}
        maxRows={4}
      />

      {watchComment && (
        <button
          type="submit"
          className="absolute text-blue-500 font-bold text-sm top-1/2 right-0 transform -translate-y-1/2"
        >
          Post
        </button>
      )}
    </form>
  );
}
