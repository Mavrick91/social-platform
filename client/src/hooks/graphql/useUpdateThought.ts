import { useUpdateThoughtMutation } from '@/__generated__/graphql';
import { useUserInfo } from '@/providers/UserInfoProvider';

export default function useUpdateThought() {
  const user = useUserInfo();

  return useUpdateThoughtMutation({
    update(cache, { data }) {
      const newThought = data?.updateThought;

      if (newThought) {
        cache.modify({
          id: cache.identify(user),
          fields: {
            thought() {
              return newThought;
            },
          },
        });
      }
    },
  });
}
