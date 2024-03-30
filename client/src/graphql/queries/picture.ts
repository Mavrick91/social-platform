import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './user';

export const PICTURE_FRAGMENT = gql`
  fragment PictureFragment on Picture {
    id
    description
    createdAt
    updatedAt
    fileUrl
    user {
      ...UserFragment
    }
    likes {
      id
      userId
      pictureId
    }
    _count {
      comments
      likes
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_PICTURE_BY_USERNAME = gql`
  query GetPictureByUser($username: String) {
    picturesByUsername(username: $username) {
      ...PictureFragment
    }
  }
  ${PICTURE_FRAGMENT}
`;

export const GET_PICTURE_FROM_FOLLOWING = gql`
  query GetPicturesFromFollowing($userId: [Float!]!) {
    picturesFromFollowing(userId: $userId) {
      ...PictureFragment
    }
  }

  ${PICTURE_FRAGMENT}
`;
