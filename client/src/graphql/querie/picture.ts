import { gql } from '@apollo/client';

export const GET_PICTURES = gql`
  query GetPictures {
    pictures {
      id
      title
      description
      createdAt
      updatedAt
      data
      author {
        id
        firstName
        lastName
      }
    }
  }
`;
