/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CommentPicture($createCommentInput: CreateCommentInput!) {\n    createComment(createCommentInput: $createCommentInput) {\n      id\n    }\n  }\n": types.CommentPictureDocument,
    "\n  mutation UploadPicture($input: CreatePictureInput!) {\n    createPicture(input: $input) {\n      id\n    }\n  }\n": types.UploadPictureDocument,
    "\n  mutation UpdatePicture($id: Float!, $input: UpdatePictureInput!) {\n    updatePicture(id: $id, input: $input) {\n      id\n    }\n  }\n": types.UpdatePictureDocument,
    "\n  mutation DeletePicture($id: Float!) {\n    deletePicture(id: $id) {\n      id\n    }\n  }\n": types.DeletePictureDocument,
    "\n  mutation RegisterUser($createUserInput: CreateUserDto!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.RegisterUserDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n": types.LoginDocument,
    "\n  mutation UpdateUserProfile(\n    $userId: Float!\n    $updateUserInput: UpdateUserDto!\n  ) {\n    updateUser(userId: $userId, updateUserInput: $updateUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.UpdateUserProfileDocument,
    "\n  query GetCommentsByPicture($pictureId: Int!) {\n    commentsByPictureId(pictureId: $pictureId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n": types.GetCommentsByPictureDocument,
    "\n  query GetPictures {\n    pictures {\n      id\n      description\n      createdAt\n      updatedAt\n      fileUrl\n      author {\n        id\n        firstName\n        lastName\n      }\n      _count {\n        comments\n      }\n    }\n  }\n": types.GetPicturesDocument,
    "\n  query GetPictureByAuthor($authorId: Float) {\n    picturesByAuthor(authorId: $authorId) {\n      id\n      description\n      createdAt\n      updatedAt\n      fileUrl\n      author {\n        id\n        firstName\n        lastName\n      }\n      _count {\n        comments\n      }\n    }\n  }\n": types.GetPictureByAuthorDocument,
    "\n  query GetUserProfile($userId: Float!) {\n    user(userId: $userId) {\n      id\n      firstName\n      lastName\n      _count {\n        pictures\n      }\n    }\n  }\n": types.GetUserProfileDocument,
    "\n  query GetMockedUser {\n    mockedUser {\n      id\n      email\n    }\n  }\n": types.GetMockedUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CommentPicture($createCommentInput: CreateCommentInput!) {\n    createComment(createCommentInput: $createCommentInput) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CommentPicture($createCommentInput: CreateCommentInput!) {\n    createComment(createCommentInput: $createCommentInput) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UploadPicture($input: CreatePictureInput!) {\n    createPicture(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UploadPicture($input: CreatePictureInput!) {\n    createPicture(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdatePicture($id: Float!, $input: UpdatePictureInput!) {\n    updatePicture(id: $id, input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdatePicture($id: Float!, $input: UpdatePictureInput!) {\n    updatePicture(id: $id, input: $input) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePicture($id: Float!) {\n    deletePicture(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePicture($id: Float!) {\n    deletePicture(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RegisterUser($createUserInput: CreateUserDto!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation RegisterUser($createUserInput: CreateUserDto!) {\n    createUser(createUserInput: $createUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      accessToken\n      refreshToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserProfile(\n    $userId: Float!\n    $updateUserInput: UpdateUserDto!\n  ) {\n    updateUser(userId: $userId, updateUserInput: $updateUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserProfile(\n    $userId: Float!\n    $updateUserInput: UpdateUserDto!\n  ) {\n    updateUser(userId: $userId, updateUserInput: $updateUserInput) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCommentsByPicture($pictureId: Int!) {\n    commentsByPictureId(pictureId: $pictureId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCommentsByPicture($pictureId: Int!) {\n    commentsByPictureId(pictureId: $pictureId) {\n      id\n      content\n      createdAt\n      updatedAt\n      author {\n        id\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPictures {\n    pictures {\n      id\n      description\n      createdAt\n      updatedAt\n      fileUrl\n      author {\n        id\n        firstName\n        lastName\n      }\n      _count {\n        comments\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPictures {\n    pictures {\n      id\n      description\n      createdAt\n      updatedAt\n      fileUrl\n      author {\n        id\n        firstName\n        lastName\n      }\n      _count {\n        comments\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPictureByAuthor($authorId: Float) {\n    picturesByAuthor(authorId: $authorId) {\n      id\n      description\n      createdAt\n      updatedAt\n      fileUrl\n      author {\n        id\n        firstName\n        lastName\n      }\n      _count {\n        comments\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPictureByAuthor($authorId: Float) {\n    picturesByAuthor(authorId: $authorId) {\n      id\n      description\n      createdAt\n      updatedAt\n      fileUrl\n      author {\n        id\n        firstName\n        lastName\n      }\n      _count {\n        comments\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserProfile($userId: Float!) {\n    user(userId: $userId) {\n      id\n      firstName\n      lastName\n      _count {\n        pictures\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserProfile($userId: Float!) {\n    user(userId: $userId) {\n      id\n      firstName\n      lastName\n      _count {\n        pictures\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMockedUser {\n    mockedUser {\n      id\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetMockedUser {\n    mockedUser {\n      id\n      email\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;