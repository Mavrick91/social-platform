import { PictureFragmentFragment } from '@/__generated__/graphql';
import PictureDetailsDialog from '@/components/PostDetailsDialog';
import { MessageCircle } from 'lucide-react';

type Props = {
  picture: PictureFragmentFragment;
};

export default function ThumbnailGridItem({ picture }: Props) {
  return (
    <>
      <PictureDetailsDialog picture={picture}>
        <button
          key={picture.id}
          className="group relative col-span-1 aspect-square"
        >
          <img
            alt={picture.altText}
            className="aspect-square overflow-hidden border border-slate-200 object-cover"
            src={picture.sizes.thumbnail}
            loading="lazy"
            width={300}
            height={300}
          />
          <div className="hidden z-20 text-white gap-3 absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center">
            <MessageCircle fill="white" size={32} />
            <span className="text-2xl">{picture._count?.comments}</span>
          </div>
        </button>
      </PictureDetailsDialog>
    </>
  );
}
