import { useDeleteThoughtMutation } from '@/__generated__/graphql';
import { useUserInfo } from '@/providers/UserInfoProvider';

export default function useDeleteThought() {
  const user = useUserInfo();

  return useDeleteThoughtMutation({
    update(cache, { data }) {
      const deleteThought = data?.deleteThought;

      if (deleteThought) {
        cache.modify({
          id: cache.identify(user),
          fields: {
            thought() {
              return null;
            },
          },
        });
      }
    },
  });
}
