import { gql } from '@apollo/client';
import { USER_FRAGMENT } from './user';

export const PICTURE_FRAGMENT = gql`
  fragment PictureFragment on Picture {
    id
    description
    createdAt
    updatedAt
    fileUrl
    author {
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

export const GET_PICTURE_BY_AUTHOR = gql`
  query GetPictureByAuthor($authorId: Float) {
    picturesByAuthor(authorId: $authorId) {
      ...PictureFragment
    }
  }
  ${PICTURE_FRAGMENT}
`;

export const GET_PICTURE_FROM_FOLLOWING = gql`
  query GetPicturesFromFollowing($authorId: [Float!]!) {
    picturesFromFollowing(authorId: $authorId) {
      ...PictureFragment
    }
  }

  ${PICTURE_FRAGMENT}
`;
