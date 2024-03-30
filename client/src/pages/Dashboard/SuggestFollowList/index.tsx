import { useGetAllUsersQuery } from '@/__generated__/graphql';
import UserAvatar from '@/components/UserAvatar';
import ButtonFollow from '@/pages/Profile/UserProfile/ButtonFollow';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Link } from 'react-router-dom';

export default function SuggestFollowList() {
  const user = useUserInfo();
  const { data, loading, error } = useGetAllUsersQuery();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="flex justify-center">
      <div className="max-w-[600px] w-full">
        <h3 className="font-semibold mb-5">Suggested for you</h3>
        {data?.users.map((suggestUser) => {
          const isFollowing = user.initiatedFollows.some(
            (following) => following.targetUserId === suggestUser.id
          );

          return (
            <div
              key={suggestUser.id}
              className="flex py-2 px-4 items-center justify-between"
            >
              <div className="flex items-center">
                <Link to={`/${suggestUser.username}`}>
                  <UserAvatar className="size-11" avatar={suggestUser.avatar} />
                </Link>
                <div className="ml-2">
                  <Link to={`/${suggestUser.username}`}>
                    <p className="text-sm font-semibold">
                      {suggestUser.username}
                    </p>
                  </Link>
                  <p className="text-sm font text-zinc-500">
                    {suggestUser.firstName} {suggestUser.lastName}
                  </p>
                  <p className="text-xs font text-zinc-500">
                    Suggested for you
                  </p>
                </div>
              </div>
              <ButtonFollow
                isFollowing={isFollowing}
                targetUserId={suggestUser.id}
                className="bg-blue-500 hover:bg-blue-600"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
