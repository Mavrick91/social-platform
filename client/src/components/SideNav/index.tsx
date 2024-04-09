import { useInfiniteNotifications } from '@/hooks/graphql/useInfiniteNotifications';
import useMarkNotificationsAsRead from '@/hooks/graphql/useMarkNotificationsAsRead';
import useNotificationAdded from '@/hooks/graphql/useNotificationAdded';
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
    isSearchVisible,
    toggleSearch,
    isNotificationVisible,
    toggleNotification,
    isNewPostVisible,
    toggleNewPost,
    displaySmallNav,
  } = useSideNav();

  const { notifications, fetchNextPage, hasNextPage, setAllNotifications } =
    useInfiniteNotifications();

  useNotificationAdded(user.id, setAllNotifications);

  const [markNotifAsRead] = useMarkNotificationsAsRead(setAllNotifications);

  const navigationItems = getNavigationItems(
    user,
    toggleSearch,
    toggleNewPost,
    toggleNotification
  );

  const notificationsCount: NotificationCountProps[] = notifications.reduce(
    (acc, currentValue) => {
      if (currentValue.read) return acc;

      if (currentValue.type === 'LIKE') {
        acc[0].count.push(currentValue.id);
      } else if (currentValue.type === 'COMMENT') {
        acc[1].count.push(currentValue.id);
      } else if (currentValue.type === 'FOLLOW') {
        acc[2].count.push(currentValue.id);
      }
      return acc;
    },
    [
      { id: 'like', count: [] as number[] },
      { id: 'comment', count: [] as number[] },
      { id: 'follow', count: [] as number[] },
    ]
  );

  const handleToggleNotification = () => {
    const newNotifications = notificationsCount.flatMap((item) => item.count);

    if (newNotifications?.length)
      markNotifAsRead({
        variables: { notificationIds: newNotifications },
      });

    toggleNotification();
  };

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
          <SideNavOverlay toggle={handleToggleNotification}>
            <NotificationList
              notifications={notifications}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
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
