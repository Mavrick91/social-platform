import {
  UserProfileFragment,
  useGetUserProfileQuery,
} from '@/__generated__/graphql';
import { selectAuthenticatedUser } from '@/features/users/selectors';
import { useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OtherProfile from './OtherProfile';
import OwnProfile from './OwnProfile';

type Props = {
  userId: number;
};

function UserProfile({ userId }: Props) {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const navigate = useNavigate();
  const { data, loading, error } = useGetUserProfileQuery({
    variables: { userId },
  });
  // const [updateUserProfile] = useUpdateUserProfileMutation;

  console.log('🚀 ~ data:', data?.user._count);
  useEffect(() => {
    if (error) {
      navigate(`/profile/${userInfo.sub}`);
    }
  }, [error, navigate, userInfo.sub]);

  // const handleUpdateProfile = async (updatedData) => {
  //   try {
  //     await updateUserProfile({
  //       variables: {
  //         userId: data?.user.id,
  //         ...updatedData,
  //       },
  //     });
  //     // Optionally refetch the user profile data after updating
  //   } catch (error) {
  //     console.error('Failed to update user profile:', error);
  //   }
  // };

  if (loading || !data) {
    return null;
  }

  const user = data.user as UserProfileFragment;

  return (
    <div>
      <div className="flex items-center space-x-6">
        {/* <Avatar>
          <AvatarImage
            alt="Profile picture"
            src="/placeholder.svg?height=128&width=128"
          />
        </Avatar> */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex items-center space-x-2">
              {userInfo.sub === user.id ? (
                <OwnProfile />
              ) : (
                <OtherProfile followings={user.following} userId={userId} />
              )}
            </div>
          </div>
          <div className="flex space-x-8 my-3">
            <span>{user._count.pictures} posts</span>
            <span>{user._count.following} followers</span>
            <span>{user._count.followedBy} following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
