import { UserFragmentFragment } from '@/__generated__/graphql';
import UserAvatar from '@/components/UserAvatar';
import { Compass, Heart, Home, Search, Send, SquarePlus } from 'lucide-react';

export interface SideNavItem {
  name: string;
  path?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
  isActive?: (path: string) => boolean;
  onClick?: () => void;
  userAvatarProps?: {
    avatar?: string | null;
    alt: string;
    className: string;
  };
}

export const getNavigationItems = (
  user: UserFragmentFragment,
  openSearch: () => void,
  openCreate: () => void
): SideNavItem[] => [
  {
    name: 'Home',
    path: '/',
    Icon: Home,
    isActive: (path) => path === '/',
  },
  {
    name: 'Search',
    Icon: Search,
    onClick: openSearch,
  },
  {
    name: 'Explore',
    path: '/explore',
    Icon: Compass,
    isActive: (path) => path === '/explore',
  },
  {
    name: 'Messages',
    path: '/direct',
    Icon: Send,
    isActive: (path) => path === '/direct',
  },
  {
    name: 'Notifications',
    path: '/notifications',
    Icon: Heart,
    isActive: (path) => path === '/notifications',
  },
  {
    name: 'Create',
    Icon: SquarePlus,
    onClick: openCreate,
  },
  {
    name: 'Profile',
    path: `/${user.username}`,
    Icon: UserAvatar,
    userAvatarProps: {
      avatar: user.avatar,
      alt: `${user.firstName} ${user.lastName}`,
      className: 'w-6 h-6',
    },
    isActive: (path) =>
      !['/', '/explore', '/direct', '/notifications'].includes(path),
  },
];
