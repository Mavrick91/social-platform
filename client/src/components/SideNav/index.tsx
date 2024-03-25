import UserAvatar from '@/components/UserAvatar';
import { cn } from '@/lib/utils';
import { useSideNavOpen } from '@/providers/SideNavProvider';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Compass, Heart, Home, Search, Send, SquarePlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DropdownMore from './DropdownMore';
import NavigationItem from './NavigationItem';
import SideNavLogo from './SideNavLogo';
import SideSearchUser from './SideSearchUser';

export default function SideNav() {
  const { user } = useUserInfo();
  const { section, profileId } = useParams();
  const [uploadPictureDialogOpen, setUploadPictureDialogOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const { sideNavOpen } = useSideNavOpen();

  const displaySmallNav = !sideNavOpen || showSearch;

  useEffect(() => {
    setShowSearch(false);
  }, [location]);

  const navigationItems = [
    {
      name: 'Home',
      path: '/',
      Icon: Home,
      isActive: !section || !profileId || !showSearch,
    },
    {
      name: 'Search',
      Icon: Search,
      isActive: showSearch,
      onClick: (event: React.MouseEvent) => {
        event.stopPropagation();
        setTimeout(() => {
          setShowSearch((prevShowSearch) => !prevShowSearch);
        }, 0);
      },
    },
    {
      name: 'Explore',
      path: '/explore',
      Icon: Compass,
      isActive: section === 'explore',
    },
    {
      name: 'Messages',
      path: '/dashboard/messages',
      Icon: Send,
      isActive: section === 'messages',
    },
    {
      name: 'Notifications',
      path: '/dashboard/notifications',
      Icon: Heart,
      isActive: section === 'notifications',
    },
    {
      name: 'Create',
      path: '/dashboard',
      Icon: SquarePlus,
      isActive: section === 'create',
    },
    {
      name: 'Profile',
      path: `/profile/${user.id}`,
      Icon: UserAvatar,
      props: {
        avatar: user.avatar,
        alt: `${user.firstName} ${user.lastName}`,
        className: 'size-6',
      },
      isActive: !!profileId,
    },
  ];

  return (
    <header className="z-50 bg-white shrink-0 h-screen flex-col flex">
      <nav
        className={cn(
          `bg-white h-full z-20 absolute py-2.5 transition-all px-3 border-r border-[#DBDBDB]`,
          {
            'w-small-sidenav': displaySmallNav,
            'w-medium-sidenav': !displaySmallNav,
          }
        )}
      >
        <div className="flex flex-col h-full justify-between mx-auto max-w-screen-xl">
          <SideNavLogo displaySmallNav={displaySmallNav} />

          <div className="flex flex-col grow justify-between h-full">
            <ul className="flex flex-col w-full">
              {navigationItems.map(
                ({ name, path, Icon, isActive, props, onClick }) => (
                  <li
                    key={name}
                    className="inline-block group hover:bg-secondary-button transition-colors rounded-md"
                  >
                    <NavigationItem
                      Icon={Icon}
                      isActive={isActive}
                      name={name}
                      onClick={onClick}
                      to={path}
                      displaySmallNav={displaySmallNav}
                      userAvatarProps={props}
                    />
                  </li>
                )
              )}
            </ul>

            <DropdownMore displaySmallNav={displaySmallNav} />
          </div>
        </div>
      </nav>
      {showSearch && <SideSearchUser setShowSearch={setShowSearch} />}
    </header>
  );
}
