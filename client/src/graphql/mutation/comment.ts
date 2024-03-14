import { gql } from '@apollo/client';

export const COMMENT_PICTURE_MUTATION = gql`
  mutation CommentPicture($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
    }
  }
`;
