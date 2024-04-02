import { UserFragmentFragment } from '@/__generated__/graphql';
import UserAvatar from '@/components/UserAvatar';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Fragment, useState } from 'react';

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
      <div className="flex px-4 py-2 justify-between items-center">
        <div className="flex items-center">
          <UserAvatar avatar={follower.avatar} />
          <b className="ml-3 text-sm font-semibold">{follower.username}</b>
        </div>
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
