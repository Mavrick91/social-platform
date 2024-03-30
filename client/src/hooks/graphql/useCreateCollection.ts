import {
  UserProfileFragment,
  useCreateCollectionMutation,
} from '@/__generated__/graphql';
import { USER_PROFILE_FRAGMENT } from '@/graphql/queries/user';
import { useUserInfo } from '@/providers/UserInfoProvider';

export default function useCreateCollection() {
  const user = useUserInfo();

  return useCreateCollectionMutation({
    update: (cache, { data }) => {
      if (!data?.createCollection) return;

      const newCollection = data?.createCollection;

      const userProfileData = cache.readFragment<UserProfileFragment>({
        id: `User:${user.id}`,
        fragment: USER_PROFILE_FRAGMENT,
        fragmentName: 'UserProfile',
      });

      if (userProfileData) {
        const updatedCollections = [
          ...userProfileData.collections,
          newCollection,
        ];

        cache.writeFragment({
          id: `User:${user.id}`,
          fragment: USER_PROFILE_FRAGMENT,
          fragmentName: 'UserProfile',
          data: {
            ...userProfileData,
            collections: updatedCollections,
          },
        });
      }
    },
  });
}
