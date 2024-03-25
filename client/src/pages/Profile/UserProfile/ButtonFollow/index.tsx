import { Button } from '@/components/ui/button';
import useFollow from '@/hooks/useFollow';
import useUnFollow from '@/hooks/useUnFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import React, { useCallback } from 'react';

type Props = {
  isFollowing: boolean;
  targetUserId: number;
  callback?: () => void;
  className?: string;
};

const ButtonFollow: React.FC<Props> = ({
  isFollowing,
  targetUserId,
  callback,
  className,
}) => {
  const [follow] = useFollow();
  const [unfollow] = useUnFollow();
  const { user } = useUserInfo();

  const handleFollow = useCallback(async () => {
    await follow({
      fetchPolicy: 'no-cache',
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
    <Button
      size="xs"
      className={className}
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      {isFollowing ? `Unfollow` : `Follow`}
    </Button>
  );
};

export default ButtonFollow;
