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
import { Pluralize } from '@/components/Pluralize';

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
    <div className="mb-11">
      <div className="flex">
        <div className="w-48 mr-8">
          <UserAvatar
            alt="Profile picture"
            avatar={currentProfile.avatar}
            className="size-[150px]"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center h-10">
            <h1 className="text-xl">
              <span>{currentProfile.username}</span>
            </h1>
            <div className="flex items-center space-x-2 ml-5">
              {user.id === currentProfile.id ? (
                <OwnProfile />
              ) : (
                <ButtonFollow
                  isFollowing={isFollowingCurrentProfile}
                  targetUserId={profileId}
                  className="bg-blue-500 hover:bg-blue-600"
                />
              )}
            </div>
          </div>
          <div className="flex space-x-8 my-3">
            <span>
              <Pluralize
                count={currentProfile._count.pictures}
                singular="post"
                bold
              />
            </span>
            <FollowersDialog
              isFollowers
              followers={currentProfile.receivedFollows}
            >
              <Pluralize
                count={currentProfile._count.receivedFollows}
                singular="follower"
                bold
              />
            </FollowersDialog>
            <FollowersDialog followers={currentProfile.initiatedFollows}>
              <Pluralize
                count={currentProfile._count.initiatedFollows}
                singular="following"
                bold
              />
            </FollowersDialog>
          </div>
          <div className="text-sm">
            <span className="font-semibold">
              {currentProfile.firstName} {currentProfile.lastName}
            </span>
            {currentProfile.bio && (
              <p className="text-gray-800 max-w-xl">{currentProfile.bio}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
