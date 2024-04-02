import {
  InitiatedFollowsFragment,
  ReceivedFollowsFragment,
  UserFragmentFragment,
} from '@/__generated__/graphql';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
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

      <DialogContent
        className="p-0 gap-0 flex flex-col max-h-[400px] w-[400px] min-h-[200px]"
        style={{
          maxWidth: 'calc(100vw - 88px)',
        }}
      >
        <DialogHeader className="justify-center">
          <h3 className="font-bold">
            {isFollowers ? 'Followers' : 'Followings'}
          </h3>
        </DialogHeader>

        <div>
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
            <p className="text-center pt-6 text-secondary">
              {isFollowers ? 'No followers' : 'No followings'}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
