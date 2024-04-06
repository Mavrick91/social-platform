import { gql } from '@apollo/client';
import { NOTIFICATION_FRAGMENT } from '../queries/notification';

export const NOTIFICATION_ADDED_SUBSCRIPTION = gql`
  subscription NotificationAdded($userId: Int!) {
    notificationAdded(userId: $userId) {
      ...NotificationFragment
    }
  }

  ${NOTIFICATION_FRAGMENT}
`;
