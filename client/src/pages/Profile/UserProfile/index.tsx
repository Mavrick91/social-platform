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
        <div className="flex justify-center w-64 shrink-0 mx-auto">
          <UserAvatar avatar={currentProfile.avatar} size="size-[150px]" />
        </div>
        <section className="grow ml-12">
          <div className="flex items-center h-10">
            <h1 className="text-xl text-primary-text">
              <span>{currentProfile.username}</span>
            </h1>
            <div className="flex items-center space-x-2 ml-5">
              {user.id === currentProfile.id ? (
                <OwnProfile />
              ) : (
                <ButtonFollow
                  isFollowing={isFollowingCurrentProfile}
                  targetUserId={currentProfile.id}
                  buttonProps={{
                    variant: isFollowingCurrentProfile ? 'gray' : 'blue',
                    size: 'xs',
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex space-x-8 my-3 text-primary-text">
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
          <div className="text-sm text-primary-text">
            <span className="font-semibold">
              {currentProfile.firstName} {currentProfile.lastName}
            </span>
            {currentProfile.bio && (
              <p className="text-primary-text">{currentProfile.bio}</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
