import { PictureFragmentFragment } from '@/__generated__/graphql';
import PictureDetailsDialog from '@/components/PostDetailsDialog';
import UploadPictureDialog from '@/components/UploadPictureDialog';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

type Props = {
  picture: PictureFragmentFragment;
};

export default function PostProfileItem({ picture }: Props) {
  const [selectedPicture, setSelectedPicture] =
    useState<PictureFragmentFragment | null>(null);
  const [editPictureDialogOpen, setEditPictureDialogOpen] = useState(false);

  const handleClickPicture = (picture: PictureFragmentFragment) => {
    setSelectedPicture(picture);
  };

  return (
    <>
      <PictureDetailsDialog picture={picture}>
        <button
          key={picture.id}
          onClick={() => handleClickPicture(picture)}
          className="h-full group relative col-span-1 aspect-square"
        >
          <img
            alt="Photo"
            className="aspect-square overflow-hidden border border-slate-200 object-cover"
            src={picture.fileUrl}
          />
          <div className="hidden z-20 text-white gap-3 absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center">
            <MessageCircle fill="white" size={32} />
            <span className="text-2xl">{picture._count?.comments}</span>
          </div>
        </button>
      </PictureDetailsDialog>

      {selectedPicture && (
        <UploadPictureDialog
          open={editPictureDialogOpen}
          setOpen={setEditPictureDialogOpen}
          defaultValues={{
            id: selectedPicture.id,
            fileUrl: selectedPicture.fileUrl,
            description: selectedPicture.description ?? '',
          }}
        />
      )}
    </>
  );
}
