import { gql } from '@apollo/client';
import { MESSAGE_FRAGMENT } from '@/graphql/mutations/message.ts';

const THREAD_USER = gql`
  fragment ThreadUser on User {
    id
    firstName
    lastName
    avatar
    username
  }
`;

export const GET_THREAD_QUERY = gql`
  query GetThread($id: Float!) {
    thread(id: $id) {
      id
      createdAt
      updatedAt
      users {
        ...ThreadUser
      }
      messages {
        ...ThreadMessage
      }
    }
  }
  ${MESSAGE_FRAGMENT}
  ${THREAD_USER}
`;

export const GET_THREADS_BY_USER_ID_QUERY = gql`
  query GetThreadsByUserId($userId: Float!) {
    threadsByUserId(userId: $userId) {
      id
      createdAt
      updatedAt
      users {
        id
        firstName
        lastName
        avatar
        username
      }
      messages {
        ...ThreadMessage
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;
