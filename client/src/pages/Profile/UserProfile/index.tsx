import UploadPicture from '@/components/UploadPictureDialog';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { selectAuthenticatedUser } from '@/features/users/selectors';
import { UPDATE_USER_PROFILE } from '@/graphql/mutations/user';
import { GET_USER_PROFILE } from '@/graphql/queries/user';
import { useAppSelector } from '@/store/hooks';
import { useMutation, useQuery } from '@apollo/client';
import { Plus, SettingsIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  userId: number;
};

function UserProfile({ userId }: Props) {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
  });

  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

  useEffect(() => {
    if (error) {
      navigate(`/profile/${userInfo.sub}`);
    }
  }, [error, navigate, userInfo.sub]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      await updateUserProfile({
        variables: {
          userId: data?.user.id,
          ...updatedData,
        },
      });
      // Optionally refetch the user profile data after updating
    } catch (error) {
      console.error('Failed to update user profile:', error);
    }
  };

  const trigger = (
    <DialogTrigger asChild>
      <Button className="gap-2 flex items-center w-full">
        <Plus />
        Upload
      </Button>
    </DialogTrigger>
  );

  if (loading || !data) {
    return null;
  }

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
              {data.user.firstName} {data.user.lastName}
            </h1>
            <div className="flex items-center space-x-2">
              <Button>Edit Profile</Button>
              <UploadPicture trigger={trigger} />
              <SettingsIcon className="text-gray-600 shrink-0" />
            </div>
          </div>
          <div className="flex space-x-8 my-3">
            <span>{data.user._count?.pictures} posts</span>
            <span>0 followers</span>
            <span>0 following</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
