import { useCreateThoughtMutation } from '@/__generated__/graphql';
import { useUserInfo } from '@/providers/UserInfoProvider';

export default function useCreateThought() {
  const user = useUserInfo();

  return useCreateThoughtMutation({
    update(cache, { data }) {
      const newThought = data?.createThought;

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
