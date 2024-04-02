import { Button, ButtonProps } from '@/components/ui/button';
import useFollow from '@/hooks/graphql/useFollow';
import useUnFollow from '@/hooks/graphql/useUnFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import React, { useCallback } from 'react';

type Props = {
  isFollowing: boolean;
  targetUserId: number;
  callback?: () => void;
  className?: string;
  buttonProps?: Omit<ButtonProps, 'onClick'>;
};

const ButtonFollow: React.FC<Props> = ({
  isFollowing,
  targetUserId,
  callback,
  buttonProps,
}) => {
  const [follow] = useFollow();
  const [unfollow] = useUnFollow();
  const user = useUserInfo();

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
      onClick={isFollowing ? handleUnfollow : handleFollow}
      {...buttonProps}
    >
      {isFollowing ? `Following` : `Follow`}
    </Button>
  );
};

export default ButtonFollow;
