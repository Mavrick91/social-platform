import { gql } from '@apollo/client';

export const UPLOAD_PICTURE_MUTATION = gql`
  mutation UploadPicture($input: CreatePictureInput!) {
    createPicture(input: $input) {
      id
    }
  }
`;

export const UPDATE_PICTURE_MUTATION = gql`
  mutation UpdatePicture($id: Float!, $input: UpdatePictureInput!) {
    updatePicture(id: $id, input: $input) {
      id
      description
      altText
      disableComments
      hideLikesAndViewCounts
    }
  }
`;

export const DELETE_PICTURE_MUTATION = gql`
  mutation DeletePicture($id: Float!) {
    deletePicture(id: $id) {
      id
    }
  }
`;
