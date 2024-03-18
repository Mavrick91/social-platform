import { useUploadPictureMutation } from '@/__generated__/graphql';
import { GET_PICTURE_BY_AUTHOR } from '@/graphql/queries/picture';
import { updateUserCount } from '@/lib/cacheUtils';

export function useUploadPicture(userId?: number) {
  return useUploadPictureMutation({
    refetchQueries: [
      {
        query: GET_PICTURE_BY_AUTHOR,
        variables: userId ? { authorId: userId } : undefined,
      },
    ],
    update(cache, { data }) {
      if (data?.createPicture) {
        cache.modify({
          fields: {
            user(existingUser = {}, { readField }) {
              const userId: number | undefined = readField('id', existingUser);

              if (userId) updateUserCount(cache, userId, +1);
              return existingUser;
            },
          },
        });
      }
    },
  });
}
