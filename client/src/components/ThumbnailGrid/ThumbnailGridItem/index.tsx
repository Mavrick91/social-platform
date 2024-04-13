import { useState, useEffect, memo } from 'react';
import { PictureFragmentFragment } from '@/__generated__/graphql';
import PictureDetailsDialog from '@/components/PostDetailsDialog';
import { MessageCircle } from 'lucide-react';

type Props = {
  picture: PictureFragmentFragment;
};

function ThumbnailGridItem({ picture }: Props) {
  const [selectedPicture, setSelectedPicture] =
    useState<PictureFragmentFragment | null>(null);

  useEffect(() => {
    if (selectedPicture) {
      setSelectedPicture(picture);
    }
  }, [picture, selectedPicture]);

  return (
    <>
      <button
        key={picture.id}
        className="group relative col-span-1 aspect-square bg-highlight-background"
        onClick={() => setSelectedPicture(picture)}
      >
        <img
          alt={picture.altText}
          className="w-full h-full overflow-hidden object-cover"
          src={picture.sizes.thumbnail}
          loading="lazy"
        />
        <div className="hidden z-20 text-white gap-3 absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center">
          <MessageCircle fill="white" size={32} />
          <span className="text-2xl">{picture._count?.comments}</span>
        </div>
      </button>

      {selectedPicture && (
        <PictureDetailsDialog
          picture={selectedPicture}
          onClose={() => setSelectedPicture(null)}
        />
      )}
    </>
  );
}

export default memo(ThumbnailGridItem);
