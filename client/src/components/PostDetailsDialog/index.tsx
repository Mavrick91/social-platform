import { PictureFragmentFragment } from '@/__generated__/graphql';
import ErrorAlert from '@/components/AlertError';
import PictureCommentList from '@/components/PostDetailsDialog/PostCommentList';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { selectAuthenticatedUser } from '@/features/users/selectors';
import useAspectRatio from '@/hooks/useAspectRaiot';
import { useAppSelector } from '@/store/hooks';
import moment from 'moment/moment';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../UserAvatar';
import { Separator } from '../ui/separator';
import PostAction from './PostAction';
import { Ellipsis } from 'lucide-react';

type Props = {
  children: ReactNode;
  picture: PictureFragmentFragment;
};

function PostDetailsDialog({ children, picture }: Props) {
  const [errorMutation, setErrorMutation] = useState<string | null>(null);
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const [open, setOpen] = useState(false);

  const handleToggleDialog = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const aspectRatio = useAspectRatio(picture.fileUrl || '');

  if (!aspectRatio) return null;

  return (
    <Dialog open={open} onOpenChange={handleToggleDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="p-0 rounded-sm overflow-hidden border-none h-auto w-max flex-col"
        style={{
          maxHeight: 'calc(100vh - 40px)',
          maxWidth: 'calc(100% - 64px - 64px)',
        }}
      >
        {errorMutation && <ErrorAlert className="mb-4" error={errorMutation} />}
        <div className="flex">
          <div className="flex">
            <div className="items-center flex justify-center min-h-[500px]">
              <img
                alt="Photo"
                className="overflow-hidden w-full h-auto object-contain"
                src={picture?.fileUrl}
                style={{
                  maxWidth: `${aspectRatio.naturalWidth}px`,
                  maxHeight: `${aspectRatio.naturalHeight}px`,
                }}
              />
            </div>
            <div className="w-[405px] shrink-0 max-w-[405px] flex border-l border-bg-border flex-col">
              <div className="flex pt-3 pl-3 flex-col">
                <div className="flex gap-3">
                  <Link className="shrink-0" to={`/${picture?.user.username}`}>
                    <UserAvatar
                      avatar={picture?.user?.avatar}
                      className="size-9"
                      alt={`${picture?.user?.firstName} ${picture?.user?.lastName}`}
                    />
                  </Link>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center pr-10">
                      <Link
                        to={`/${picture?.user.username}`}
                        className="font-medium text-gray-700"
                      >
                        {picture?.user?.firstName} {picture?.user?.lastName}
                      </Link>
                      {picture?.id && userInfo.id === picture.user?.id && (
                        <PostAction
                          isDelete
                          pictureId={picture.id}
                          isEdit
                          handleOpenUpdatePictureDialog={handleToggleDialog}
                        >
                          <Ellipsis color="gray" />
                        </PostAction>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs">
                      {moment(picture?.createdAt).format('MMMM Do YYYY')}
                    </span>
                  </div>
                </div>
                <p className="text-sm mt-4 text-gray-600">
                  {picture?.description || 'No description provided.'}
                </p>
              </div>
              <Separator className="mt-4" />

              {picture && (
                <PictureCommentList
                  pictureId={picture.id}
                  setErrorMutation={setErrorMutation}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostDetailsDialog;
