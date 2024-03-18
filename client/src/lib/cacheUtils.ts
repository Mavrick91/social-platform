import { ApolloCache, gql } from '@apollo/client';
import { User } from '@/__generated__/graphql';
import { USER_PROFILE_FRAGMENT } from '@/graphql/queries/user';
import { GraphQLSchema } from 'graphql';

interface Count {
  pictures: number;
  followedBy: number;
}

export function updateUserCount(
  cache: ApolloCache<GraphQLSchema>,
  userId: number,
  countProperty: keyof Count,
  delta: number
): void {
  const user: User | null = cache.readFragment({
    id: `User:${userId}`,
    fragment: USER_PROFILE_FRAGMENT,
  });

  const count = user?._count as Count | undefined;
  const currentCount = count ? Number(count[countProperty]) : 0;

  cache.writeFragment({
    id: `User:${userId}`,
    fragment: gql`
      fragment NewCount on User {
        _count {
          ${countProperty}
        }
      }
    `,
    data: {
      _count: {
        [countProperty]: currentCount + delta,
      },
    },
  });
}

export function modifyCommentCount(
  cache: ApolloCache<GraphQLSchema>,
  pictureId: number,
  delta: number
) {
  cache.modify({
    id: `Picture:${pictureId}`,
    fields: {
      _count(existingCount = { comments: 0 }) {
        return { ...existingCount, comments: existingCount.comments + delta };
      },
    },
  });
}
