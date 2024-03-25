import PostAction from '@/components/PostDetailsDialog/PostAction';
import UserAvatar from '@/components/UserAvatar';
import { cn } from '@/lib/utils';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Ellipsis } from 'lucide-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

type Props = {
  avatar?: string | null;
  firstName: string;
  lastName: string;
  createdAt: string;
  profileId: number;
  pictureId: number;
};

export default function PostHeader({
  avatar,
  firstName,
  lastName,
  createdAt,
  profileId,
  pictureId,
}: Props) {
  const { user } = useUserInfo();

  const isFollowingCurrentProfile = user.initiatedFollows.some(
    (follow) => follow.targetUserId === profileId
  );

  return (
    <div className="flex justify-between items-center mb-3 ml-1">
      <div className="flex items-center">
        <Link to={`/profile/${profileId}`} className="shrink-0">
          <UserAvatar avatar={avatar} className="size-8" />
        </Link>
        <div className="ml-3">
          <p className="text-sm font-semibold">
            <Link to={`/profile/${profileId}`} className="shrink-0">
              <span>{firstName}</span> <span>{lastName}</span>
            </Link>{' '}
            •{' '}
            <span className="text-xs text-zinc-500">
              {moment(createdAt).fromNow()}
              {!isFollowingCurrentProfile && (
                <>
                  •{' '}
                  <ButtonFollow
                    isFollowing={isFollowingCurrentProfile}
                    targetUserId={profileId}
                    className={cn(
                      'bg-transparent p-0 hover:bg-transparent text-blue-400 hover:text-blue-600'
                    )}
                  />
                </>
              )}
            </span>
          </p>
        </div>
      </div>
      <PostAction pictureId={pictureId} isUnfollow profileId={profileId}>
        <Ellipsis />
      </PostAction>
    </div>
  );
}
