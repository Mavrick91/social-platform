import { useGetUsersByUsernameQuery } from '@/__generated__/graphql';
import { CircleX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import UserListItem from '@/components/UserListItem';
import { Link } from 'react-router-dom';

const UsernameSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  return (
    <>
      <div className="text-2xl text-primary-text font-semibold pt-3 pl-6 pb-9">
        Search
      </div>
      <div className="px-4 mb-6 relative">
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="Search"
          autoFocus
          className="bg-highlight-background px-4 py-1 text-primary-text rounded-md w-full h-10 focus:outline-none"
        />
        <button
          className="absolute top-1/2 transform right-8 -translate-y-1/2"
          onClick={() => setInputValue('')}
        >
          <CircleX size={20} color="gray" />
        </button>
      </div>
      {(!data?.usersByUsername ||
        (data.usersByUsername && data.usersByUsername.length === 0)) && (
        <div className="border-b border-separator" />
      )}

      <div className="overflow-y-auto grow">
        {data?.usersByUsername.map((user) => (
          <Link to={`/${user.username}`}>
            <div className="hover:!bg-hover-overlay">
              <UserListItem
                avatar={user.avatar}
                firstName={user.username}
                subText={
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                }
                subTextSize="sm"
                username={user.username}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default UsernameSearch;
