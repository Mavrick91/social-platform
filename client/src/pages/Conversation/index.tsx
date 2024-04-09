import { useState } from 'react';
import SidebarConversation from './SidebarConversation';
import UpdateNote from './UpdateNote';

export default function Conversation() {
  const [showUpdateNote, setShowUpdateNote] = useState(false);
  console.log('🚀 ~ showUpdateNote:', showUpdateNote);

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
      ) : null}
    </div>
  );
}
