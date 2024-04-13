import placeholderAvatar from '@/assets/placeholder-avatar.png';
import { Link } from 'react-router-dom';

type Props = {
  avatar?: string | null;
  username?: string;
  size: string;
  onClick?: () => void;
};

export default function UserAvatar({ avatar, username, size, onClick }: Props) {
  const avatarImage = avatar ?? placeholderAvatar;
  const isLink = !!username;
  const isButton = !!onClick;

  const baseClassName = `${size} after:size-${size} after:bg-secondary-background shrink-0 flex after:border after:border-border-avatar after:absolute after:inset-0 after:z-10 relative after:rounded-full`;
  const imageClassName = 'w-full h-full rounded-full shrink-0 z-20 relative';

  const renderAvatar = () => (
    <img
      src={avatarImage}
      alt={username ? `${username} profile picture` : 'User profile picture'}
      className={imageClassName}
    />
  );

  if (isLink) {
    return (
      <Link to={`/${username}`} className={baseClassName}>
        {renderAvatar()}
      </Link>
    );
  }

  if (isButton) {
    return (
      <button onClick={onClick} className={baseClassName}>
        {renderAvatar()}
      </button>
    );
  }

  return <div className={baseClassName}>{renderAvatar()}</div>;
}
