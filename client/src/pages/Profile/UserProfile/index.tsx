import { UserProfileFragment } from '@/__generated__/graphql';
import FollowersDialog from '@/components/FollowersDialog';
import { Pluralize } from '@/components/Pluralize';
import UserAvatar from '@/components/UserAvatar';
import { useUserInfo } from '@/providers/UserInfoProvider';
import ButtonFollow from './ButtonFollow';
import OwnProfile from './OwnProfile';

type Props = {
  currentProfile: UserProfileFragment;
};

function UserProfile({ currentProfile }: Props) {
  const user = useUserInfo();

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
                  targetUserId={currentProfile.id}
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
