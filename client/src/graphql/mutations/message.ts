import { gql } from '@apollo/client';

export const MESSAGE_FRAGMENT = gql`
  fragment ThreadMessage on Message {
    id
    content
    createdAt
    user {
      id
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      id
      content
      createdAt
      updatedAt
      user {
        id
      }
      thread {
        messages {
          ...ThreadMessage
        }
      }
    }
  }

  ${MESSAGE_FRAGMENT}
`;
