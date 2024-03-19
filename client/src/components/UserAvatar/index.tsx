import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
    <>
      {avatar ? (
        <Avatar className={cn('shrink-0', className)}>
          <AvatarImage alt="Profile picture" src={avatar} />
        </Avatar>
      ) : (
        <img
          src={placeholderAvatar}
          alt="Profile picture"
          className={cn(
            'size-10 aspect-square rounded-full shrink-0',
            className
          )}
          {...imgProps}
        />
      )}
    </>
  );
}
