import { gql } from '@apollo/client';

export const CREATE_THREAD_MUTATION = gql`
  mutation CreateThread($createThreadInput: CreateThreadInput!) {
    createThread(createThreadInput: $createThreadInput) {
      id
      createdAt
      updatedAt
      users {
        id
        username
      }
    }
  }
`;
