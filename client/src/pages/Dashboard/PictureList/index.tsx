import { Card, CardContent } from '@/components/ui/card.tsx';
import { Picture } from '@/generated/graphql.tsx';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import moment from 'moment';

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
            <DialogTrigger>
              <Card
                key={picture.id}
                onClick={() => handleClickPicture(picture)}
              >
                <img
                  alt="Photo"
                  className="aspect-video overflow-hidden rounded-lg object-contain"
                  height="300"
                  src={picture.data}
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Picture Details</DialogTitle>
                <DialogDescription>
                  Additional information about the selected picture.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <img
                  alt="Photo"
                  className="aspect-video overflow-hidden rounded-lg object-contain"
                  height="500"
                  src={selectedPicture?.data}
                  width="600"
                />
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-md">
                <h3 className="text-lg font-semibold">
                  {selectedPicture?.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedPicture?.description || 'No description provided.'}
                </p>
                <div className="flex justify-between text-sm mt-3">
                  <span className="text-gray-700">
                    Author: {selectedPicture?.author.firstName}{' '}
                    {selectedPicture?.author.lastName}
                  </span>
                  <span className="text-gray-500">
                    {moment(selectedPicture?.createdAt).format('MMMM Do YYYY')}
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </>
  );
}

export default PictureList;
