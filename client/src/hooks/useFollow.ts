import { useFollowUserMutation } from '@/__generated__/graphql';
import { updateUserCount } from '@/lib/cacheUtils';

export default function useFollow() {
  return useFollowUserMutation({
    update(cache, { data }) {
      if (data?.followUser?.followingId) {
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
