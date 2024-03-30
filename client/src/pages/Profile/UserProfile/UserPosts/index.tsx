import { useGetPictureByUserQuery } from '@/__generated__/graphql';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import { useParams } from 'react-router-dom';

export default function UserPosts() {
  const { username } = useParams();

  const { data, loading } = useGetPictureByUserQuery({
    variables: { username },
    fetchPolicy: 'network-only',
  });

  return (
    <ThumbnailGrid pictures={data?.picturesByUsername} loading={loading} />
  );
}
