import { useUserInfo } from '@/providers/UserInfoProvider';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import CreateConversationDialog from '@/components/CreateConversationDialog';
import { FriendsNote } from './FriendsNote';
import ConversationList from './ConversationList';

type Props = {
  toggleUpdateNote: (value: boolean) => void;
};

export default function SidebarConversation({ toggleUpdateNote }: Props) {
  const user = useUserInfo();
  const [showCreateConversation, setShowCreateConversation] = useState(false);

  const showUpdateNote = () => {
    toggleUpdateNote(true);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 justify-between pb-3">
          <span className="text-xl text-primary-text font-bold">
            {user.username}
          </span>
          <button onClick={() => setShowCreateConversation(true)}>
            <SquarePen />
          </button>
        </div>

        <FriendsNote
          toggleUpdateNote={toggleUpdateNote}
          thoughtContent={user.thought?.content}
          userAvatar={user.avatar}
          showUpdateNote={showUpdateNote}
        />

        <div className="py-4 px-6 font-bold">Messages</div>

        <ConversationList />
      </div>

      {showCreateConversation && (
        <CreateConversationDialog
          onClose={() => setShowCreateConversation(false)}
        />
      )}
    </>
  );
}
