import { ApolloCache, gql } from '@apollo/client';
import { User } from '@/__generated__/graphql';
import { USER_PROFILE_FRAGMENT } from '@/graphql/queries/user';
import { GraphQLSchema } from 'graphql';

interface Count {
  pictures: number;
}

export function updateUserCount(
  cache: ApolloCache<GraphQLSchema>,
  userId: number,
  delta: number
): void {
  const user: User | null = cache.readFragment({
    id: `User:${userId}`,
    fragment: USER_PROFILE_FRAGMENT,
  });

  const count = user?._count as Count | undefined;
  const pictureCount = count?.pictures ? Number(count.pictures) : 0;

  cache.writeFragment({
    id: `User:${userId}`,
    fragment: gql`
      fragment NewCount on User {
        _count {
          pictures
        }
      }
    `,
    data: {
      _count: {
        pictures: pictureCount + delta, // add the delta to the picture count
      },
    },
  });
}
