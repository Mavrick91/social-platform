import { useDeletePictureMutation } from '@/__generated__/graphql';
import { updateUserCount } from '@/lib/cacheUtils';

export function useDeletePicture() {
  return useDeletePictureMutation({
    update(cache, { data }) {
      if (data?.deletePicture) {
        cache.modify({
          fields: {
            user(existingUser = {}, { readField }) {
              const userId: number | undefined = readField('id', existingUser);

              if (userId) updateUserCount(cache, userId, 'pictures', -1);
              return existingUser;
            },
          },
        });
        cache.evict({ id: cache.identify(data.deletePicture) });
      }
    },
  });
}
