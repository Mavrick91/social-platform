import ErrorAlert from '@/components/AlertError';
import PictureCommentList from '@/components/PictureDetailsDialog/PictureCommentList';
import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import { Picture } from '@/generated/graphql.tsx';
import moment from 'moment/moment';
import { ReactNode, useState } from 'react';
import { Separator } from '../ui/separator';

type Props = {
  trigger: ReactNode;
  selectedPicture: Picture;
};

function PictureDetailsDialog({ trigger, selectedPicture }: Props) {
  const [errorMutation, setErrorMutation] = useState<string | null>(null);

  return (
    <Dialog>
      {trigger}

      <DialogContent className="max-w-3xl p-0 rounded-md min-h-[600px]">
        {errorMutation && <ErrorAlert className="mb-4" error={errorMutation} />}

        <div className="flex">
          <div className="flex-1">
            <div className="flex items-center justify-center h-full">
              <img
                alt="Photo"
                className="overflow-hidden object-cover"
                height="500"
                src={selectedPicture?.fileUrl}
                width="600"
              />
            </div>
          </div>
          <div className="flex-1 flex border-l border-bg-border flex-col space-y-4">
            <div className="flex flex-col pt-3 pl-3">
              <span className="font-medium text-gray-700">
                {selectedPicture?.author.firstName}{' '}
                {selectedPicture?.author.lastName}
              </span>
              <span className="text-gray-500 text-xs">
                {moment(selectedPicture?.createdAt).format('MMMM Do YYYY')}
              </span>
              <p className="text-sm mt-4 text-gray-600">
                {selectedPicture?.description || 'No description provided.'}
              </p>
            </div>
            <Separator />

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
