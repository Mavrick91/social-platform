import { useGetPictureByUsernameQuery } from '@/__generated__/graphql';
import ThumbnailGrid from '@/components/ThumbnailGrid';

export default function Explore() {
  const { data, loading } = useGetPictureByUsernameQuery();

  return (
    <div className="flex flex-col max-w-lg-page mx-auto">
      <div className="px-5 py-6">
        <ThumbnailGrid loading={loading} pictures={data?.picturesByUsername} />
      </div>
    </div>
  );
}
