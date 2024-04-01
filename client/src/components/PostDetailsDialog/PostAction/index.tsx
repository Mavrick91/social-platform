import { PictureFragmentFragment } from '@/__generated__/graphql';
import UploadPostDialog from '@/components/UploadPostDialog';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useDeletePicture } from '@/hooks/graphql/useDeletePicture';
import useUnFollow from '@/hooks/graphql/useUnFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Fragment, useMemo, useState } from 'react';

type CommonProps = {
  children: React.ReactNode;
  picture: PictureFragmentFragment;
  isDelete?: boolean;
  isEdit?: boolean;
  isUnfollow?: boolean;
};

type Editable = {
  isEdit: true;
};

type Unfollowable = {
  isUnfollow: true;
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
  picture,
  isUnfollow,
  isEdit,
  isDelete,
}: Props) => {
  const user = useUserInfo();

  const [deletePicture, { loading }] = useDeletePicture();
  const [unfollow] = useUnFollow();

  const [isOpen, setIsOpen] = useState(false);
  const [openEditPostDialog, setOpenEditPostDialog] = useState(false);

  const handleAction = async (actionType: string) => {
    try {
      if (actionType === 'delete') {
        await deletePicture({ variables: { id: picture.id } });
      } else if (actionType === 'unfollow') {
        await unfollow({
          variables: {
            input: { userId: user.id, followingId: picture.user.id },
          },
        });
      } else if (actionType === 'edit') {
        setOpenEditPostDialog(true);
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
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button>{children}</button>
        </DialogTrigger>
        <DialogContent
          className="p-0 gap-0 rounded-lg max-w-sm"
          showClose={false}
        >
          {actions
            .filter((action) => action.isActive)
            .map((action, index) => (
              <Fragment key={index}>
                <button
                  type="button"
                  className={`text-center py-3.5 text-sm ${action.className || ''}`}
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

      {openEditPostDialog && (
        <UploadPostDialog
          onClose={() => setOpenEditPostDialog(false)}
          picture={picture}
          title="Edit info"
          buttonSubmitText="Done"
          backButton={<span>Cancel</span>}
        />
      )}
    </>
  );
};

export default PostAction;
