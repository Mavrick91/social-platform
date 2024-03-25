import { useGetPictureByAuthorQuery } from '@/__generated__/graphql';
import PostProfileItem from './PostProfileItem';
import Loading from './loading';

type Props = {
  profileId?: number;
};
function PostProfile({ profileId }: Props) {
  const { data, loading } = useGetPictureByAuthorQuery({
    variables: { authorId: profileId },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div className="grid w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-4">
        {data && !loading
          ? data.picturesByAuthor.map((picture) => (
              <PostProfileItem picture={picture} key={picture.id} />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <Loading key={index} />
            ))}
      </div>
    </>
  );
}

export default PostProfile;
