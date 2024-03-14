import { Card, CardContent } from '@/components/ui/card.tsx';
import { Picture } from '@/generated/graphql.tsx';
import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx';
import PictureDetailsDialog from '@/components/PictureDetailsDialog';

type Props = {
  pictures: Picture[];
};
function PictureList({ pictures }: Props) {
  const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

  const handleClickPicture = (picture: Picture) => {
    setSelectedPicture(picture);
  };

  return (
    <>
      <CardContent className="grid w-full gap-4 md:gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        {pictures.map((picture) => (
          <Dialog key={picture.id}>
            <PictureDetailsDialog
              trigger={
                <DialogTrigger>
                  <Card
                    key={picture.id}
                    onClick={() => handleClickPicture(picture)}
                    className="h-full"
                  >
                    <img
                      alt="Photo"
                      className="aspect-video overflow-hidden rounded-lg object-contain"
                      height="300"
                      src={picture.fileUrl}
                      width="400"
                    />
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm md:text-base">
                        {picture.title}
                      </h3>
                      {picture.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {picture.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </DialogTrigger>
              }
              selectedPicture={selectedPicture!}
            />
          </Dialog>
        ))}
      </CardContent>
    </>
  );
}

export default PictureList;
