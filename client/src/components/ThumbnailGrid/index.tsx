import { useGetPictureByAuthorQuery } from '@/__generated__/graphql';
import { useParams } from 'react-router-dom';
import ThumbnailGridItem from './ThumbnailGridItem';
import Loading from './loading';

function ThumbnailGrid() {
  const { profileId } = useParams();

  const { data, loading } = useGetPictureByAuthorQuery({
    variables: { authorId: Number(profileId) },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div className="grid w-full grid-cols-3 gap-1">
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
