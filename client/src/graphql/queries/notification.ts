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
    read
    createdAt
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($page: Int!, $limit: Int!) {
    notifications(page: $page, limit: $limit) {
      notifications {
        ...NotificationFragment
      }
      totalCount
      totalPages
      currentPage
    }
  }

  ${NOTIFICATION_FRAGMENT}
`;
