import { PictureFragmentFragment } from '@/__generated__/graphql';
import useAddPictureCollection from '@/hooks/graphql/useAddPictureCollection';
import useLikePicture from '@/hooks/graphql/useLikePicture';
import useRemovePictureCollection from '@/hooks/graphql/useRemovePictureCollection';
import useUnLikePicture from '@/hooks/graphql/useUnLikePicture';
import { BookmarkIcon, HeartIcon, MessageCircle, SendIcon } from 'lucide-react';
import PostDetailsDialog from '../PostDetailsDialog';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { Pluralize } from '../Pluralize';
import useGetPicturesFromSaved from '@/hooks/useGetPicturesFromSaved';

type Props = {
  picture: PictureFragmentFragment;
  showMessageIcon?: boolean;
};

export default function PostCTA({ picture, showMessageIcon = true }: Props) {
  const user = useUserInfo();
  const likeId = picture.likes.find((like) => like.userId === user.id)?.id;
  const picturesFromSaved = useGetPicturesFromSaved();
  const pictureInCollection = picturesFromSaved.pictures.find(
    (pic) => pic.pictureId === picture.id
  );
  const [likePicture] = useLikePicture(picture.id);
  const [unlikePicture] = useUnLikePicture(likeId!);
  const [addPictureToCollection] = useAddPictureCollection();
  const [removePictureFromCollection] = useRemovePictureCollection();

  const handleClickLikePicture = async () => {
    if (likeId) await unlikePicture();
    else await likePicture();
  };

  const handleClickAddToCollection = async () => {
    if (pictureInCollection)
      await removePictureFromCollection({
        variables: { pictureId: picture.id },
      });
    else
      await addPictureToCollection({
        variables: {
          pictureId: [picture.id],
          collectionId: Number(user.collections[0].id),
        },
      });
  };

  const renderLikeCount = () => {
    if (picture.hideLikesAndViewCounts) {
      if (picture.likes.some((like) => like.userId === user.id)) {
        return (
          <p className="text-sm">
            Liked by <b>{picture.user.username}</b>
            {picture.likes.length > 1 ? (
              <span>
                {' '}
                and <b>others</b>
              </span>
            ) : null}
          </p>
        );
      }

      if (picture.likes.length > 0) {
        const firstLiker = picture.likes[0].user;
        return (
          <p className="text-sm">
            Liked by <b>{firstLiker.username}</b>
            {picture.likes.length > 1 ? ' and others' : null}
          </p>
        );
      }

      return null;
    }

    if (picture._count?.likes) {
      return (
        <p className="font-semibold text-sm">
          <Pluralize count={picture._count.likes} singular="like" />
        </p>
      );
    }

    return (
      <p className="text-sm">
        Be the first one to{' '}
        <b>
          <button
            onClick={handleClickLikePicture}
            type="button"
            className="hover:text-secondary"
          >
            like this
          </button>
        </b>
      </p>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 py-2">
          <button
            className="hover:!text-secondary"
            type="button"
            onClick={handleClickLikePicture}
          >
            <HeartIcon
              fill={!likeId ? 'none' : '#ff3041'}
              stroke={!likeId ? 'black' : '#ff3041'}
            />
          </button>
          {showMessageIcon && (
            <PostDetailsDialog picture={picture}>
              <MessageCircle className="hover:text-secondary cursor-pointer" />
            </PostDetailsDialog>
          )}
          <SendIcon className="hover:text-secondary" />
        </div>
        <button onClick={handleClickAddToCollection}>
          <BookmarkIcon
            className="hover:text-secondary"
            fill={!pictureInCollection ? 'none' : 'black'}
            stroke={!pictureInCollection ? 'black' : 'none'}
          />
        </button>
      </div>
      {renderLikeCount()}
    </>
  );
}
