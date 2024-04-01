import { useDeletePictureMutation } from '@/__generated__/graphql';

export function useDeletePicture() {
  return useDeletePictureMutation({
    update(cache, { data }) {
      if (data?.deletePicture) {
        cache.evict({ id: cache.identify(data.deletePicture) });
      }
    },
  });
}
