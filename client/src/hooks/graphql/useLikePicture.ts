import { useLikePictureMutation } from '@/__generated__/graphql';
import { PICTURE_FRAGMENT } from '@/graphql/queries/picture';

export default function useLikePicture(pictureId: number) {
  return useLikePictureMutation({
    variables: { pictureId },
    update(cache, { data }) {
      if (data?.likePicture) {
        cache.writeFragment({
          id: cache.identify(data.likePicture),
          fragment: PICTURE_FRAGMENT,
          data: data.likePicture,
          fragmentName: 'PictureFragment',
        });
      }
    },
  });
}
