import {
  UserProfileFragment,
  useRemovePictureFromCollectionMutation,
} from '@/__generated__/graphql';
import { USER_PROFILE_FRAGMENT } from '@/graphql/queries/user';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { toast } from 'react-toastify';

export default function useRemovePictureCollection() {
  const user = useUserInfo();

  return useRemovePictureFromCollectionMutation({
    update(cache, { data }, { variables }) {
      try {
        if (!data?.removePictureFromCollection || !variables) return;

        const userId = `User:${user.id}`;
        const currentUser = cache.readFragment<UserProfileFragment>({
          id: userId,
          fragment: USER_PROFILE_FRAGMENT,
          fragmentName: 'UserProfile',
        });

        if (!currentUser) return;

        const updatedCollections = currentUser.collections.map((collection) => {
          return {
            ...collection,
            pictures: collection.pictures.filter((pic) => {
              return pic.pictureId !== variables.pictureId;
            }),
          };
        });

        cache.writeFragment<UserProfileFragment>({
          id: userId,
          fragment: USER_PROFILE_FRAGMENT,
          data: {
            ...currentUser,
            collections: updatedCollections,
          },
          fragmentName: 'UserProfile',
        });
      } catch (error) {
        toast.error('Failed to update the cache. Refresh the browser');
      }
    },
  });
}
