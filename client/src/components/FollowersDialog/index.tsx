import {
  InitiatedFollowsFragment,
  ReceivedFollowsFragment,
  UserFragmentFragment,
} from '@/__generated__/graphql';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import FollowersDialogItem from './FollowersDialogItem';

type Props = {
  children: React.ReactNode;
  followers: (InitiatedFollowsFragment | ReceivedFollowsFragment)[];
  isFollowers?: boolean;
};

export default function FollowersDialog({
  children,
  followers,
  isFollowers,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="px-0">
        <div className="pt-6 space-y-5">
          {!followers || followers.length >= 1 ? (
            followers.map((follower) => {
              let user: UserFragmentFragment | undefined | null;

              if ('initiator' in follower) {
                user = follower.initiator;
              } else if ('targetUser' in follower) {
                user = follower.targetUser;
              }

              if (!user) return null;

              return <FollowersDialogItem follower={user} key={user.id} />;
            })
          ) : (
            <p className="text-center text-gray-500">
              {isFollowers ? 'No followers' : 'No followings'}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
