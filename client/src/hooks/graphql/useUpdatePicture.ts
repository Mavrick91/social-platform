import { useUpdatePictureMutation } from '@/__generated__/graphql';

export function useUpdatePicture() {
  return useUpdatePictureMutation({
    update(cache, { data }) {
      if (data?.updatePicture) {
        const picture = data.updatePicture;

        cache.modify({
          id: cache.identify(picture),
          fields: {
            description() {
              return picture.description ?? null;
            },
            altText() {
              return picture.altText ?? null;
            },
            disableComments() {
              return picture.disableComments ?? null;
            },
            hideLikesAndViewCounts() {
              return picture.hideLikesAndViewCounts ?? null;
            },
          },
        });
      }
    },
  });
}
