import { PictureFragmentFragment } from '@/__generated__/graphql';
import ThumbnailGrid from '@/components/ThumbnailGrid';
import { GET_PICTURE_BY_USERNAME } from '@/graphql/queries/picture';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { useLoaderData } from 'react-router-dom';

export const loader = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  const { data, error } = await apolloClient.query({
    query: GET_PICTURE_BY_USERNAME,
  });

  if (error) {
    throw new Error('Failed to fetch pictures');
  }

  return data.picturesByUsername;
};

export default function Explore() {
  const pictures = useLoaderData() as PictureFragmentFragment[];
  console.log('🚀 ~ pictures:', pictures);

  return (
    <div className="flex flex-col max-w-lg-page mx-auto">
      <div className="px-5 pt-6">
        <ThumbnailGrid pictures={pictures} />
      </div>
    </div>
  );
}
