import { PictureFragmentFragment } from '@/__generated__/graphql';
import ErrorAlert from '@/components/AlertError';
import PictureCommentList from '@/components/PostDetailsDialog/PostCommentList';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import useAspectRatio from '@/hooks/useAspectRaiot';
import { cn } from '@/lib/utils';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Ellipsis } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import UserAvatar from '../UserAvatar';
import { Separator } from '../ui/separator';
import PostAction from './PostAction';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

type Props = {
  children: ReactNode;
  picture: PictureFragmentFragment;
};

function PostDetailsDialog({ children, picture }: Props) {
  const [errorMutation, setErrorMutation] = useState<string | null>(null);
  const user = useUserInfo();
  const [open, setOpen] = useState(false);

  const handleToggleDialog = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const aspectRatio = useAspectRatio(picture.sizes.original);

  const isFollowingCurrentProfile = user.initiatedFollows.some(
    (follow) => follow.targetUserId === picture.user.id
  );

  if (!aspectRatio) return null;

  return (
    <Dialog open={open} onOpenChange={handleToggleDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        showClose={false}
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
              <ImageWithPlaceholder picture={picture} />
            </div>
            <div className="w-[405px] shrink-0 max-w-[405px] flex border-l border-separator-post flex-col">
              <div className="flex pt-3 pl-3 flex-col">
                <div className="flex items-center">
                  <Link className="shrink-0" to={`/${picture?.user.username}`}>
                    <UserAvatar
                      avatar={picture?.user?.avatar}
                      className="size-8"
                      alt={`${picture?.user?.firstName} ${picture?.user?.lastName}`}
                    />
                  </Link>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center pr-5">
                      <div>
                        <Link
                          to={`/${picture?.user.username}`}
                          className="text-secondary-button text-sm font-semibold ml-4"
                        >
                          {picture?.user?.firstName} {picture?.user?.lastName}
                        </Link>
                        {user.id !== picture.user?.id && (
                          <>
                            {' '}
                            •{' '}
                            <ButtonFollow
                              isFollowing={isFollowingCurrentProfile}
                              targetUserId={picture.user.id}
                              buttonProps={{
                                variant: 'link',
                              }}
                            />
                          </>
                        )}
                      </div>
                      {picture?.id && user.id === picture.user?.id && (
                        <PostAction isDelete picture={picture} isEdit>
                          <Ellipsis color="gray" />
                        </PostAction>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="mt-4" isPost />

              {picture && (
                <PictureCommentList
                  picture={picture}
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
