import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    avatar
  }
`;

export const INITIATED_FOLLOWS_FRAGMENT = gql`
  fragment InitiatedFollows on Follow {
    targetUserId
    targetUser {
      ...UserFragment
    }
    ${USER_FRAGMENT}

  }
`;

export const RECEIVED_FOLLOWS_FRAGMENT = gql`
  fragment ReceivedFollows on Follow {
    initiator {
      ...UserFragment
    }
    ${USER_FRAGMENT}

  }
`;

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    ...UserFragment
    initiatedFollows {
      ...InitiatedFollows
    }
    receivedFollows {
      ...ReceivedFollows
    }
    _count {
      pictures
      initiatedFollows
      receivedFollows
    }
  }
  ${INITIATED_FOLLOWS_FRAGMENT}
  ${RECEIVED_FOLLOWS_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const GET_USER_PROFILE = gql`
  query GetUserProfile($profileId: Float!) {
    user(profileId: $profileId) {
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
