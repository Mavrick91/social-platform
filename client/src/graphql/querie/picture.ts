import { gql } from '@apollo/client';

export const GET_PICTURES = gql`
  query GetPictures {
    pictures {
      id
      title
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
      title
      description
      createdAt
      updatedAt
      fileUrl
    }
  }
`;
