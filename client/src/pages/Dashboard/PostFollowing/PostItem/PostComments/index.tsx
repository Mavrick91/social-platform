import { PictureFragmentFragment } from '@/__generated__/graphql';
import { Pluralize } from '@/components/Pluralize';
import PictureDetailsDialog from '@/components/PostDetailsDialog';
import { pluralize } from '@/lib/utils';

type Props = {
  commentCount: number;
  picture: PictureFragmentFragment;
};

export default function PostComments({ commentCount, picture }: Props) {
  if (commentCount === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <PictureDetailsDialog picture={picture}>
        <button className="text-zinc-500 text-sm">
          View all <Pluralize count={commentCount} singular="comment" />
        </button>
      </PictureDetailsDialog>
    </div>
  );
}
