import { PictureFragmentFragment } from '@/__generated__/graphql';
import { Pluralize } from '@/components/Pluralize';
import PostDetailsDialog from '@/components/PostDetailsDialog';
import useLikePicture from '@/hooks/graphql/useLikePicture';
import useUnLikePicture from '@/hooks/graphql/useUnLikePicture';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { BookmarkIcon, HeartIcon, MessageCircle, SendIcon } from 'lucide-react';

type Props = {
  picture: PictureFragmentFragment;
};

export default function PostPicture({ picture }: Props) {
  const { user } = useUserInfo();
  const likeId = picture.likes.find((like) => like.userId === user.id)?.id;

  const [likePicture] = useLikePicture(picture.id);
  const [unlikePicture] = useUnLikePicture(likeId!);

  const handleClickLikePicture = async () => {
    if (likeId) await unlikePicture();
    else await likePicture();
  };

  return (
    <div>
      <div className="mb-1">
        <img alt="picture" className="w-full" src={picture.fileUrl} />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 py-2">
          <button type="button" onClick={handleClickLikePicture}>
            <HeartIcon
              className="hover:text-gray-500"
              fill={!likeId ? 'none' : '#ff3041'}
              stroke={!likeId ? 'black' : '#ff3041'}
            />
          </button>
          <PostDetailsDialog picture={picture}>
            <MessageCircle className="hover:text-gray-500 cursor-pointer" />
          </PostDetailsDialog>
          <SendIcon className="hover:text-gray-500" />
        </div>
        <BookmarkIcon />
      </div>
      {picture._count?.likes ? (
        <p className="font-semibold text-sm">
          <Pluralize count={picture._count.likes} singular="like" />
        </p>
      ) : null}
    </div>
  );
}
