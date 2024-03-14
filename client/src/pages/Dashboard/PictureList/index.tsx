import PictureDetailsDialog from '@/components/PictureDetailsDialog';
import { CardContent } from '@/components/ui/card.tsx';
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import { Picture } from '@/generated/graphql.tsx';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

type Props = {
  pictures: Picture[];
};
function PictureList({ pictures }: Props) {
  // console.log('🚀 ~ pictures:', pictures);
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

  const handleClickPicture = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  return (
    <>
      <div className="grid w-full sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-1">
        {pictures.map((picture) => (
          <Dialog key={picture.id}>
            <PictureDetailsDialog
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
                      <MessageCircle color="white" size={32} />
                      <span className="text-2xl">
                        {picture.comments?.length}
                      </span>
                    </div>
                  </button>
                </DialogTrigger>
              }
              selectedPicture={selectedPicture!}
            />
          </Dialog>
        ))}
      </div>
    </>
  );
}

export default PictureList;
