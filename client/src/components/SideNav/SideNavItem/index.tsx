import NotificationBadge, {
  NotificationCountProps,
} from '@/components/NotificationBadge';
import { cn } from '@/lib/utils';
import { useSideNav } from '@/providers/SideNavProvider';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SideNavItem as SideNavItemType } from '../sideNavConfig';

interface LinkOrButtonProps {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const LinkOrButton: React.FC<LinkOrButtonProps> = ({
  to,
  onClick,
  className,
  children,
}) => {
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  } else if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    );
  } else {
    return null;
  }
};

interface SideNavItemProps {
  item: SideNavItemType;
  isSmall: boolean;
  isSearchVisible: boolean;
  isNotificationVisible: boolean;
  notificationsCount: NotificationCountProps[];
}

export default function SideNavItem({
  item,
  isSmall,
  isSearchVisible,
  isNotificationVisible,
  notificationsCount,
}: SideNavItemProps) {
  const { sideNavOpen, toggleSearch } = useSideNav();
  const { pathname } = useLocation();
  const { name, path, Icon, isActive, onClick, userAvatarProps } = item;

  let isActiveItem = false;
  if (isActive) {
    isActiveItem = isActive(pathname);
  }

  const hasNotifications = notificationsCount.some(
    ({ count }) => count.length > 0
  );

  const renderContent = () => (
    <div
      className={cn('flex items-center', {
        'font-bold': isActiveItem,
      })}
    >
      <div className="relative">
        <Icon
          className={cn(
            'size-6 transition-transform ease-out group-hover:scale-[1.1] text-primary-text',
            {
              'scale-110': isActiveItem && sideNavOpen,
              'mx-auto': isSmall,
            }
          )}
          strokeWidth={
            (isActiveItem && !isSearchVisible && !isNotificationVisible) ||
            (name === 'Search' && isSearchVisible) ||
            (name === 'Notifications' && isNotificationVisible)
              ? 2.3
              : 1.5
          }
          {...userAvatarProps}
        />
        {name === 'Notifications' && hasNotifications && (
          <NotificationBadge
            isSmall={isSmall}
            notificationsCount={notificationsCount}
          />
        )}
      </div>
      {!isSmall && (
        <motion.span
          className={cn(
            'transition-colors text-primary-text duration-200 ml-4 ease-out'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isSmall ? 0 : 1 }}
          transition={{ delay: 0.2 }}
        >
          {name}
        </motion.span>
      )}
    </div>
  );

  const linkOrButtonProps: LinkOrButtonProps = {
    className: cn(
      'flex items-center group my-1 p-3 rounded-lg transition-colors duration-200 ease-out hover:bg-hover-overlay',
      {
        relative: onClick === toggleSearch,
      }
    ),
    children: renderContent(),
  };

  if (path) {
    linkOrButtonProps.to = path;
  } else if (onClick) {
    linkOrButtonProps.onClick = onClick;
  }

  return <LinkOrButton {...linkOrButtonProps} />;
}
