import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { clearStorage } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { motion } from 'framer-motion';
import {
  AlignJustify,
  Bookmark,
  OctagonAlert,
  Settings2,
  SquareActivity,
  Sun,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  displaySmallNav: boolean;
};

export default function DropdownMore({ displaySmallNav }: Props) {
  const user = useUserInfo();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearStorage();
    navigate('/login');
  };

  const dropdownItems = [
    {
      name: 'Settings',
      Icon: Settings2,
    },
    {
      name: 'Your activity',
      Icon: SquareActivity,
    },
    {
      name: 'Saved',
      Icon: Bookmark,
    },
    {
      name: 'Switch appearance',
      Icon: Sun,
    },
    {
      name: 'Report a problem',
      Icon: OctagonAlert,
    },
    {
      name: 'Switch accounts',
      onClick: () => navigate(`/profile/${user.id}`),
    },
    {
      name: 'Log out',
      onClick: handleLogout,
      className: 'text-red-500 p-4',
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center p-3">
          <AlignJustify />
          <motion.span
            className={cn('ml-4', {
              'opacity-0 ml-0': displaySmallNav,
            })}
            initial={{ opacity: 0 }}
            animate={{ opacity: displaySmallNav ? 0 : 1 }}
            transition={{ delay: 0.2 }}
          >
            {!displaySmallNav && 'More'}
          </motion.span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[266px] ml-5 shadow-lg rounded-lg">
        {dropdownItems.map(({ name, Icon, onClick }) => {
          return (
            <Fragment key={name}>
              {name === 'Log out' && <DropdownMenuSeparator />}
              <DropdownMenuItem
                className="p-4 cursor-pointer"
                onClick={onClick}
              >
                <div className="flex items-center gap-2">
                  {Icon ? <Icon /> : null}
                  {name}
                </div>
              </DropdownMenuItem>
            </Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
