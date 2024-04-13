import { useGetAllUsersQuery } from '@/__generated__/graphql';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Link } from 'react-router-dom';
import UserListItem from '@/components/UserListItem';

export default function SuggestFollowList() {
  const user = useUserInfo();
  const { data, loading, error } = useGetAllUsersQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="flex justify-center">
      <div className="max-w-[600px] w-full mb-5">
        <h3 className="font-semibold">Suggested for you</h3>
        {data?.users.map((suggestUser) => {
          const isFollowing = user.initiatedFollows.some(
            (following) => following.targetUserId === suggestUser.id
          );

          return (
            <div
              key={suggestUser.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Link to={`/${suggestUser.username}`}>
                  <UserListItem
                    avatar={suggestUser.avatar}
                    firstName={suggestUser.username}
                    subText={
                      <p className="text-sm font text-zinc-500">
                        {suggestUser.firstName} {suggestUser.lastName}
                      </p>
                    }
                    subTextSize="sm"
                  />
                </Link>
              </div>
              <ButtonFollow
                isFollowing={isFollowing}
                targetUserId={suggestUser.id}
                buttonProps={{
                  variant: 'blue',
                  size: 'xs',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
