import { useState } from 'react';
import SidebarConversation from './SidebarConversation';
import UpdateNote from './UpdateNote';
import { useParams } from 'react-router-dom';
import ConversationThread from './ConversationThread';

export default function Conversation(): JSX.Element {
  const [showUpdateNote, setShowUpdateNote] = useState<boolean>(false);
  const params = useParams<{ threadId: string }>();
  const threadId = Number(params.threadId);

  const toggleUpdateNote = (value: boolean): void => {
    setShowUpdateNote(value);
  };

  return (
    <div className="flex h-full">
      <div className="bg-primary-background overflow-hidden shrink-0 border-r w-[398px] h-full border-separator pt-9">
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
