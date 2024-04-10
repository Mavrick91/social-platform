import { useGetThreadsByUserIdQuery } from '@/__generated__/graphql.ts';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import QuerySpinner from '@/components/ui/QuerySpinner.tsx';
import UserAvatar from '@/components/UserAvatar';
import { cn } from '@/lib/utils.ts';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

function ConversationList() {
  const { threadId } = useParams();
  const user = useUserInfo();
  const { data, loading } = useGetThreadsByUserIdQuery({
    variables: {
      userId: user.id,
    },
  });

  if (loading) return <QuerySpinner className="mt-10" />;

  return (
    <div>
      {data?.threadsByUserId.map((thread) => {
        const recipientUser = thread.users.find((u) => u.id !== user.id);
        const lastMessage = thread.messages[thread.messages.length - 1];
        return (
          <Link to={`/direct/t/${thread.id}`}>
            <div
              key={thread.id}
              className={cn({
                'bg-secondary-button-background': threadId === thread.id,
                'hover:bg-gray-50': threadId !== thread.id,
              })}
            >
              <div className="px-6 py-2 flex">
                <UserAvatar
                  avatar={recipientUser?.avatar}
                  className="size-14"
                />
                <div className="ml-3 flex flex-col justify-center grow">
                  <span className="text-primary-text text-sm">
                    {recipientUser?.username}
                  </span>
                  <span className="text-secondary flex gap-x-1 text-xs mt-1">
                    <span>
                      {lastMessage?.user?.id === user.id ? 'You: ' : ''}
                    </span>
                    <span className="truncate max-w-52">
                      {lastMessage.content}
                    </span>
                    <span> · {moment(lastMessage.createdAt).fromNow()}</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ConversationList;
