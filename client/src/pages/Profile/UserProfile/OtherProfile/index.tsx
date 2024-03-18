import { Follow } from '@/__generated__/graphql';
import { Button } from '@/components/ui/button';
import { selectAuthenticatedUser } from '@/features/users/selectors';
import useFollow from '@/hooks/useFollow';
import useUnFollow from '@/hooks/useUnFollow';
import { useAppSelector } from '@/store/hooks';
import React, { useCallback } from 'react';

type Props = {
  followings: Follow[];
  userId: number;
};

const OtherProfile: React.FC<Props> = ({ followings, userId }) => {
  const [follow] = useFollow();
  const [unfollow] = useUnFollow();
  const userInfo = useAppSelector(selectAuthenticatedUser);

  const handleFollow = useCallback(() => {
    follow({
      variables: {
        input: { userId: userInfo.sub, followingId: userId },
      },
    });
  }, [follow, userInfo.sub, userId]);

  const handleUnfollow = useCallback(() => {
    unfollow({
      variables: {
        input: { userId: userInfo.sub, followingId: userId },
      },
    });
  }, [unfollow, userInfo.sub, userId]);

  const isFollowing = followings.some(
    (following) => following.followerId === userInfo.sub
  );

  return (
    <div>
      {isFollowing ? (
        <Button size="sm" className="bg-blue-500" onClick={handleUnfollow}>
          Unfollow
        </Button>
      ) : (
        <Button size="sm" className="bg-blue-500" onClick={handleFollow}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default OtherProfile;
