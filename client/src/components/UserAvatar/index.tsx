import placeholderAvatar from '@/assets/placeholder-avatar.png';
import { cn } from '@/lib/utils';

type Props = {
  avatar?: string | null;
  className?: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export default function UserAvatar({ avatar, className, ...imgProps }: Props) {
  return (
    <img
      src={avatar ?? placeholderAvatar}
      alt="Profile picture"
      className={cn('size-10 aspect-square rounded-full shrink-0', className)}
      {...imgProps}
    />
  );
}
