import { produce } from 'immer';
import {
  UserProfileFragment,
  useAddPictureToCollectionMutation,
} from '@/__generated__/graphql';
import { USER_PROFILE_FRAGMENT } from '@/graphql/queries/user';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { toast } from 'react-toastify';

export default function useAddPictureCollection() {
  const { user } = useUserInfo();

  return useAddPictureToCollectionMutation({
    update(cache, { data }, { variables }) {
      try {
        if (!data?.addPictureToCollection || !variables) return;

        const userId = `User:${user.id}`;
        const currentUser = cache.readFragment<UserProfileFragment>({
          id: userId,
          fragment: USER_PROFILE_FRAGMENT,
          fragmentName: 'UserProfile',
        });

        if (!currentUser) return;

        const nextUser = produce(currentUser, (draft: UserProfileFragment) => {
          const collectionIndex = draft.collections.findIndex(
            (collection: { id: string | number }) =>
              Number(collection.id) === variables.collectionId
          );

          if (collectionIndex !== -1) {
            const newPictures = data.addPictureToCollection.map((picture) => ({
              pictureId: picture.pictureId,
              __typename: 'PictureOnCollection',
            }));

            draft.collections[collectionIndex].pictures.push(...newPictures);
          }
        });

        cache.writeFragment<UserProfileFragment>({
          id: userId,
          fragment: USER_PROFILE_FRAGMENT,
          data: nextUser,
          fragmentName: 'UserProfile',
        });
      } catch (error) {
        toast.error('Failed to update the cache. Refresh the browser');
      }
    },
  });
}
