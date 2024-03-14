import { gql } from '@apollo/client';

export const GET_PICTURES = gql`
  query GetPictures {
    pictures {
      id
      description
      createdAt
      updatedAt
      fileUrl
      author {
        id
        firstName
        lastName
      }
      comments {
        id
      }
    }
  }
`;

export const GET_PICTURE_BY_AUTHOR = gql`
  query GetPictureByAuthor($authorId: Float!) {
    picturesByAuthor(authorId: $authorId) {
      id
      description
      createdAt
      updatedAt
      fileUrl
    }
  }
`;
