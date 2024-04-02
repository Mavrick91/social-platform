import { ReactNode, useState } from 'react';
import { PictureFragmentFragment } from '@/__generated__/graphql';
import UploadPostDialog from '@/components/UploadPostDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useDeletePicture } from '@/hooks/graphql/useDeletePicture';
import useUnFollow from '@/hooks/graphql/useUnFollow';
import { useUpdatePicture } from '@/hooks/graphql/useUpdatePicture';
import { useUserInfo } from '@/providers/UserInfoProvider';

type PostActionProps = {
  picture: PictureFragmentFragment;
  children: React.ReactNode;
};

const PostAction = ({ picture, children }: PostActionProps) => {
  const user = useUserInfo();
  const [deletePicture, { loading: isDeleting }] = useDeletePicture();
  const [updatePicture] = useUpdatePicture();
  const [unfollow] = useUnFollow();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditPostDialogOpen, setIsEditPostDialogOpen] = useState(false);

  const handleDeletePicture = async () => {
    await deletePicture({ variables: { id: picture.id } });
    setIsDialogOpen(false);
  };

  const handleUnfollow = async () => {
    await unfollow({
      variables: {
        input: { userId: user.id, followingId: picture.user.id },
      },
    });
    setIsDialogOpen(false);
  };

  const handleToggleLikeCount = async () => {
    await updatePicture({
      variables: {
        id: picture.id,
        input: {
          hideLikesAndViewCounts: !picture.hideLikesAndViewCounts,
        },
      },
    });
    setIsDialogOpen(false);
  };

  const handleToggleComments = async () => {
    await updatePicture({
      variables: {
        id: picture.id,
        input: {
          disableComments: !picture.disableComments,
        },
      },
    });
    setIsDialogOpen(false);
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
          onClick={handleDeletePicture}
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
          onClick={handleToggleLikeCount}
        />,
        <ActionButton
          key="toggle-comments"
          label={
            picture.disableComments
              ? 'Turn on commenting'
              : 'Turn off commenting'
          }
          onClick={handleToggleComments}
        />
      );
    } else {
      actionButtons.push(
        <ActionButton
          key="unfollow"
          label="Unfollow"
          onClick={handleUnfollow}
          className="text-red-500 font-bold"
        />
      );
    }

    actionButtons.push(
      <ActionButton
        key="cancel"
        label="Cancel"
        onClick={() => setIsDialogOpen(false)}
      />
    );

    return actionButtons;
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button>{children}</button>
        </DialogTrigger>

        <DialogContent
          className="p-0 gap-0 rounded-lg max-w-sm"
          showClose={false}
        >
          {getActionButtons().map((button, index) => (
            <div key={index}>
              {button}
              {index !== getActionButtons().length - 1 && <Separator />}
            </div>
          ))}
        </DialogContent>
      </Dialog>

      {isEditPostDialogOpen && (
        <UploadPostDialog
          onClose={() => setIsEditPostDialogOpen(false)}
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
