import {
  ThreadMessageFragment,
  ThreadUserFragment,
  useMessageAddedSubscription,
} from '@/__generated__/graphql.ts';
import { ThreadMessageItem } from './ThreadMessageItem';
import { useEffect, useRef, useState } from 'react';
import { ThreadMessageForm } from './threadMessageForm';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Props = {
  messages: ThreadMessageFragment[];
  threadId: number;
  recipientUser: ThreadUserFragment;
};

const TIMESTAMP_THRESHOLD = 5 * 60 * 1000; // 5 minutes in milliseconds

function shouldShowTimestamp(
  currentMessage: ThreadMessageFragment,
  previousMessage: ThreadMessageFragment | undefined
): boolean {
  if (!previousMessage || !currentMessage) {
    return true;
  }

  const currentTimestamp = new Date(currentMessage.createdAt).getTime();
  const previousTimestamp = new Date(previousMessage.createdAt).getTime();
  const timeDifference = currentTimestamp - previousTimestamp;

  return timeDifference >= TIMESTAMP_THRESHOLD;
}

export default function ConversationThreadMessages({
  messages,
  threadId,
  recipientUser,
}: Props) {
  const { data } = useMessageAddedSubscription({
    variables: {
      threadId: threadId,
    },
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [displayedMessages, setDisplayedMessages] =
    useState<ThreadMessageFragment[]>(messages);

  useEffect(() => {
    if (data?.messageAdded) {
      setDisplayedMessages((prevMessages) => [
        ...prevMessages,
        data.messageAdded,
      ]);
    }
  }, [data]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  console.log('😀😀', { recipientUser });

  return (
    <>
      <div
        className="grow flex flex-col overflow-y-auto items-end"
        ref={messagesEndRef}
      >
        <div className="py-6 flex flex-col justify-center items-center self-stretch">
          <UserAvatar avatar={recipientUser.avatar} size="size-24" />
          <div className="text-xl font-bold my-4 text-primary-text">
            {recipientUser.firstName} {recipientUser.lastName}
          </div>
          <Button variant="gray" size="xs">
            <Link to={`/${recipientUser.username}`}>View Profile</Link>
          </Button>
        </div>

        {displayedMessages.map((message, index) => {
          const previousMessage = displayedMessages[index - 1];
          const nextMessage = displayedMessages[index + 1];
          const showTimestamp = shouldShowTimestamp(message, previousMessage);
          const willShowTimestamp = shouldShowTimestamp(nextMessage, message);

          const isFirstMessage =
            index === 0 ||
            message.user.id !== previousMessage?.user.id ||
            showTimestamp;

          const isLastMessage =
            index === displayedMessages.length - 1 ||
            message.user.id !== nextMessage?.user.id ||
            willShowTimestamp;

          return (
            <ThreadMessageItem
              key={message.id}
              message={message}
              isFirstMessage={isFirstMessage}
              isLastMessage={isLastMessage}
              showTimestamp={showTimestamp}
            />
          );
        })}
      </div>
      <ThreadMessageForm threadId={threadId} />
    </>
  );
}
