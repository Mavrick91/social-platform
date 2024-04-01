import { useUploadPictureMutation } from '@/__generated__/graphql';
import { GET_PICTURE_BY_USERNAME } from '@/graphql/queries/picture';
import { updateUserCount } from '@/lib/cacheUtils';

export function useUploadPicture(username?: string) {
  return useUploadPictureMutation({
    refetchQueries: [
      {
        query: GET_PICTURE_BY_USERNAME,
        variables: username ? { username } : undefined,
      },
    ],
    update(cache, { data }) {
      if (data?.createPicture) {
        cache.modify({
          fields: {
            user(existingUser = {}, { readField }) {
              const userId: number | undefined = readField('id', existingUser);

              if (userId) updateUserCount(cache, userId, 'pictures', +1);
              return existingUser;
            },
          },
        });
      }
    },
  });
}
