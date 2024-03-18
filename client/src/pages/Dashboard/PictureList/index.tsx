import { Picture, useGetPictureByAuthorQuery } from '@/__generated__/graphql';
import PictureDetailsDialog from '@/components/PictureDetailsDialog';
import UploadPictureDialog from '@/components/UploadPictureDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import Loading from './loading';

type Props = {
  userId?: number;
};
function PictureList({ userId }: Props) {
  const { data, loading } = useGetPictureByAuthorQuery({
    variables: { authorId: userId },
  });

  const [editPictureDialogOpen, setEditPictureDialogOpen] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

  const handleClickPicture = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  console.log('🚀 ~ data:', data?.picturesByAuthor);
  return (
    <>
      <div className="grid w-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1 mt-4">
        {data && !loading
          ? data.picturesByAuthor.map((picture) => (
              <Dialog key={picture.id}>
                <PictureDetailsDialog
                  handleOpenUpdatePictureDialog={setEditPictureDialogOpen}
                  trigger={
                    <DialogTrigger
                      asChild
                      className="col-span-1 lg:col-span-2 aspect-square"
                    >
                      <button
                        key={picture.id}
                        onClick={() => handleClickPicture(picture)}
                        className="h-full group relative"
                      >
                        <img
                          alt="Photo"
                          className="aspect-square overflow-hidden border border-slate-200 object-cover"
                          src={picture.fileUrl}
                        />
                        <div className="hidden z-20 text-white gap-3 absolute inset-0 bg-black bg-opacity-50 group-hover:flex items-center justify-center">
                          <MessageCircle fill="white" size={32} />
                          <span className="text-2xl">
                            {picture._count?.comments}
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>
                  }
                  selectedPicture={selectedPicture!}
                />
              </Dialog>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <Loading key={index} />
            ))}
      </div>

      {selectedPicture && (
        <UploadPictureDialog
          open={editPictureDialogOpen}
          setOpen={setEditPictureDialogOpen}
          defaultValues={{
            id: selectedPicture.id,
            fileUrl: selectedPicture.fileUrl,
            description: selectedPicture.description,
          }}
        />
      )}
    </>
  );
}

export default PictureList;
