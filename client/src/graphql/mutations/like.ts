import { gql } from '@apollo/client';
import { PICTURE_FRAGMENT } from '../queries/picture';

export const LIKE_PICTURE_MUTATION = gql`
  mutation LikePicture($pictureId: Float!) {
    likePicture(pictureId: $pictureId) {
      ...PictureFragment
    }
  }

  ${PICTURE_FRAGMENT}
`;

export const UNLIKE_PICTURE_MUTATION = gql`
  mutation UnlikePicture($likeId: Float!) {
    unlikePicture(likeId: $likeId) {
      ...PictureFragment
    }
  }

  ${PICTURE_FRAGMENT}
`;
