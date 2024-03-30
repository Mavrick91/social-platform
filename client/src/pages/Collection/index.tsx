import { useGetCollectionQuery } from '@/__generated__/graphql';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { ArrowLeftCircleIcon } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Collection() {
  const user = useUserInfo();
  const { collectionName } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useGetCollectionQuery({
    variables: {
      collectionName: collectionName ?? '',
    },
  });

  if (error) {
    return navigate(`/${user.username}`);
  }

  return (
    <div className="flex flex-col max-w-lg-page mx-auto mt-6">
      <Link
        to={`/${user.username}`}
        className="flex items-center gap-2 text-sm text-gray-500 mb-4"
      >
        <ArrowLeftCircleIcon size={18} /> Back
      </Link>
      <h2 className="text-xl mb-3">{data?.getCollection.name}</h2>
      <div>
        <ThumbnailGrid
          pictures={data?.getCollection.pictures.map(
            (picture) => picture.picture
          )}
          loading={loading}
        />
      </div>
    </div>
  );
}
