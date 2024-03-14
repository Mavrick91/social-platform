import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import moment from 'moment/moment';
import { Picture } from '@/generated/graphql.tsx';
import { ReactNode, useState } from 'react';
import PictureCommentList from '@/components/PictureDetailsDialog/PictureCommentList';
import ErrorAlert from '@/components/AlertError';

type Props = {
  trigger: ReactNode;
  selectedPicture: Picture;
};

function PictureDetailsDialog({ trigger, selectedPicture }: Props) {
  const [errorMutation, setErrorMutation] = useState<string | null>(null);

  return (
    <Dialog>
      {trigger}

      <DialogContent className="max-w-3xl max-h-[600px]">
        {errorMutation && <ErrorAlert className="mb-4" error={errorMutation} />}

        <DialogHeader>
          <DialogTitle>Picture Details</DialogTitle>
          <DialogDescription>
            Additional information about the selected picture.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <div className="flex-1">
            <div className="mt-4">
              <img
                alt="Photo"
                className="aspect-video overflow-hidden rounded-lg object-contain"
                height="500"
                src={selectedPicture?.data}
                width="600"
              />
            </div>
            <div className="px-4 mt-4 py-2 bg-gray-100 rounded-md">
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
          </div>
          <div className="flex-1 space-y-4">
            <PictureCommentList
              pictureId={selectedPicture?.id}
              setErrorMutation={setErrorMutation}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PictureDetailsDialog;
