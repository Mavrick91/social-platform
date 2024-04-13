import { UserFragmentFragment } from '@/__generated__/graphql';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Fragment, useState } from 'react';
import UserListItem from '@/components/UserListItem';

type Props = {
  follower: UserFragmentFragment;
};

export default function FollowersDialogItem({ follower }: Props) {
  const user = useUserInfo();

  const isFollowingProfile = user.initiatedFollows.some(
    (follow) => follow.targetUserId === follower.id
  );
  const [defaultFollow, setDefaultFollow] = useState(isFollowingProfile);

  return (
    <Fragment>
      <div className="flex gap-3 pr-4 -ml-2 justify-between items-center">
        <UserListItem
          avatar={follower.avatar}
          firstName={follower.username}
          subText={
            <>
              {follower.firstName} {follower.lastName}
            </>
          }
          subTextSize="sm"
        />
        {user.id !== follower.id && (
          <ButtonFollow
            buttonProps={{
              variant: defaultFollow ? 'gray' : 'blue',
              size: 'xs',
            }}
            isFollowing={defaultFollow}
            targetUserId={follower.id}
            callback={() => setDefaultFollow(!defaultFollow)}
          />
        )}
      </div>
    </Fragment>
  );
}
