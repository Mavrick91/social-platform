import { PictureFragmentFragment } from '@/__generated__/graphql';
import { Pluralize } from '@/components/Pluralize';
import PostDetailsDialog from '@/components/PostDetailsDialog';
import { useState } from 'react';

type Props = {
  commentCount: number;
  picture: PictureFragmentFragment;
};

export default function PostComments({ commentCount, picture }: Props) {
  const [selectedPicture, setSelectedPicture] =
    useState<PictureFragmentFragment | null>(null);

  if (commentCount === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-2">
        <button
          className="text-secondary text-sm"
          type="button"
          onClick={() => setSelectedPicture(picture)}
        >
          View all <Pluralize count={commentCount} singular="comment" />
        </button>
      </div>

      {selectedPicture && (
        <PostDetailsDialog
          picture={selectedPicture}
          onClose={() => setSelectedPicture(null)}
        />
      )}
    </>
  );
}
