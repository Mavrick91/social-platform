import { gql } from '@apollo/client';

export const MESSAGE_ADDED_SUBSCRIPTION = gql`
  subscription MessageAdded($threadId: Float!) {
    messageAdded(threadId: $threadId) {
      id
      content
      createdAt
      user {
        id
      }
    }
  }
`;
