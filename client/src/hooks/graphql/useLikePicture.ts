import { useLikePictureMutation } from '@/__generated__/graphql';
import { PICTURE_FRAGMENT } from '@/graphql/queries/picture';

export default function useLikePicture(pictureId: number) {
  return useLikePictureMutation({
    variables: { pictureId },
    update(cache, { data }) {
      if (data?.likePicture) {
        const pictureIdInCache = cache.identify({
          __typename: 'Picture',
          id: data.likePicture.id,
        });
        console.log('🚀 ~ pictureIdInCache:', pictureIdInCache);
        console.log('🚀 ~ data.likePicture:', data.likePicture);

        cache.writeFragment({
          id: pictureIdInCache,
          fragment: PICTURE_FRAGMENT,
          data: data.likePicture,
          fragmentName: 'PictureFragment',
        });
      }
    },
  });
}
