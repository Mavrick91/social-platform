import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    username
    avatar
    bio
  }
`;

export const COLLECTION_FRAGMENT = gql`
  fragment CollectionFragment on Collection {
    id
    name
    pictures {
      pictureId
      picture {
        fileUrl
      }
    }
  }
`;

export const INITIATED_FOLLOWS_FRAGMENT = gql`
  fragment InitiatedFollows on Follow {
    targetUserId
    targetUser {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const RECEIVED_FOLLOWS_FRAGMENT = gql`
  fragment ReceivedFollows on Follow {
    initiator {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
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
    collections {
      ...CollectionFragment
    }

    _count {
      pictures
      initiatedFollows
      receivedFollows
    }
  }
  ${INITIATED_FOLLOWS_FRAGMENT}
  ${RECEIVED_FOLLOWS_FRAGMENT}
  ${COLLECTION_FRAGMENT}
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

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_USERS_BY_USERNAME = gql`
  query GetUsersByUsername($username: String!) {
    usersByUsername(username: $username) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_MOCKED_USER = gql`
  query GetMockedUser {
    mockedUser {
      id
      email
    }
  }
`;
