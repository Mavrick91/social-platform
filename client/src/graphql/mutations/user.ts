import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation RegisterUser($createUserInput: CreateUserDto!) {
    createUser(createUserInput: $createUserInput) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile(
    $username: String!
    $updateUserInput: UpdateUserDto!
  ) {
    updateUser(username: $username, updateUserInput: $updateUserInput) {
      id
      email
      firstName
      lastName
      avatar
      bio
    }
  }
`;
