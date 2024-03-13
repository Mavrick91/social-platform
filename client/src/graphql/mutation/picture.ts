import { gql } from '@apollo/client';

export const UPLOAD_PICTURE_MUTATION = gql`
  mutation UploadPicture($input: CreatePictureInput!) {
    createPicture(input: $input) {
      id
    }
  }
`;
