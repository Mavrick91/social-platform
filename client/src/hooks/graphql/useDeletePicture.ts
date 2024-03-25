import { useDeletePictureMutation } from '@/__generated__/graphql';
import { updateUserCount } from '@/lib/cacheUtils';
import { Reference } from '@apollo/client';

export function useDeletePicture() {
  return useDeletePictureMutation({
    update(cache, { data }) {
      if (data?.deletePicture) {
        cache.modify({
          fields: {
            picturesByAuthor(existingPictures = [], { readField }) {
              return existingPictures.filter((pictureRef: Reference) => {
                return data.deletePicture.id !== readField('id', pictureRef);
              });
            },
            user(existingUser = {}, { readField }) {
              const userId: number | undefined = readField('id', existingUser);

              if (userId) updateUserCount(cache, userId, 'pictures', -1);
              return existingUser;
            },
          },
        });
      }
    },
  });
}
