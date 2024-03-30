import { useGetPicturesFromFollowingQuery } from '@/__generated__/graphql';
import { useUserInfo } from '@/providers/UserInfoProvider';
import PostItem from './PostItem';
import SuggestFollowList from '../SuggestFollowList';

export default function PostFollowing() {
  const user = useUserInfo();

  const followingPeopleIds = user.initiatedFollows.map(
    (follow) => follow.targetUserId!
  );

  const { data, loading, error } = useGetPicturesFromFollowingQuery({
    variables: {
      userId: followingPeopleIds,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  if (data?.picturesFromFollowing.length === 0) {
    return <SuggestFollowList />;
  }

  return (
    <div className="space-y-4">
      {data?.picturesFromFollowing.map((picture) => {
        return <PostItem key={picture.id} picture={picture} />;
      })}
    </div>
  );
}
