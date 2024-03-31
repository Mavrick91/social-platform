import { gql } from '@apollo/client';
import { PICTURE_FRAGMENT } from '../queries/picture';

export const CREATE_COLLECTION_MUTATION = gql`
  mutation CreateCollection($name: String!) {
    createCollection(name: $name) {
      id
      name
      pictures {
        pictureId
      }
    }
  }

  ${PICTURE_FRAGMENT}
`;

export const ADD_PICTURE_TO_COLLECTION_MUTATION = gql`
  mutation AddPictureToCollection(
    $pictureId: [Float!]!
    $collectionId: Float!
  ) {
    addPictureToCollection(pictureId: $pictureId, collectionId: $collectionId) {
      collectionId
      pictureId
    }
  }
`;

export const REMOVE_PICTURE_TO_COLLECTION_MUTATION = gql`
  mutation RemovePictureFromCollection(
    $pictureId: Float!
    $collectionId: Float!
  ) {
    removePictureFromCollection(
      pictureId: $pictureId
      collectionId: $collectionId
    ) {
      collectionId
      pictureId
    }
  }
`;

export const DELETE_COLLECTION_MUTATION = gql`
  mutation DeleteCollection($collectionId: Float!) {
    deleteCollection(collectionId: $collectionId) {
      id
    }
  }
`;

export const UPDATE_NAME_COLLECTION_MUTATION = gql`
  mutation UpdateNameCollection($collectionId: Float!, $newName: String!) {
    updateNameCollection(collectionId: $collectionId, newName: $newName) {
      id
      name
    }
  }
`;
