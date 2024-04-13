import { useGetThreadsByUserIdQuery } from '@/__generated__/graphql.ts';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';
import QuerySpinner from '@/components/ui/QuerySpinner.tsx';
import UserAvatar from '@/components/UserAvatar';
import { cn } from '@/lib/utils.ts';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import UserListItem from '@/components/UserListItem';

function ConversationList() {
  const params = useParams();
  const threadId = Number(params.threadId);
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
                'bg-highlight-background': threadId === thread.id,
                'hover:bg-hover-overlay': threadId !== thread.id,
              })}
            >
              <UserListItem
                subText={
                  <>
                    <span>
                      {lastMessage?.user?.id === user.id ? 'You: ' : ''}
                    </span>
                    <span className="truncate max-w-52">
                      {lastMessage.content}
                    </span>
                    <span> · {moment(lastMessage.createdAt).fromNow()}</span>
                  </>
                }
                firstName={recipientUser.firstName}
                lastName={recipientUser.lastName}
                avatar={recipientUser?.avatar}
                size="size-14"
                subTextSize="xs"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ConversationList;
