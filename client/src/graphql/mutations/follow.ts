import { gql } from '@apollo/client';

export const FOLLOW_USER = gql`
  mutation FollowUser($input: FollowDto!) {
    followUser(input: $input) {
      initiatorId
      targetUserId
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation UnfollowUser($input: UnfollowDto!) {
    unfollowUser(input: $input) {
      initiatorId
      targetUserId
    }
  }
`;
