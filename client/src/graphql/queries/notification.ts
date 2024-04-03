import { gql } from '@apollo/client';

export const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationFragment on Notification {
    id
    type
    sender {
      id
      username
      avatar
    }
    picture {
      altText
      sizes {
        small
      }
    }
    comment {
      content
    }
    pictureId
    commentId
    read
    createdAt
    updatedAt
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications {
      ...NotificationFragment
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;
