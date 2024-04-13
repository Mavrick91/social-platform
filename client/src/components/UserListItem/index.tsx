import UserAvatar from '@/components/UserAvatar';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';

type Props = {
  avatar?: string | null;
  firstName: string;
  lastName?: string;
  subText: string | ReactNode;
  size?: string;
  username?: string;
  subTextSize: 'sm' | 'xs';
};

function UserListItem({
  avatar,
  firstName,
  lastName,
  subText,
  subTextSize,
  username,
  size = 'size-11',
}: Props) {
  return (
    <div className="flex px-6 items-center py-2">
      <UserAvatar avatar={avatar} size={size} username={username} />
      <div className="flex flex-col items-start ml-3">
        <span className="text-sm text-primary-text">
          {firstName} {lastName}
        </span>
        {subText && (
          <span
            className={cn('text-secondary-text text-left', {
              'text-sm': subTextSize === 'sm',
              'text-xs mt-1': subTextSize === 'xs',
            })}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
}

export default UserListItem;
