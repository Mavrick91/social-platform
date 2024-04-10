import { useState } from 'react';
import SidebarConversation from './SidebarConversation';
import UpdateNote from './UpdateNote';
import { useParams } from 'react-router-dom';
import ConversationThread from './ConversationThread';

export default function Conversation() {
  const [showUpdateNote, setShowUpdateNote] = useState(false);
  const params = useParams();
  const threadId = Number(params.threadId);

  const toggleUpdateNote = (value: boolean) => {
    setShowUpdateNote(value);
  };

  return (
    <div className="flex h-full">
      <div className="bg-white overflow-hidden shrink-0 border w-[400px] h-full border-separator pt-9">
        <SidebarConversation toggleUpdateNote={toggleUpdateNote} />
      </div>
      {showUpdateNote ? (
        <UpdateNote toggleUpdateNote={toggleUpdateNote} />
      ) : threadId ? (
        <ConversationThread threadId={threadId} />
      ) : null}
    </div>
  );
}
