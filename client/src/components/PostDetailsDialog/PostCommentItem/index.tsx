import UserAvatar from '@/components/UserAvatar';
import moment from 'moment';
import { Link } from 'react-router-dom';

type Props = {
  avatar?: string | null;
  firstName: string;
  lastName: string;
  content?: string | null;
  createdAt: string;
  username: string;
};

export default function PostCommentItem({
  avatar,
  firstName,
  lastName,
  content,
  createdAt,
  username,
}: Props) {
  if (!content) return null;

  return (
    <div className="flex text-primary-text">
      <div className="mr-4 shrink-0">
        <UserAvatar avatar={avatar} username={username} size="size-8" />
      </div>
      <div className="text-sm">
        <Link
          to={`/${username}`}
          className="inline-flex align-middle font-semibold mr-1 hover:opacity-50"
        >
          {firstName} {lastName}{' '}
        </Link>
        <span className="align-middle">{content}</span>
        <p className="text-xs mt-2 mb-1 text-secondary">
          <time>{moment(createdAt).fromNow()}</time>
        </p>
      </div>
    </div>
  );
}
