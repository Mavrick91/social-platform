import { useQuery } from '@apollo/client';
import { GET_PICTURE_BY_AUTHOR } from '@/graphql/querie/picture.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ArrowLeft, Plus } from 'lucide-react';
import UploadPicture from '@/components/UploadPicture';
import { Link } from 'react-router-dom';
import ProfilePics from '@/pages/Profile/ProfilePicture';

function Profile() {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const { data, loading, refetch } = useQuery(GET_PICTURE_BY_AUTHOR, {
    variables: {
      authorId: userInfo.sub,
    },
    fetchPolicy: 'network-only',
  });

  const trigger = (
    <DialogTrigger className="flex items-center w-full justify-between" asChild>
      <div>
        <Link to="/dashboard">
          <ArrowLeft />
        </Link>
        <Button className="gap-2">
          <Plus />
          Upload
        </Button>
      </div>
    </DialogTrigger>
  );

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <UploadPicture refetch={refetch} trigger={trigger} />
      <ProfilePics pictures={data.picturesByAuthor} refetchPictures={refetch} />
    </div>
  );
}

export default Profile;
