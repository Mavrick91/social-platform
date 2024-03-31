import { PictureFragmentFragment } from '@/__generated__/graphql';
import ThumbnailGridItem from './ThumbnailGridItem';
import Loading from './loading';

type ThumbnailGridProps = {
  pictures?: PictureFragmentFragment[];
  loading?: boolean;
};

function ThumbnailGrid({ pictures, loading }: ThumbnailGridProps) {
  if (loading) {
    return Array.from({ length: 4 }).map((_, index) => <Loading key={index} />);
  }

  return (
    <div className="grid w-full grid-cols-3 gap-1">
      {pictures &&
        pictures.map((picture) => (
          <ThumbnailGridItem picture={picture} key={picture.id} />
        ))}
    </div>
  );
}

export default ThumbnailGrid;
