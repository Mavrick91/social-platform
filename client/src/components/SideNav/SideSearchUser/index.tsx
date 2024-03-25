import { useGetUsersByUsernameQuery } from '@/__generated__/graphql';
import UserAvatar from '@/components/UserAvatar';
import useClickOutside from '@/hooks/useOnClickOutside';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  setShowSearch: (showSearch: boolean) => void;
};

export default function SideSearchUser({ setShowSearch }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setShowSearch(false);
  });

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
    <motion.div
      ref={ref}
      initial={{ left: '-400px' }}
      animate={{ left: '77px' }}
      transition={{ duration: 0.3 }}
      className="bg-white z-10 border absolute w-[400px] rounded-tr-2xl rounded-br-2xl h-full border-[#DBDBDB] py-2"
    >
      <div className="text-2xl font-semibold pt-3 pl-6 pb-9">Search</div>
      <div className="px-4 mb-6">
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder="Search"
          className="bg-zinc-200/80 px-4 py-1 rounded-md w-full h-10 focus:outline-none"
        />
      </div>
      {!data?.usersByUsername && <div className="border-b border-[#DBDBDB]" />}
      {/* Render search results */}
      {data?.usersByUsername.map((user) => (
        <Link
          to={`/profile/${user.id}`}
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
    </motion.div>
  );
}
