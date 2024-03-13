import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { GET_PICTURES } from '@/graphql/querie/picture.ts';
import PictureList from '@/pages/Dashboard/PictureList';
import PictureEmpty from '@/pages/Dashboard/PictureEmpty';
import UploadPicture from '@/components/UploadPicture';
import { useQuery } from '@apollo/client';

function Dashboard() {
  const { data, refetch, loading } = useQuery(GET_PICTURES);

  if (loading) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <UploadPicture refetch={refetch} />
          </CardTitle>
          {data.pictures && data.pictures.length !== 0 && (
            <CardDescription>Click on an image to view details</CardDescription>
          )}
        </CardHeader>
        {data.pictures && data.pictures.length !== 0 ? (
          <PictureList pictures={data.pictures} />
        ) : (
          <PictureEmpty />
        )}
      </Card>
    </>
  );
}

export default Dashboard;
