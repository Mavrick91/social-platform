import { useUnlikePictureMutation } from '@/__generated__/graphql';
import { PICTURE_FRAGMENT } from '@/graphql/queries/picture';

export default function useUnLikePicture(likeId: number) {
  return useUnlikePictureMutation({
    variables: { likeId },
    update(cache, { data }) {
      if (data?.unlikePicture) {
        const pictureIdInCache = cache.identify({
          __typename: 'Picture',
          id: data.unlikePicture.id,
        });

        cache.writeFragment({
          id: pictureIdInCache,
          fragment: PICTURE_FRAGMENT,
          data: data.unlikePicture,
          fragmentName: 'PictureFragment',
        });
      }
    },
  });
}
