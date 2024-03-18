import { gql } from '@/__generated__/gql';

export const GET_PICTURES = gql(`
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
      _count {
        comments
      }
    }
  }
`);

export const GET_PICTURE_BY_AUTHOR = gql(`
  query GetPictureByAuthor($authorId: Float) {
    picturesByAuthor(authorId: $authorId) {
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
      _count {
        comments
      }
    }
  }
`);
