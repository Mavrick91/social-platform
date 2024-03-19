import {
  UserProfileFragment,
  useGetUserProfileQuery,
} from '@/__generated__/graphql';
import FollowersDialog from '@/components/FollowersDialog';
import UserAvatar from '@/components/UserAvatar';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonFollow from './ButtonFollow';
import OwnProfile from './OwnProfile';

type Props = {
  profileId: number;
};

function UserProfile({ profileId }: Props) {
  const { user } = useUserInfo();
  const navigate = useNavigate();
  const { data, loading, error } = useGetUserProfileQuery({
    variables: { profileId },
  });

  useEffect(() => {
    if (error) {
      navigate(`/profile/${user.id}`);
    }
  }, [error, navigate, user.id]);

  if (loading || !data) {
    return null;
  }

  const currentProfile = data.user as UserProfileFragment;

  const isFollowingCurrentProfile = user.initiatedFollows.some(
    (follow) => follow.targetUserId === currentProfile.id
  );

  return (
    <div>
      <div className="flex items-center space-x-6">
        <UserAvatar
          alt="Profile picture"
          avatar={currentProfile.avatar}
          className="size-24"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              <span>{currentProfile.firstName}</span>{' '}
              <span>{currentProfile.lastName}</span>
            </h1>
            <div className="flex items-center space-x-2">
              {user.id === currentProfile.id ? (
                <OwnProfile />
              ) : (
                <ButtonFollow
                  isFollowing={isFollowingCurrentProfile}
                  targetUserId={profileId}
                />
              )}
            </div>
          </div>
          <div className="flex space-x-8 my-3">
            <span>
              <b>{currentProfile._count.pictures}</b> posts
            </span>
            <FollowersDialog
              isFollowers
              followers={currentProfile.receivedFollows}
            >
              <b>{currentProfile._count.receivedFollows}</b> followers
            </FollowersDialog>
            <FollowersDialog followers={currentProfile.initiatedFollows}>
              <b>{currentProfile._count.initiatedFollows}</b> followings
            </FollowersDialog>
          </div>
          <p className="text-gray-800 font-medium max-w-xl">
            {currentProfile.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
