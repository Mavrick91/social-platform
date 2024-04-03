import UserAvatar from '@/components/UserAvatar';
import moment from 'moment';

type Props = {
  avatar?: string | null;
  firstName: string;
  lastName: string;
  content?: string | null;
  createdAt: string;
};

export default function PostCommentItem({
  avatar,
  firstName,
  lastName,
  content,
  createdAt,
}: Props) {
  if (!content) return null;

  return (
    <div className="flex">
      <div className="mr-4 shrink-0">
        <UserAvatar avatar={avatar} className="size-8" />
      </div>
      <div className="text-sm">
        <div className="inline-flex align-middle text-gray-900 font-semibold mr-1">
          {firstName} {lastName}{' '}
        </div>
        <span className="align-middle">{content}</span>
        <p className="text-xs mt-2 mb-1 text-gray-600 dark:text-gray-400">
          <time>{moment(createdAt).fromNow()}</time>
        </p>
      </div>
    </div>
  );
}
