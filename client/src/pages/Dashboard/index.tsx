import UploadPicture from '@/components/UploadPicture';
import { Button } from '@/components/ui/button.tsx';
import { CardDescription } from '@/components/ui/card.tsx';
import { DialogTrigger } from '@/components/ui/dialog.tsx';
import { GET_PICTURES } from '@/graphql/queries/picture';
import PictureEmpty from '@/pages/Dashboard/PictureEmpty';
import PictureList from '@/pages/Dashboard/PictureList';
import { useQuery } from '@apollo/client';
import { Plus } from 'lucide-react';

function Dashboard() {
  const { data, refetch, loading } = useQuery(GET_PICTURES, {
    fetchPolicy: 'network-only',
  });

  const trigger = (
    <DialogTrigger className="flex items-center w-full justify-between" asChild>
      <div>
        <h1 className="font-medium text-2xl">Photos</h1>
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
    <>
      <UploadPicture refetch={refetch} trigger={trigger} />
      {data.pictures && data.pictures.length !== 0 && (
        <CardDescription>Click on an image to view details</CardDescription>
      )}
      <div className="mt-4">
        {data.pictures && data.pictures.length !== 0 ? (
          <PictureList pictures={data.pictures} />
        ) : (
          <PictureEmpty />
        )}
      </div>
    </>
  );
}

export default Dashboard;
