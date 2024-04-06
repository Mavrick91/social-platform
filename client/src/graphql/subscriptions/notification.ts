import { gql } from '@apollo/client';

export const NOTIFICATION_ADDED_SUBSCRIPTION = gql`
  subscription NotificationAdded($userId: Int!) {
    notificationAdded(userId: $userId) {
      id
      type
    }
  }
`;
