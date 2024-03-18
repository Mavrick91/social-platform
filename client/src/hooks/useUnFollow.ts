import { useUnfollowUserMutation } from '@/__generated__/graphql';
import { updateUserCount } from '@/lib/cacheUtils';

export default function useUnFollow() {
  return useUnfollowUserMutation({
    update(cache, { data }) {
      if (data?.unfollowUser?.followingId) {
        cache.modify({
          fields: {
            user(existingUser = {}, { readField }) {
              const userId: number | undefined = readField('id', existingUser);

              if (userId) updateUserCount(cache, userId, 'followedBy', +1);
              return existingUser;
            },
          },
        });
      }
    },
  });
}
