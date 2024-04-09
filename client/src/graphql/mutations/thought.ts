import { gql } from '@apollo/client';

export const CREATE_THOUGHT_MUTATION = gql`
  mutation CreateThought($createThoughtInput: CreateThoughtInput!) {
    createThought(createThoughtInput: $createThoughtInput) {
      id
      content
      visibility
      createdAt
      user {
        id
        username
      }
    }
  }
`;

export const DELETE_THOUGHT_MUTATION = gql`
  mutation DeleteThought($id: Float!) {
    deleteThought(id: $id) {
      id
    }
  }
`;

export const UPDATE_THOUGHT_MUTATION = gql`
  mutation UpdateThought($updateThoughtInput: UpdateThoughtInput!) {
    updateThought(updateThoughtInput: $updateThoughtInput) {
      id
      content
    }
  }
`;
