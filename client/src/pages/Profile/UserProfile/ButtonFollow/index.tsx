import { Button } from '@/components/ui/button';
import useFollow from '@/hooks/useFollow';
import useUnFollow from '@/hooks/useUnFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import React, { useCallback } from 'react';

type Props = {
  isFollowing: boolean;
  targetUserId: number;
  callback?: () => void;
};

const ButtonFollow: React.FC<Props> = ({
  isFollowing,
  targetUserId,
  callback,
}) => {
  const [follow] = useFollow();
  const [unfollow] = useUnFollow();
  const { user } = useUserInfo();

  const handleFollow = useCallback(async () => {
    await follow({
      variables: {
        input: { userId: targetUserId, followingId: user.id },
      },
    });

    callback && callback();
  }, [follow, targetUserId, user.id, callback]);

  const handleUnfollow = useCallback(async () => {
    await unfollow({
      variables: {
        input: { userId: user.id, followingId: targetUserId },
      },
    });

    callback && callback();
  }, [unfollow, targetUserId, user.id, callback]);

  return (
    <div>
      {isFollowing ? (
        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-600"
          onClick={handleUnfollow}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          size="sm"
          className="bg-blue-500 hover:bg-blue-600"
          onClick={handleFollow}
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default ButtonFollow;
