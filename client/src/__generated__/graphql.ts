import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  /** The user who created the comment */
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['Int']['output']>;
  /** The content of the comment */
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The unique identifier of the comment */
  id: Scalars['Int']['output'];
  /** The picture the comment belongs to */
  picture?: Maybe<Picture>;
  pictureId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type CreateCommentInput = {
  /** The ID of the user who created the comment */
  authorId: Scalars['Int']['input'];
  /** The content of the comment */
  content: Scalars['String']['input'];
  /** The ID of the picture the comment belongs to */
  pictureId: Scalars['Int']['input'];
};

export type CreatePictureInput = {
  authorId: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fileName: Scalars['String']['input'];
  fileUrl: Scalars['String']['input'];
};

export type CreateUserDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Follow = {
  __typename?: 'Follow';
  initiator?: Maybe<User>;
  initiatorId?: Maybe<Scalars['Float']['output']>;
  targetUser?: Maybe<User>;
  targetUserId?: Maybe<Scalars['Float']['output']>;
};

export type FollowDto = {
  followingId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPicture: Picture;
  createUser: User;
  deletePicture: Picture;
  followUser: Follow;
  login: LoginResponse;
  removeComment: Comment;
  unfollowUser: Follow;
  updateComment: Comment;
  updatePicture: Picture;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreatePictureArgs = {
  input: CreatePictureInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};


export type MutationDeletePictureArgs = {
  id: Scalars['Float']['input'];
};


export type MutationFollowUserArgs = {
  input: FollowDto;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUnfollowUserArgs = {
  input: UnfollowDto;
};


export type MutationUpdateCommentArgs = {
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdatePictureArgs = {
  id: Scalars['Float']['input'];
  input: UpdatePictureInput;
};


export type MutationUpdateUserArgs = {
  profileId: Scalars['Float']['input'];
  updateUserInput: UpdateUserDto;
};

export type Picture = {
  __typename?: 'Picture';
  _count?: Maybe<PictureCount>;
  author?: Maybe<User>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  fileUrl: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PictureCount = {
  __typename?: 'PictureCount';
  comments: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  commentsByPictureId: Array<Comment>;
  mockedUser: Array<User>;
  picture: Picture;
  pictures: Array<Picture>;
  picturesByAuthor: Array<Picture>;
  user: User;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCommentsByPictureIdArgs = {
  pictureId: Scalars['Int']['input'];
};


export type QueryPictureArgs = {
  id: Scalars['Float']['input'];
};


export type QueryPicturesByAuthorArgs = {
  authorId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryUserArgs = {
  profileId: Scalars['Float']['input'];
};

export type UnfollowDto = {
  followingId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type UpdateCommentInput = {
  /** The ID of the user who created the comment */
  authorId?: InputMaybe<Scalars['Int']['input']>;
  /** The content of the comment */
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** The ID of the picture the comment belongs to */
  pictureId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePictureInput = {
  authorId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  avatar?: Maybe<Scalars['String']['output']>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  initiatedFollows: Array<Follow>;
  isMocked: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  pictures: Array<Picture>;
  receivedFollows: Array<Follow>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  initiatedFollows: Scalars['Int']['output'];
  pictures: Scalars['Int']['output'];
  receivedFollows: Scalars['Int']['output'];
};

export type CommentPictureMutationVariables = Exact<{
  createCommentInput: CreateCommentInput;
}>;


export type CommentPictureMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, pictureId?: number | null } };

export type FollowUserMutationVariables = Exact<{
  input: FollowDto;
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'Follow', initiatorId?: number | null, targetUserId?: number | null } };

export type UnfollowUserMutationVariables = Exact<{
  input: UnfollowDto;
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: { __typename?: 'Follow', initiatorId?: number | null, targetUserId?: number | null } };

export type UploadPictureMutationVariables = Exact<{
  input: CreatePictureInput;
}>;


export type UploadPictureMutation = { __typename?: 'Mutation', createPicture: { __typename?: 'Picture', id: number } };

export type UpdatePictureMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  input: UpdatePictureInput;
}>;


export type UpdatePictureMutation = { __typename?: 'Mutation', updatePicture: { __typename?: 'Picture', id: number, description?: string | null } };

export type DeletePictureMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePictureMutation = { __typename?: 'Mutation', deletePicture: { __typename?: 'Picture', id: number } };

export type RegisterUserMutationVariables = Exact<{
  createUserInput: CreateUserDto;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, refreshToken: string } };

export type UpdateUserProfileMutationVariables = Exact<{
  profileId: Scalars['Float']['input'];
  updateUserInput: UpdateUserDto;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string } };

export type GetCommentsByPictureQueryVariables = Exact<{
  pictureId: Scalars['Int']['input'];
}>;


export type GetCommentsByPictureQuery = { __typename?: 'Query', commentsByPictureId: Array<{ __typename?: 'Comment', id: number, content: string, createdAt?: any | null, updatedAt?: any | null, author?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null }> };

export type PictureFragmentFragment = { __typename?: 'Picture', id: number, description?: string | null, createdAt: any, updatedAt: any, fileUrl: string, author?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null, _count?: { __typename?: 'PictureCount', comments: number } | null };

export type GetPictureByAuthorQueryVariables = Exact<{
  authorId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetPictureByAuthorQuery = { __typename?: 'Query', picturesByAuthor: Array<{ __typename?: 'Picture', id: number, description?: string | null, createdAt: any, updatedAt: any, fileUrl: string, author?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null, _count?: { __typename?: 'PictureCount', comments: number } | null }> };

export type UserFragmentFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null };

export type InitiatedFollowsFragment = { __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null };

export type ReceivedFollowsFragment = { __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null };

export type UserProfileFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null, initiatedFollows: Array<{ __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null }>, receivedFollows: Array<{ __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null }>, _count: { __typename?: 'UserCount', pictures: number, initiatedFollows: number, receivedFollows: number } };

export type GetUserProfileQueryVariables = Exact<{
  profileId: Scalars['Float']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null, initiatedFollows: Array<{ __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null }>, receivedFollows: Array<{ __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null } | null }>, _count: { __typename?: 'UserCount', pictures: number, initiatedFollows: number, receivedFollows: number } } };

