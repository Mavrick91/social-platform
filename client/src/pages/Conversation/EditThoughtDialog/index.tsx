import BubbleThought from '@/components/BubbleThought';
import UserAvatar from '@/components/UserAvatar';
import { Button } from '@/components/ui/button';
import useDeleteThought from '@/hooks/graphql/useDeleteThought';
import useClickOutside from '@/hooks/useOnClickOutside';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { useRef } from 'react';

type Props = {
  onClose: () => void;
  showUpdateNote: () => void;
  followersOnly: boolean;
};

export default function EditThoughtDialog({
  onClose,
  showUpdateNote,
  followersOnly,
}: Props) {
  const user = useUserInfo();
  const containerRef = useRef(null);
  const [deleteThought] = useDeleteThought();

  useClickOutside(containerRef, () => {
    onClose();
  });

  const handleClickDelete = async () => {
    await deleteThought({
      variables: {
        id: user.thought!.id,
      },
    });
    onClose();
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-24 left-52 z-50 rounded-2xl bg-white w-80"
      style={{
        boxShadow: '0 4px 12px rgba(0,0,0,.15)',
      }}
    >
      <div className="flex-col flex">
        <div className="py-8 flex flex-col justify-center items-center">
          <div className="relative">
            <BubbleThought
              size="medium"
              bubbleText={user.thought?.content}
              canEdit={false}
            />
            <UserAvatar avatar={user.avatar} className="size-40" />
          </div>
          <div className="text-xl text-center">
            {user.firstName} {user.lastName}
          </div>
        </div>

        <div className="mt-0 m-3">
          <div className="text-xs text-center text-secondary mb-1">
            {followersOnly
              ? 'Shared with followers that you follow back'
              : 'Shared with Close friends'}
          </div>
          <Button
            className="w-full font-semibold"
            size="xs"
            onClick={showUpdateNote}
          >
            Leave a new note
          </Button>
          <Button
            className="w-full mt-2"
            size="sm"
            variant="ghost"
            onClick={handleClickDelete}
          >
            Delete note
          </Button>
        </div>
      </div>
    </div>
  );
}
