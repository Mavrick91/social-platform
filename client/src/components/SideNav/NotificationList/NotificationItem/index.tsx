import { NotificationFragmentFragment } from '@/__generated__/graphql';
import UserAvatar from '@/components/UserAvatar';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import moment from 'moment';

type Props = {
  notification: NotificationFragmentFragment;
};

export default function NotificationItem({ notification }: Props) {
  const renderContentBasedOnType = () => {
    switch (notification.type) {
      case 'COMMENT':
        return (
          <>
            <div className="text-primary-text">
              <span className="mr-1 font-semibold">
                {notification.sender.username}
              </span>
              <span className="text-sm">
                commented: {notification.comment?.content}
              </span>
            </div>
          </>
        );
      case 'LIKE':
        return (
          <>
            <div className="text-primary-text">
              <span className="mr-1 font-semibold">
                {notification.sender.username}
              </span>
              <span className="text-sm">liked your photo.</span>
            </div>
          </>
        );
      case 'FOLLOW':
        return (
          <>
            <div className="text-primary-text">
              <span className="mr-1 font-semibold">
                {notification.sender.username}
              </span>
              <span className="text-sm">started following you.</span>
            </div>
          </>
        );
      // Handle other types as necessary
      default:
        return null;
    }
  };

  const user = useUserInfo();

  const isFollowingCurrentProfile = user.initiatedFollows.some(
    (follow) => follow.targetUserId === notification.sender.id
  );

  return (
    <button
      type="button"
      className="flex w-full text-left items-center px-6 py-2 hover:bg-hover-overlay"
    >
      <div className="shrink-0 mr-3">
        <UserAvatar avatar={notification.sender.avatar} size="size-11" />
      </div>
      <div className="flex items-center shrink gap-7 justify-between w-full">
        <div className="text-sm">
          {renderContentBasedOnType()}{' '}
          <span className="text-secondary">
            {moment(notification.createdAt).fromNow()}
          </span>
        </div>
        {notification.type === 'FOLLOW' ? (
          <ButtonFollow
            buttonProps={{
              variant: isFollowingCurrentProfile ? 'gray' : 'blue',
              size: 'xs',
            }}
            isFollowing={isFollowingCurrentProfile}
            targetUserId={notification.sender.id}
          />
        ) : (
          <div className="size-11 shrink-0">
            <img
              src={notification.picture?.sizes.small}
              alt={notification.picture?.altText}
              className="object-cover aspect-square"
            />
          </div>
        )}
      </div>
    </button>
  );
}
