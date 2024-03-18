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