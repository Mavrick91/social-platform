import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useDeletePicture } from '@/hooks/graphql/useDeletePicture';
import useUnFollow from '@/hooks/graphql/useUnFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Fragment, useMemo, useState } from 'react';

type CommonProps = {
  children: React.ReactNode;
  pictureId?: number;
  isDelete?: boolean;
  isEdit?: boolean;
  handleOpenUpdatePictureDialog?: (isOpen: boolean) => void;
  isUnfollow?: boolean;
  profileId?: number;
};

type Editable = {
  isEdit: true;
  handleOpenUpdatePictureDialog?: (isOpen: boolean) => void;
};

type Unfollowable = {
  isUnfollow: true;
  profileId: number;
};

type EditProps = CommonProps & Editable;
type UnfollowProps = CommonProps & Unfollowable;

type BaseProps = CommonProps & {
  isEdit?: false;
  isUnfollow?: false;
};

type EditAndUnfollowProps = CommonProps & Editable & Unfollowable;

type Props = BaseProps | EditProps | UnfollowProps | EditAndUnfollowProps;

const PostAction = ({
  children,
  pictureId,
  isUnfollow,
  isEdit,
  isDelete,
  profileId,
  handleOpenUpdatePictureDialog,
}: Props) => {
  const { user } = useUserInfo();

  const [deletePicture, { loading }] = useDeletePicture();
  const [unfollow] = useUnFollow();

  const [isOpen, setIsOpen] = useState(false);

  const handleAction = async (actionType: string) => {
    try {
      if (actionType === 'delete') {
        if (!pictureId) throw new Error('Picture ID is required');
        await deletePicture({ variables: { id: pictureId } });
      } else if (actionType === 'unfollow') {
        if (!profileId) throw new Error('Profile ID is required');
        await unfollow({
          variables: { input: { userId: user.id, followingId: profileId } },
        });
      } else if (actionType === 'edit') {
        if (!handleOpenUpdatePictureDialog)
          throw new Error('Handler is required');
        handleOpenUpdatePictureDialog(true);
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const actions = useMemo(
    () => [
      {
        type: 'unfollow',
        label: 'Unfollow',
        isActive: isUnfollow,
        className: 'text-red-500 font-bold',
      },
      { type: 'edit', label: 'Edit', isActive: isEdit },
      {
        type: 'delete',
        label: 'Delete',
        isActive: isDelete,
        className: 'text-red-500 font-bold',
      },
      { type: 'cancel', label: 'Cancel', isActive: true },
    ],
    [isUnfollow, isEdit, isDelete]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>{children}</button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0" showClose={false}>
        {actions
          .filter((action) => action.isActive)
          .map((action, index) => (
            <Fragment key={index}>
              <button
                type="button"
                className={`text-center py-4 text-sm ${action.className || ''}`}
                onClick={() => handleAction(action.type)}
              >
                <div className="flex justify-center items-center">
                  {action.label}
                  {loading && action.type === 'delete' && (
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
};

export default PostAction;
