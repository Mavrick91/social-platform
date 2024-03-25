import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type LinkOrButtonProps =
  | { to?: string; onClick?: () => void }
  | { onClick?: () => void; to: never };

type LinkOrButtonPropsWithChildren = LinkOrButtonProps & {
  children: ReactNode;
};

const LinkOrButton: React.FC<
  LinkOrButtonPropsWithChildren & { className: string }
> = ({ to, onClick, className, children }) => {
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

type Props = {
  isActive: boolean;
  displaySmallNav: boolean;
  name: string;
  Icon: LucideIcon | React.FC;
  userAvatarProps?: {
    avatar?: string | null;
    alt: string;
    className: string;
  };
} & LinkOrButtonProps;

export default function NavigationItem({
  onClick,
  isActive,
  displaySmallNav,
  Icon,
  name,
  to,
  userAvatarProps,
}: Props) {
  const { className, ...rest } = userAvatarProps || {};
  const customClassName = className
    ? className
    : 'group-hover:scale-[1.1] transition-transform';

  const children = (
    <>
      <Icon
        className={customClassName}
        strokeWidth={isActive ? 2.5 : 1.5}
        {...rest}
      />
      <motion.span
        className={cn('ml-4', {
          'font-bold': isActive,
          'opacity-0 ml-0': displaySmallNav,
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: displaySmallNav ? 0 : 1 }}
        transition={{ delay: 0.2 }}
      >
        {!displaySmallNav && name}
      </motion.span>
    </>
  );

  const compProps: LinkOrButtonPropsWithChildren = onClick
    ? { onClick, children }
    : { to: to || '', children };

  return (
    <LinkOrButton
      {...compProps}
      className="p-3 my-1 w-full text-black flex items-center"
    />
  );
}
