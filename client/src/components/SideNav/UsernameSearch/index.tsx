import { useGetUsersByUsernameQuery } from '@/__generated__/graphql';
import UserAvatar from '@/components/UserAvatar';
import { CircleX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
      <div className="text-2xl font-semibold pt-3 pl-6 pb-9">Search</div>
      <div className="px-4 mb-6 relative">
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="Search"
          className="bg-zinc-200/80 px-4 py-1 rounded-md w-full h-10 focus:outline-none"
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
        <div className="border-b border-[#DBDBDB]" />
      )}

      {data?.usersByUsername.map((user) => (
        <Link
          to={`/${user.username}`}
          key={user.id}
          className="py-2 px-6 transition-colors flex gap-2 hover:bg-[#e3e3e3] items-center"
        >
          <UserAvatar className="size-11" avatar={user.avatar} />
          <div>
            <div className="font-semibold">{user.username}</div>
            <div className="text-sm text-gray-500">
              {user.firstName} {user.lastName}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default UsernameSearch;
