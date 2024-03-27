import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
  query GetCollections($userId: Float!) {
    getCollectionsByUser(userId: $userId) {
      id
      name
      pictures {
        picture {
          id
          fileUrl
        }
      }
    }
  }
`;