export type GetMockedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMockedUserQuery = { __typename?: 'Query', mockedUser: Array<{ __typename?: 'User', id: number, email: string }> };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  firstName
  lastName
  avatar
}
    `;
export const PictureFragmentFragmentDoc = gql`
    fragment PictureFragment on Picture {
  id
  description
  createdAt
  updatedAt
  fileUrl
  author {
    ...UserFragment
  }
  _count {
    comments
  }
}
    ${UserFragmentFragmentDoc}`;
export const InitiatedFollowsFragmentDoc = gql`
    fragment InitiatedFollows on Follow {
  targetUserId
  targetUser {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const ReceivedFollowsFragmentDoc = gql`
    fragment ReceivedFollows on Follow {
  initiator {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on User {
  ...UserFragment
  initiatedFollows {
    ...InitiatedFollows
  }
  receivedFollows {
    ...ReceivedFollows
  }
  _count {
    pictures
    initiatedFollows
    receivedFollows
  }
}
    ${UserFragmentFragmentDoc}
${InitiatedFollowsFragmentDoc}
${ReceivedFollowsFragmentDoc}`;
export const CommentPictureDocument = gql`
    mutation CommentPicture($createCommentInput: CreateCommentInput!) {
  createComment(createCommentInput: $createCommentInput) {
    id
    pictureId
  }
}
    `;
export type CommentPictureMutationFn = Apollo.MutationFunction<CommentPictureMutation, CommentPictureMutationVariables>;

/**
 * __useCommentPictureMutation__
 *
 * To run a mutation, you first call `useCommentPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentPictureMutation, { data, loading, error }] = useCommentPictureMutation({
 *   variables: {
 *      createCommentInput: // value for 'createCommentInput'
 *   },
 * });
 */
export function useCommentPictureMutation(baseOptions?: Apollo.MutationHookOptions<CommentPictureMutation, CommentPictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentPictureMutation, CommentPictureMutationVariables>(CommentPictureDocument, options);
      }
export type CommentPictureMutationHookResult = ReturnType<typeof useCommentPictureMutation>;
export type CommentPictureMutationResult = Apollo.MutationResult<CommentPictureMutation>;
export type CommentPictureMutationOptions = Apollo.BaseMutationOptions<CommentPictureMutation, CommentPictureMutationVariables>;
export const FollowUserDocument = gql`
    mutation FollowUser($input: FollowDto!) {
  followUser(input: $input) {
    initiatorId
    targetUserId
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation UnfollowUser($input: UnfollowDto!) {
  unfollowUser(input: $input) {
    initiatorId
    targetUserId
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const UploadPictureDocument = gql`
    mutation UploadPicture($input: CreatePictureInput!) {
  createPicture(input: $input) {
    id
  }
}
    `;
export type UploadPictureMutationFn = Apollo.MutationFunction<UploadPictureMutation, UploadPictureMutationVariables>;

/**
 * __useUploadPictureMutation__
 *
 * To run a mutation, you first call `useUploadPictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPictureMutation, { data, loading, error }] = useUploadPictureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadPictureMutation(baseOptions?: Apollo.MutationHookOptions<UploadPictureMutation, UploadPictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPictureMutation, UploadPictureMutationVariables>(UploadPictureDocument, options);
      }
export type UploadPictureMutationHookResult = ReturnType<typeof useUploadPictureMutation>;
export type UploadPictureMutationResult = Apollo.MutationResult<UploadPictureMutation>;
export type UploadPictureMutationOptions = Apollo.BaseMutationOptions<UploadPictureMutation, UploadPictureMutationVariables>;
export const UpdatePictureDocument = gql`
    mutation UpdatePicture($id: Float!, $input: UpdatePictureInput!) {
  updatePicture(id: $id, input: $input) {
    id
    description
  }
}
    `;
export type UpdatePictureMutationFn = Apollo.MutationFunction<UpdatePictureMutation, UpdatePictureMutationVariables>;

/**
 * __useUpdatePictureMutation__
 *
 * To run a mutation, you first call `useUpdatePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePictureMutation, { data, loading, error }] = useUpdatePictureMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePictureMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePictureMutation, UpdatePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePictureMutation, UpdatePictureMutationVariables>(UpdatePictureDocument, options);
      }
export type UpdatePictureMutationHookResult = ReturnType<typeof useUpdatePictureMutation>;
export type UpdatePictureMutationResult = Apollo.MutationResult<UpdatePictureMutation>;
export type UpdatePictureMutationOptions = Apollo.BaseMutationOptions<UpdatePictureMutation, UpdatePictureMutationVariables>;
export const DeletePictureDocument = gql`
    mutation DeletePicture($id: Float!) {
  deletePicture(id: $id) {
    id
  }
}
    `;
export type DeletePictureMutationFn = Apollo.MutationFunction<DeletePictureMutation, DeletePictureMutationVariables>;

/**
 * __useDeletePictureMutation__
 *
 * To run a mutation, you first call `useDeletePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePictureMutation, { data, loading, error }] = useDeletePictureMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePictureMutation(baseOptions?: Apollo.MutationHookOptions<DeletePictureMutation, DeletePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePictureMutation, DeletePictureMutationVariables>(DeletePictureDocument, options);
      }
export type DeletePictureMutationHookResult = ReturnType<typeof useDeletePictureMutation>;
export type DeletePictureMutationResult = Apollo.MutationResult<DeletePictureMutation>;
export type DeletePictureMutationOptions = Apollo.BaseMutationOptions<DeletePictureMutation, DeletePictureMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($createUserInput: CreateUserDto!) {
  createUser(createUserInput: $createUserInput) {
    id
    email
    firstName
    lastName
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const UpdateUserProfileDocument = gql`
    mutation UpdateUserProfile($profileId: Float!, $updateUserInput: UpdateUserDto!) {
  updateUser(profileId: $profileId, updateUserInput: $updateUserInput) {
    id
    email
    firstName
    lastName
  }
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const GetCommentsByPictureDocument = gql`
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

/**
 * __useGetCommentsByPictureQuery__
 *
 * To run a query within a React component, call `useGetCommentsByPictureQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByPictureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByPictureQuery({
 *   variables: {
 *      pictureId: // value for 'pictureId'
 *   },
 * });
 */
export function useGetCommentsByPictureQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsByPictureQuery, GetCommentsByPictureQueryVariables> & ({ variables: GetCommentsByPictureQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsByPictureQuery, GetCommentsByPictureQueryVariables>(GetCommentsByPictureDocument, options);
      }
export function useGetCommentsByPictureLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByPictureQuery, GetCommentsByPictureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsByPictureQuery, GetCommentsByPictureQueryVariables>(GetCommentsByPictureDocument, options);
        }
export function useGetCommentsByPictureSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCommentsByPictureQuery, GetCommentsByPictureQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentsByPictureQuery, GetCommentsByPictureQueryVariables>(GetCommentsByPictureDocument, options);
        }
