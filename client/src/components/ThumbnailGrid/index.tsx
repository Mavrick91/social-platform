import { useGetPictureByUserQuery } from '@/__generated__/graphql';
import { useParams } from 'react-router-dom';
import ThumbnailGridItem from './ThumbnailGridItem';
import Loading from './loading';

function ThumbnailGrid() {
  const { username } = useParams();

  const { data, loading } = useGetPictureByUserQuery({
    variables: { username },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div className="grid w-full grid-cols-3 gap-1">
        {data && !loading
          ? data.picturesByUsername.map((picture) => (
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
