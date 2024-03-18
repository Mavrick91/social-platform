import { gql } from '@/__generated__/gql';

export const GET_USER_PROFILE = gql(`
  query GetUserProfile($userId: Float!) {
    user(userId: $userId) {
      id
      firstName
      lastName
      _count {
        pictures
      }
    }
  }
`);

export const GET_MOCKED_USER = gql(`
  query GetMockedUser {
    mockedUser {
      id
      email
    }
  }
`);
