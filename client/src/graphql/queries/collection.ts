import { gql } from '@apollo/client';
import { PICTURE_FRAGMENT } from './picture';

export const GET_COLLECTION = gql`
  query GetCollection($collectionName: String!) {
    getCollection(collectionName: $collectionName) {
      id
      name
      isDefault
      pictures {
        picture {
          ...PictureFragment
        }
      }
    }
  }

  ${PICTURE_FRAGMENT}
`;
