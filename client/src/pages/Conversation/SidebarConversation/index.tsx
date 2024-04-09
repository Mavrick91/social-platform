import BubbleThought from '@/components/BubbleThought';
import UserAvatar from '@/components/UserAvatar';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { SquarePen } from 'lucide-react';
import EditThoughtDialog from '../EditThoughtDialog';
import { useState } from 'react';

type Props = {
  toggleUpdateNote: (value: boolean) => void;
};

export default function SidebarConversation({ toggleUpdateNote }: Props) {
  const user = useUserInfo();
  const [showEditThought, setShowEditThought] = useState(false);

  const handleClickThought = () => {
    if (user.thought?.content) {
      setShowEditThought(true);
    } else toggleUpdateNote(true);
  };

  const showUpdateNote = () => {
    toggleUpdateNote(true);
    setShowEditThought(false);
  };

  return (
    <>
      <div className="flex flex-col px-6 h-full">
        <div className="flex items-center justify-between pb-3">
          <span className="text-xl text-primary-text font-bold">
            {user.username}
          </span>
          <button onClick={() => toggleUpdateNote(true)}>
            <SquarePen />
          </button>
        </div>
        <div className="h-[140px] relative flex items-end">
          <button
            className="flex flex-col items-center relative"
            onClick={handleClickThought}
          >
            {!showEditThought && (
              <BubbleThought
                size="small"
                bubbleText={user.thought?.content}
                canEdit={false}
              />
            )}
            <UserAvatar avatar={user.avatar} className="size-[72px]" />
            <span className="text-secondary text-xs">Your note</span>
          </button>
          {showEditThought && (
            <EditThoughtDialog
              followersOnly={user.thought?.visibility === 'FOLLOWERS'}
              onClose={() => setShowEditThought(false)}
              showUpdateNote={showUpdateNote}
            />
          )}
        </div>
      </div>
    </>
  );
}
