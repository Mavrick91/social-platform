import { gql } from '@apollo/client';

export const GET_COMMENTS_BY_PICTURE = gql`
  query GetCommentsByPicture($pictureId: Int!) {
    commentsByPictureId(pictureId: $pictureId) {
      id
      content
      createdAt
      updatedAt
      author {
        id
        firstName
        lastName
      }
    }
  }
`;
