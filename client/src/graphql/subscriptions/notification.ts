import { gql } from '@apollo/client';

export const NOTIFICATION_ADDED_SUBSCRIPTION = gql`
  subscription NotificationAdded {
    notificationAdded {
      id
      type
      senderId
      receiverId
      pictureId
      commentId
      read
      createdAt
      updatedAt
    }
  }
`;
