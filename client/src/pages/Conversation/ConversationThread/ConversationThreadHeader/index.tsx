import { Link } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';
import { ThreadUserFragment } from '@/__generated__/graphql.ts';

type Props = {
  recipientUser: ThreadUserFragment;
};
export default function ConversationThreadHeader({ recipientUser }: Props) {
  return (
    <div className="flex justify-between items-center p-4 py-5 w-full border-b border-separator">
      <Link to={`/${recipientUser?.username}`}>
        <div className="flex items-center">
          <UserAvatar avatar={recipientUser?.avatar} />
          <span className="ml-3 font-bold">
            {recipientUser?.firstName} {recipientUser?.lastName}{' '}
          </span>
        </div>
      </Link>
    </div>
  );
}
