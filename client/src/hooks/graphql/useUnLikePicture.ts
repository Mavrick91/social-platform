import { useUnlikePictureMutation } from '@/__generated__/graphql';
import { PICTURE_FRAGMENT } from '@/graphql/queries/picture';

export default function useUnLikePicture(likeId: number) {
  return useUnlikePictureMutation({
    variables: { likeId },
    update(cache, { data }) {
      if (data?.unlikePicture) {
        if (data?.unlikePicture) {
          cache.writeFragment({
            id: cache.identify(data.unlikePicture),
            fragment: PICTURE_FRAGMENT,
            data: data.unlikePicture,
            fragmentName: 'PictureFragment',
          });
        }
      }
    },
  });
}
