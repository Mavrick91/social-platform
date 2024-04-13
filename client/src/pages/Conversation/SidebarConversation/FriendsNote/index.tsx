import BubbleThought from '@/components/BubbleThought';
import UserAvatar from '@/components/UserAvatar';
import EditThoughtDialog from '@/pages/Conversation/EditThoughtDialog';
import { useState } from 'react';

type Props = {
  thoughtContent?: string;
  thoughtVisibility?: 'FOLLOWERS' | 'CLOSE_FRIENDS';
  toggleUpdateNote: (value: boolean) => void;
  userAvatar?: string | null;
  showUpdateNote: () => void;
};
export function FriendsNote({
  thoughtContent,
  thoughtVisibility,
  toggleUpdateNote,
  userAvatar,
  showUpdateNote,
}: Props) {
  const [showEditThought, setShowEditThought] = useState(false);

  const handleClickThought = () => {
    if (thoughtContent) {
      setShowEditThought(true);
    } else toggleUpdateNote(true);
  };

  return (
    <div className="h-[140px] px-6 relative flex items-end">
      <button
        className="flex flex-col items-center relative"
        onClick={handleClickThought}
        data-testid="update-note-button"
      >
        {!showEditThought && (
          <BubbleThought
            size="small"
            bubbleText={thoughtContent}
            canEdit={false}
          />
        )}
        <UserAvatar avatar={userAvatar} size="size-[72px]" />
        <span className="text-secondary text-xs">Your note</span>
      </button>

      {showEditThought && (
        <EditThoughtDialog
          followersOnly={thoughtVisibility === 'FOLLOWERS'}
          onClose={() => setShowEditThought(false)}
          showUpdateNote={() => {
            showUpdateNote();
            setShowEditThought(false);
          }}
        />
      )}
    </div>
  );
}
