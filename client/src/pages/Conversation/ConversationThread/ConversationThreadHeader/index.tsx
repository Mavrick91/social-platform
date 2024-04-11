import { Link } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';
import { ThreadUserFragment } from '@/__generated__/graphql.ts';

interface ConversationThreadHeaderProps {
  recipientUser: ThreadUserFragment;
}

export default function ConversationThreadHeader({
  recipientUser,
}: ConversationThreadHeaderProps) {
  const { username, avatar, firstName, lastName } = recipientUser;

  return (
    <div className="flex justify-between items-center p-4 py-5 w-full border-b border-separator">
      <Link to={`/${username}`}>
        <div className="flex items-center">
          <UserAvatar avatar={avatar} />
          <span className="ml-3 font-bold">{`${firstName} ${lastName}`}</span>
        </div>
      </Link>
    </div>
  );
}
