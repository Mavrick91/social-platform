import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useDeletePicture } from '@/hooks/useDeletePicture';
import { cn } from '@/lib/utils';
import { Ellipsis } from 'lucide-react';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  handleToggleDialog: (isOpen: boolean) => void;
  pictureId: number;
  handleOpenUpdatePictureDialog: (isOpen: boolean) => void;
};

export default function PictureAction({
  handleToggleDialog,
  pictureId,
  handleOpenUpdatePictureDialog,
}: Props) {
  const [deletePicture, { loading }] = useDeletePicture();

  const handleDeletePicture = async () => {
    try {
      await deletePicture({ variables: { id: pictureId } });
      handleToggleDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPicture = () => {
    handleOpenUpdatePictureDialog(true);
    handleToggleDialog(false);
  };

  const actions = [
    {
      label: 'Edit',
      onClick: () => handleEditPicture(),
    },
    {
      label: 'Delete',
      onClick: () => handleDeletePicture(),
      className: 'text-red-500',
      isLoading: loading,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger>
        <Ellipsis color="gray" />
      </DialogTrigger>

      <DialogContent className="p-0 gap-0">
        {actions.map((action, index) => (
          <Fragment key={index}>
            <button
              className={cn('text-center py-4', action.className)}
              onClick={action.onClick}
            >
              <div className="flex justify-center items-center">
                {action.label}
                {action.isLoading && (
                  <LoadingSpinner className="ml-2 h-4 w-4 animate-spin" />
                )}
              </div>
            </button>
            <Separator className="last:hidden" />
          </Fragment>
        ))}
      </DialogContent>
    </Dialog>
  );
}
