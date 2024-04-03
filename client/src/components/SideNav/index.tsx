import { cn } from '@/lib/utils';
import { useSideNav } from '@/providers/SideNavProvider';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { NotificationCountProps } from '../NotificationBadge';
import UploadPostDialog from '../UploadPostDialog';
import DropdownMore from './DropdownMore';
import NotificationList from './NotificationList';
import SideNavItem from './SideNavItem';
import SideNavLogo from './SideNavLogo';
import SideNavOverlay from './SideNavOverlay';
import UsernameSearch from './UsernameSearch';
import { getNavigationItems } from './sideNavConfig';

export default function SideNav() {
  const user = useUserInfo();
  const {
    sideNavOpen,
    isSearchVisible,
    toggleSearch,
    isNotificationVisible,
    toggleNotification,
    isNewPostVisible,
    toggleNewPost,
  } = useSideNav();
  const navigationItems = getNavigationItems(
    user,
    toggleSearch,
    toggleNewPost,
    toggleNotification
  );

  const displaySmallNav =
    !sideNavOpen || isSearchVisible || isNotificationVisible;

  const notificationsCount: NotificationCountProps[] =
    user.unreadNotifications.reduce(
      (acc, currentValue) => {
        if (currentValue.type === 'LIKE') {
          acc[0].count += 1;
        } else if (currentValue.type === 'COMMENT') {
          acc[1].count += 1;
        } else if (currentValue.type === 'FOLLOW') {
          acc[2].count += 1;
        }
        return acc;
      },
      [
        { id: 'like', count: 0 },
        { id: 'comment', count: 0 },
        { id: 'follow', count: 0 },
      ]
    );
  // console.log('🚀 ~ user.unreadNotifications:', user.unreadNotifications);
  // console.log('🚀 ~ user.username:', user.username);
  // console.log('🚀 ~ notificationsCount:', notificationsCount);

  return (
    <header className="z-50 bg-white shrink-0 h-screen flex-col flex">
      <nav
        className={cn(
          `bg-white h-full z-20 absolute py-2.5 transition-all px-3 border-r border-separator`,
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
              {navigationItems.map((item) => (
                <SideNavItem
                  key={item.name}
                  item={item}
                  isSmall={displaySmallNav}
                  isSearchVisible={isSearchVisible}
                  isNotificationVisible={isNotificationVisible}
                  notificationsCount={notificationsCount}
                  hasNotifications={user.unreadNotifications.length > 0}
                />
              ))}
            </ul>

            <DropdownMore displaySmallNav={displaySmallNav} />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isSearchVisible && (
          <SideNavOverlay toggle={toggleSearch}>
            <UsernameSearch />
          </SideNavOverlay>
        )}
        {isNotificationVisible && (
          <SideNavOverlay toggle={toggleNotification}>
            <NotificationList />
          </SideNavOverlay>
        )}
      </AnimatePresence>

      {isNewPostVisible && (
        <UploadPostDialog
          onClose={toggleNewPost}
          buttonSubmitText="Share"
          title="Create new post"
          backButton={<ArrowLeft />}
        />
      )}
    </header>
  );
}
