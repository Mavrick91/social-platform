import { PictureFragmentFragment } from '@/__generated__/graphql';
import PostCTA from '@/components/PostCTA';
import { Separator } from '@/components/ui/separator';
import PostAddComment from './PostAddComment';
import PostCaption from './PostCaption';
import PostComments from './PostComments';
import PostHeader from './PostHeader';
import PostPicture from './PostPicture';

type Props = {
  picture: PictureFragmentFragment;
};

export default function PostItem({ picture }: Props) {
  return (
    <div className="max-w-lg mx-auto">
      <PostHeader
        avatar={picture.user?.avatar}
        username={picture.user.username}
        picture={picture}
      />
      <PostPicture picture={picture} />
      <PostCTA picture={picture} />
      <PostCaption
        description={picture.description}
        firstName={picture.user?.firstName}
        lastName={picture.user?.lastName}
      />
      <PostComments commentCount={picture._count.comments} picture={picture} />
      <PostAddComment pictureId={picture.id} />
      <Separator className="mt-4 mb-5 last:border-red-500" />
    </div>
  );
}
