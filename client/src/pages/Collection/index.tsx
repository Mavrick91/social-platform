import { useGetCollectionQuery } from '@/__generated__/graphql';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { ChevronLeft, Ellipsis } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CollectionAction from './CollectionAction';

export default function Collection() {
  const user = useUserInfo();
  const { collectionName } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useGetCollectionQuery({
    variables: {
      collectionName: collectionName ?? '',
    },
  });

  if (error || !data) {
    navigate(`/${user.username}/saved`);
    return null;
  }

  const currentPictures = data.getCollection.pictures.map(
    (picture) => picture.picture
  );

  return (
    <div className="flex flex-col max-w-lg-page mx-auto mt-6">
      <Link
        to={`/${user.username}/saved`}
        className="flex items-center gap-2 text-sm font-semibold text-secondary mb-4"
      >
        <ChevronLeft size={28} strokeWidth={1.25} />{' '}
        <span className="-ml-2">Saved</span>
      </Link>
      <div className="flex justify-between items-center">
        <h2 className="text-xl mb-3">{data.getCollection.name}</h2>
        {!data.getCollection.isDefault && (
          <CollectionAction
            collectionId={Number(data.getCollection.id)}
            collectionName={data.getCollection.name}
          >
            <Ellipsis />
          </CollectionAction>
        )}
      </div>
      <div>
        <ThumbnailGrid pictures={currentPictures} loading={loading} />
      </div>
    </div>
  );
}
