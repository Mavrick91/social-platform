import { useQuery } from '@apollo/client';
import { GET_PICTURE_BY_AUTHOR } from '@/graphql/querie/picture.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import PictureProfileItem from '@/pages/Profile/PictureProfileItem';
import PictureEmpty from '@/pages/Dashboard/PictureEmpty';
import { DialogTrigger } from '@/components/ui/dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ArrowLeft, Plus } from 'lucide-react';
import UploadPicture from '@/components/UploadPicture';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card.tsx';

function Profile() {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const { data, loading, refetch } = useQuery(GET_PICTURE_BY_AUTHOR, {
    variables: {
      authorId: userInfo.sub,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <UploadPicture
        refetch={refetch}
        trigger={
          <DialogTrigger
            className="flex items-center w-full justify-between"
            asChild
          >
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
        }
      />
      {data.picturesByAuthor && data.picturesByAuthor.length >= 1 ? (
        data.picturesByAuthor.map((picture: any) => (
          <PictureProfileItem
            picture={picture}
            key={picture.id}
            refetch={refetch}
          />
        ))
      ) : (
        <Card>
          <PictureEmpty />
        </Card>
      )}
    </div>
  );
}

export default Profile;
