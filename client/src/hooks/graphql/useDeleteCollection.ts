import { useDeleteCollectionMutation } from '@/__generated__/graphql';

export default function useDeleteCollection() {
  return useDeleteCollectionMutation({
    update(cache, { data }) {
      if (data?.deleteCollection) {
        cache.evict({ id: cache.identify(data.deleteCollection) });
      }
    },
  });
}
