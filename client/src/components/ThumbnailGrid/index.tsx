import { useGetPictureByAuthorQuery } from '@/__generated__/graphql';
import ThumbnailGridItem from './ThumbnailGridItem';
import Loading from './loading';

type Props = {
  profileId?: number;
};
function ThumbnailGrid({ profileId }: Props) {
  const { data, loading } = useGetPictureByAuthorQuery({
    variables: { authorId: profileId },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div className="grid w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {data && !loading
          ? data.picturesByAuthor.map((picture) => (
              <ThumbnailGridItem picture={picture} key={picture.id} />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <Loading key={index} />
            ))}
      </div>
    </>
  );
}

export default ThumbnailGrid;
