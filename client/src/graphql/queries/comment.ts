import { gql } from '@apollo/client';

export const GET_COMMENTS_BY_PICTURE = gql`
  query GetCommentsByPicture($pictureId: Int!) {
    commentsByPictureId(pictureId: $pictureId) {
      id
      content
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        avatar
        username
      }
    }
  }
`;