export type GetCommentsByPictureQueryHookResult = ReturnType<typeof useGetCommentsByPictureQuery>;
export type GetCommentsByPictureLazyQueryHookResult = ReturnType<typeof useGetCommentsByPictureLazyQuery>;
export type GetCommentsByPictureSuspenseQueryHookResult = ReturnType<typeof useGetCommentsByPictureSuspenseQuery>;
export type GetCommentsByPictureQueryResult = Apollo.QueryResult<GetCommentsByPictureQuery, GetCommentsByPictureQueryVariables>;
export const GetPictureByAuthorDocument = gql`
    query GetPictureByAuthor($authorId: Float) {
  picturesByAuthor(authorId: $authorId) {
    ...PictureFragment
  }
}
    ${PictureFragmentFragmentDoc}`;

/**
 * __useGetPictureByAuthorQuery__
 *
 * To run a query within a React component, call `useGetPictureByAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPictureByAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPictureByAuthorQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetPictureByAuthorQuery(baseOptions?: Apollo.QueryHookOptions<GetPictureByAuthorQuery, GetPictureByAuthorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPictureByAuthorQuery, GetPictureByAuthorQueryVariables>(GetPictureByAuthorDocument, options);
      }
export function useGetPictureByAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPictureByAuthorQuery, GetPictureByAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPictureByAuthorQuery, GetPictureByAuthorQueryVariables>(GetPictureByAuthorDocument, options);
        }
export function useGetPictureByAuthorSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPictureByAuthorQuery, GetPictureByAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPictureByAuthorQuery, GetPictureByAuthorQueryVariables>(GetPictureByAuthorDocument, options);
        }
export type GetPictureByAuthorQueryHookResult = ReturnType<typeof useGetPictureByAuthorQuery>;
export type GetPictureByAuthorLazyQueryHookResult = ReturnType<typeof useGetPictureByAuthorLazyQuery>;
export type GetPictureByAuthorSuspenseQueryHookResult = ReturnType<typeof useGetPictureByAuthorSuspenseQuery>;
export type GetPictureByAuthorQueryResult = Apollo.QueryResult<GetPictureByAuthorQuery, GetPictureByAuthorQueryVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile($profileId: Float!) {
  user(profileId: $profileId) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;

/**
 * __useGetUserProfileQuery__
 *
 * To run a query within a React component, call `useGetUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProfileQuery({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useGetUserProfileQuery(baseOptions: Apollo.QueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables> & ({ variables: GetUserProfileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
      }
export function useGetUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export function useGetUserProfileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUserProfileQuery, GetUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserProfileQuery, GetUserProfileQueryVariables>(GetUserProfileDocument, options);
        }
export type GetUserProfileQueryHookResult = ReturnType<typeof useGetUserProfileQuery>;
export type GetUserProfileLazyQueryHookResult = ReturnType<typeof useGetUserProfileLazyQuery>;
export type GetUserProfileSuspenseQueryHookResult = ReturnType<typeof useGetUserProfileSuspenseQuery>;
export type GetUserProfileQueryResult = Apollo.QueryResult<GetUserProfileQuery, GetUserProfileQueryVariables>;
export const GetMockedUserDocument = gql`
    query GetMockedUser {
  mockedUser {
    id
    email
  }
}
    `;

/**
 * __useGetMockedUserQuery__
 *
 * To run a query within a React component, call `useGetMockedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMockedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMockedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMockedUserQuery(baseOptions?: Apollo.QueryHookOptions<GetMockedUserQuery, GetMockedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMockedUserQuery, GetMockedUserQueryVariables>(GetMockedUserDocument, options);
      }
export function useGetMockedUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMockedUserQuery, GetMockedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMockedUserQuery, GetMockedUserQueryVariables>(GetMockedUserDocument, options);
        }
export function useGetMockedUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetMockedUserQuery, GetMockedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMockedUserQuery, GetMockedUserQueryVariables>(GetMockedUserDocument, options);
        }
export type GetMockedUserQueryHookResult = ReturnType<typeof useGetMockedUserQuery>;
export type GetMockedUserLazyQueryHookResult = ReturnType<typeof useGetMockedUserLazyQuery>;
export type GetMockedUserSuspenseQueryHookResult = ReturnType<typeof useGetMockedUserSuspenseQuery>;
export type GetMockedUserQueryResult = Apollo.QueryResult<GetMockedUserQuery, GetMockedUserQueryVariables>;