import ErrorAlert from '@/components/AlertError';
import PictureCommentList from '@/components/PictureDetailsDialog/PictureCommentList';
import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import moment from 'moment/moment';
import { ReactNode, useState } from 'react';
import { Separator } from '../ui/separator';
import { Picture } from '@/__generated__/graphql';
import PictureAction from './PictureAction';
import { useAppSelector } from '@/store/hooks';
import { selectAuthenticatedUser } from '@/features/users/selectors';

type Props = {
  trigger: ReactNode;
  selectedPicture: null | Picture;
  handleOpenUpdatePictureDialog: (isOpen: boolean) => void;
};

function PictureDetailsDialog({
  trigger,
  selectedPicture,
  handleOpenUpdatePictureDialog,
}: Props) {
  const [errorMutation, setErrorMutation] = useState<string | null>(null);
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const [open, setOpen] = useState(false);

  const handleToggleDialog = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleToggleDialog}>
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
              <div className="flex justify-between items-center pr-10">
                <span className="font-medium text-gray-700">
                  {selectedPicture?.author?.firstName}{' '}
                  {selectedPicture?.author?.lastName}
                </span>
                {selectedPicture?.id &&
                  userInfo.sub === selectedPicture.author?.id && (
                    <PictureAction
                      handleToggleDialog={handleToggleDialog}
                      pictureId={selectedPicture.id}
                      handleOpenUpdatePictureDialog={
                        handleOpenUpdatePictureDialog
                      }
                    />
                  )}
              </div>
              <span className="text-gray-500 text-xs">
                {moment(selectedPicture?.createdAt).format('MMMM Do YYYY')}
              </span>
              <p className="text-sm mt-4 text-gray-600">
                {selectedPicture?.description || 'No description provided.'}
              </p>
            </div>
            <Separator />

            {selectedPicture && (
              <PictureCommentList
                pictureId={selectedPicture.id}
                setErrorMutation={setErrorMutation}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PictureDetailsDialog;
