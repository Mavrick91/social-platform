import { UserFragmentFragment } from '@/__generated__/graphql';
import UserAvatar from '@/components/UserAvatar';
import { Separator } from '@/components/ui/separator';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Fragment, useState } from 'react';

type Props = {
  follower: UserFragmentFragment;
};

export default function FollowersDialogItem({ follower }: Props) {
  const { user } = useUserInfo();

  const isFollowingProfile = user.initiatedFollows.some(
    (follow) => follow.targetUserId === follower.id
  );
  const [defaultFollow, setDefaultFollow] = useState(isFollowingProfile);

  return (
    <Fragment>
      <div className="flex px-5 justify-between items-center">
        <div className="flex gap-4 items-center">
          <UserAvatar avatar={follower.avatar} />
          <b>
            {follower.firstName} {follower.lastName}
          </b>
        </div>
        {user.id !== follower.id && (
          <ButtonFollow
            isFollowing={defaultFollow}
            targetUserId={follower.id}
            callback={() => setDefaultFollow(!defaultFollow)}
          />
        )}
      </div>
      <Separator className="last:hidden" />
    </Fragment>
  );
}
