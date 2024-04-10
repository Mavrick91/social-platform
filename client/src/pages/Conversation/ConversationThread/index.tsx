import { useGetThreadQuery } from '@/__generated__/graphql';
import ConversationThreadHeader from './ConversationThreadHeader';
import QuerySpinner from '@/components/ui/QuerySpinner.tsx';
import ConversationThreadMessages from '@/pages/Conversation/ConversationThread/ConversationThreadMessages';

export type Props = {
  threadId: number;
};

export default function ConversationThread({ threadId }: Props) {
  const { data, loading, error } = useGetThreadQuery({
    fetchPolicy: 'network-only',
    variables: {
      id: threadId,
    },
  });

  if (loading) return <QuerySpinner className="mt-10" />;
  if (error || !data) return <div>Error</div>;

  const recipientUser = data.thread.users[1];

  return (
    <div className="w-full flex flex-col">
      <ConversationThreadHeader recipientUser={recipientUser} />
      <ConversationThreadMessages
        recipientUser={recipientUser}
        messages={data?.thread.messages}
        threadId={threadId}
      />
    </div>
  );
}
