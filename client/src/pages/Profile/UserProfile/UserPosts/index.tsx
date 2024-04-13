import { useGetPictureByUsernameQuery } from '@/__generated__/graphql';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import { useParams } from 'react-router-dom';

export default function UserPosts() {
  const { username } = useParams();

  const { data, loading } = useGetPictureByUsernameQuery({
    variables: { username },
  });

  return (
    <ThumbnailGrid pictures={data?.picturesByUsername} loading={loading} />
  );
}
