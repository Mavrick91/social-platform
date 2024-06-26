import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import { z } from 'zod';
import useCreateMessage from '@/hooks/graphql/useCreateMessage.ts';

const schema = z.object({
  message: z.string(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  threadId: number;
};
export function ThreadMessageForm({ threadId }: Props) {
  const user = useUserInfo();

  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const messageWatch = watch('message');

  const [createMessage] = useCreateMessage(threadId);

  const onSubmit = async (data: FormData) => {
    await createMessage({
      variables: {
        createMessageInput: {
          content: data.message,
          threadId,
          userId: user.id,
        },
      },
    });
    reset();
  };

  return (
    <div className="m-4">
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <div className="h-11 flex items-center">
          <Input
            {...register('message')}
            placeholder="Message..."
            className="rounded-full bg-primary-background h-full pl-6 text-[15px]"
            autoComplete="off"
          />
        </div>
        <Button
          variant="ghost"
          type="submit"
          disabled={!messageWatch}
          className="absolute top-1/2 transform -translate-y-1/2 right-5"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
