import { gql } from '@apollo/client';

export const PICTURE_FRAGMENT = gql`
  fragment PictureFragment on Picture {
    id
    fileName
    description
    createdAt
    updatedAt
    hideLikesAndViewCounts
    disableComments
    sizes {
      thumbnail
      original
      medium
    }
    altText
    user {
      id
      firstName
      lastName
      username
      avatar
      bio
    }
    likes {
      id
      userId
      pictureId
      user {
        id
        username
      }
    }
    _count {
      comments
      likes
    }
  }
`;

export const GET_PICTURE_BY_USERNAME = gql`
  query GetPictureByUsername($username: String) {
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
