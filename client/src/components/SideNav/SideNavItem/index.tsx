import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SideNavItem as SideNavItemType } from '../sideNavConfig';
import { useSideNav } from '@/providers/SideNavProvider';
import { cn } from '@/lib/utils';

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
}

export default function SideNavItem({
  item,
  isSmall,
  isSearchVisible,
}: SideNavItemProps) {
  const { sideNavOpen, toggleSearch } = useSideNav();
  const { pathname } = useLocation();
  const { name, path, Icon, isActive, onClick, userAvatarProps } = item;

  let isActiveItem = false;
  if (isActive) {
    isActiveItem = isActive(pathname);
  }

  const renderContent = () => (
    <div
      className={cn('flex', {
        'font-bold': isActiveItem,
        'items-center': !isSmall,
      })}
    >
      <Icon
        className={cn(
          'w-6 h-6 transition-transform duration-200 ease-out',
          {
            'scale-110': isActiveItem && sideNavOpen,
            'mx-auto': isSmall,
          },
          userAvatarProps?.className
        )}
        strokeWidth={
          (isActiveItem && !isSearchVisible) ||
          (name === 'Search' && isSearchVisible)
            ? 2.3
            : 1.5
        }
        {...userAvatarProps}
      />
      {!isSmall && (
        <motion.span
          className={cn('transition-colors duration-200 ml-4 ease-out')}
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
      'flex items-center my-1 p-3 rounded-md transition-colors duration-200 ease-out hover:bg-[#0000000D]',
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
