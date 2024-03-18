import { gql } from '@apollo/client';

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    id
    firstName
    lastName
    _count {
      pictures
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: Float!) {
    user(userId: $userId) {
      ...UserProfile
    }
  }
  ${USER_PROFILE_FRAGMENT}
`;

export const GET_MOCKED_USER = gql`
  query GetMockedUser {
    mockedUser {
      id
      email
    }
  }
`;
