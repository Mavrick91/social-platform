import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  useCreateThreadMutation,
  useGetUsersByUsernameQuery,
} from '@/__generated__/graphql';
import UserAvatar from '../UserAvatar';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { useNavigate } from 'react-router-dom';

type Props = {
  onClose: () => void;
};

export default function CreateConversationDialog({ onClose }: Props) {
  const user = useUserInfo();
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [createThread] = useCreateThreadMutation();
  const navigate = useNavigate();

  const { data } = useGetUsersByUsernameQuery({
    variables: {
      username: debouncedInputValue,
    },
    skip: !debouncedInputValue,
  });

  useEffect(() => {
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputValue]);

  const handleCloseModal = () => {
    onClose();
    setIsOpen(false);
  };

  const handleStartConversation = async (recipientId: number) => {
    const response = await createThread({
      variables: {
        createThreadInput: {
          userIds: [user.id, recipientId],
        },
      },
    });

    if (response.data?.createThread) {
      handleCloseModal();
      navigate(`/direct/t/${response.data.createThread.id}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="p-0 gap-0 flex flex-col">
        <div className="flex border-b border-separator px-4 justify-center py-3.5">
          <h3 className="font-bold">New message</h3>
        </div>
        <div className="border-b border-separator px-4 h-9 flex items-center">
          <span className="font-bold">To:</span>
          <div className="py-1 px-4">
            <input
              type="text"
              placeholder="Search..."
              className="flex-grow focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 h-96 overflow-y-auto">
          {!data ? (
            <div className="px-6 text-secondary text-sm">No account found.</div>
          ) : (
            data.usersByUsername.map((user) => (
              <button
                key={user.id}
                className="hover:bg-secondary-button-hover w-full"
                onClick={() => handleStartConversation(user.id)}
              >
                <div className="flex px-6 items-center py-2">
                  <UserAvatar
                    avatar={user.avatar}
                    className="size-11 rounded-full mr-3"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-secondary text-left text-sm">
                      {user.firstName}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
        <div className="p-6">
          <Button className="w-full">Chat</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
