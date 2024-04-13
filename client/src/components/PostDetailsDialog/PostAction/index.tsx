import { ReactNode, useState } from 'react';
import {
  PictureFragmentFragment,
  useUpdatePictureMutation,
} from '@/__generated__/graphql';
import UploadPostDialog from '@/components/UploadPostDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useDeletePicture } from '@/hooks/graphql/useDeletePicture';
import useUnFollow from '@/hooks/graphql/useUnFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';

type PostActionProps = {
  picture: PictureFragmentFragment;
  children: React.ReactNode;
};

const PostAction = ({ picture, children }: PostActionProps) => {
  const user = useUserInfo();
  const [deletePicture, { loading: isDeleting }] = useDeletePicture();
  const [updatePicture] = useUpdatePictureMutation();
  const [unfollow] = useUnFollow();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditPostDialogOpen, setIsEditPostDialogOpen] = useState(false);

  const handleUpdatePicture = async (
    field: 'hideLikesAndViewCounts' | 'disableComments'
  ) => {
    await updatePicture({
      variables: {
        id: picture.id,
        input: {
          [field]: !picture[field],
        },
      },
    });
    setIsDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setIsEditPostDialogOpen(false);
  };

  const getActionButtons = () => {
    const actionButtons = [];

    if (user.id === picture.user.id) {
      actionButtons.push(
        <ActionButton
          key="delete"
          label={
            isDeleting ? (
              <div className="flex justify-center items-center">
                Deleting...{' '}
                <LoadingSpinner className="ml-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              'Delete'
            )
          }
          onClick={async () => {
            await deletePicture({ variables: { id: picture.id } });
            handleCloseDialog();
          }}
          className="text-red-500 font-bold"
        />,
        <ActionButton
          key="edit"
          label="Edit"
          onClick={() => setIsEditPostDialogOpen(true)}
        />,
        <ActionButton
          key="toggle-like-count"
          label={
            picture.hideLikesAndViewCounts
              ? 'Unhide like count to others'
              : 'Hide like count to others'
          }
          onClick={() => handleUpdatePicture('hideLikesAndViewCounts')}
        />,
        <ActionButton
          key="toggle-comments"
          label={
            picture.disableComments
              ? 'Turn on commenting'
              : 'Turn off commenting'
          }
          onClick={() => handleUpdatePicture('disableComments')}
        />
      );
    } else {
      actionButtons.push(
        <ActionButton
          key="unfollow"
          label="Unfollow"
          onClick={async () => {
            await unfollow({
              variables: {
                input: { userId: user.id, followingId: picture.user.id },
              },
            });
            handleCloseDialog();
          }}
          className="text-red-500 font-bold"
        />
      );
    }

    actionButtons.push(
      <ActionButton key="cancel" label="Cancel" onClick={handleCloseDialog} />
    );

    return actionButtons;
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button>{children}</button>
        </DialogTrigger>

        <DialogContent className="p-0 gap-0 rounded-lg max-w-sm">
          {getActionButtons().map((button, index) => (
            <div key={index}>
              {button}
              {index !== getActionButtons().length - 1 && (
                <Separator elevated />
              )}
            </div>
          ))}
        </DialogContent>
      </Dialog>

      {isEditPostDialogOpen && (
        <UploadPostDialog
          onClose={handleCloseDialog}
          picture={picture}
          title="Edit info"
          buttonSubmitText="Done"
          backButton={<span>Cancel</span>}
        />
      )}
    </>
  );
};

type ActionButtonProps = {
  label: string | ReactNode;
  onClick: () => void;
  className?: string;
};

const ActionButton = ({ label, onClick, className }: ActionButtonProps) => (
  <button
    type="button"
    className={`text-center w-full py-3.5 text-sm ${className || ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default PostAction;
