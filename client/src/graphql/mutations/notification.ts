import { gql } from '@apollo/client';

export const MARK_NOTIFICATIONS_AS_READ = gql`
  mutation MarkNotificationsAsRead($notificationIds: [Int!]!) {
    markNotificationsAsRead(notificationIds: $notificationIds) {
      id
      read
    }
  }
`;
