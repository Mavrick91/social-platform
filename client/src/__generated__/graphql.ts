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

export type Collection = {
  __typename?: 'Collection';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pictures: Array<PictureOnCollection>;
  user: User;
  userId: Scalars['Int']['output'];
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
  username: Scalars['String']['input'];
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

export type Like = {
  __typename?: 'Like';
  id: Scalars['Float']['output'];
  picture: Picture;
  pictureId: Scalars['Float']['output'];
  user: User;
  userId: Scalars['Float']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPictureToCollection: Array<PictureOnCollection>;
  createCollection: Collection;
  createComment: Comment;
  createPicture: Picture;
  createUser: User;
  deleteAllCollectionsForUser: Collection;
  deleteCollection: Collection;
  deletePicture: Picture;
  followUser: Follow;
  likePicture: Picture;
  login: LoginResponse;
  removeComment: Comment;
  removePictureFromCollection: PictureOnCollection;
  unfollowUser: Follow;
  unlikePicture: Picture;
  updateComment: Comment;
  updatePicture: Picture;
  updateUser: User;
};


export type MutationAddPictureToCollectionArgs = {
  collectionId: Scalars['Float']['input'];
  pictureId: Array<Scalars['Float']['input']>;
};


export type MutationCreateCollectionArgs = {
  name: Scalars['String']['input'];
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


export type MutationDeleteAllCollectionsForUserArgs = {
  userId: Scalars['Float']['input'];
};


export type MutationDeleteCollectionArgs = {
  collectionId: Scalars['Float']['input'];
};


export type MutationDeletePictureArgs = {
  id: Scalars['Float']['input'];
};


export type MutationFollowUserArgs = {
  input: FollowDto;
};


export type MutationLikePictureArgs = {
  pictureId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePictureFromCollectionArgs = {
  collectionId: Scalars['Float']['input'];
  pictureId: Scalars['Float']['input'];
};


export type MutationUnfollowUserArgs = {
  input: UnfollowDto;
};


export type MutationUnlikePictureArgs = {
  likeId: Scalars['Float']['input'];
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
  _count: PictureCount;
  author: User;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  fileUrl: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  likes: Array<Like>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PictureCount = {
  __typename?: 'PictureCount';
  comments: Scalars['Int']['output'];
  likes: Scalars['Int']['output'];
};

export type PictureOnCollection = {
  __typename?: 'PictureOnCollection';
  collection: Collection;
  collectionId: Scalars['String']['output'];
  picture: Picture;
  pictureId: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  commentsByPictureId: Array<Comment>;
  getCollectionsByUser: Array<Collection>;
  mockedUser: Array<User>;
  picturesByAuthor: Array<Picture>;
  picturesFromFollowing: Array<Picture>;
  user: User;
  users: Array<User>;
  usersByUsername: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCommentsByPictureIdArgs = {
  pictureId: Scalars['Int']['input'];
};


export type QueryGetCollectionsByUserArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryPicturesByAuthorArgs = {
  authorId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryPicturesFromFollowingArgs = {
  authorId: Array<Scalars['Float']['input']>;
};


export type QueryUserArgs = {
  profileId: Scalars['Float']['input'];
};


export type QueryUsersByUsernameArgs = {
  username: Scalars['String']['input'];
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
  avatar?: InputMaybe<Scalars['String']['input']>;
  avatarName?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  avatar?: Maybe<Scalars['String']['output']>;
  avatarName?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  collections: Array<Collection>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  initiatedFollows: Array<Follow>;
  isMocked: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  likes?: Maybe<Array<Like>>;
  password: Scalars['String']['output'];
  pictures: Array<Picture>;
  receivedFollows: Array<Follow>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  initiatedFollows: Scalars['Int']['output'];
  pictures: Scalars['Int']['output'];
  receivedFollows: Scalars['Int']['output'];
};

export type CreateCollectionMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'Collection', id: string, name: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number }> } };

export type AddPictureToCollectionMutationVariables = Exact<{
  pictureId: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
  collectionId: Scalars['Float']['input'];
}>;


export type AddPictureToCollectionMutation = { __typename?: 'Mutation', addPictureToCollection: Array<{ __typename?: 'PictureOnCollection', collectionId: string, pictureId: number }> };

export type RemovePictureFromCollectionMutationVariables = Exact<{
  pictureId: Scalars['Float']['input'];
  collectionId: Scalars['Float']['input'];
}>;


export type RemovePictureFromCollectionMutation = { __typename?: 'Mutation', removePictureFromCollection: { __typename?: 'PictureOnCollection', pictureId: number } };

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

export type LikePictureMutationVariables = Exact<{
  pictureId: Scalars['Float']['input'];
}>;


export type LikePictureMutation = { __typename?: 'Mutation', likePicture: { __typename?: 'Picture', id: number, description?: string | null, createdAt: any, updatedAt: any, fileUrl: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } } };

export type UnlikePictureMutationVariables = Exact<{
  likeId: Scalars['Float']['input'];
}>;


export type UnlikePictureMutation = { __typename?: 'Mutation', unlikePicture: { __typename?: 'Picture', id: number, description?: string | null, createdAt: any, updatedAt: any, fileUrl: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } } };

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


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, avatar?: string | null, bio?: string | null } };

export type GetCollectionsQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetCollectionsQuery = { __typename?: 'Query', getCollectionsByUser: Array<{ __typename?: 'Collection', id: string, name: string, pictures: Array<{ __typename?: 'PictureOnCollection', picture: { __typename?: 'Picture', id: number, fileUrl: string } }> }> };

export type GetCommentsByPictureQueryVariables = Exact<{
  pictureId: Scalars['Int']['input'];
}>;


export type GetCommentsByPictureQuery = { __typename?: 'Query', commentsByPictureId: Array<{ __typename?: 'Comment', id: number, content: string, createdAt?: any | null, updatedAt?: any | null, author?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null }> };

export type PictureFragmentFragment = { __typename?: 'Picture', id: number, description?: string | null, createdAt: any, updatedAt: any, fileUrl: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } };

export type GetPictureByAuthorQueryVariables = Exact<{
  authorId?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetPictureByAuthorQuery = { __typename?: 'Query', picturesByAuthor: Array<{ __typename?: 'Picture', id: number, description?: string | null, createdAt: any, updatedAt: any, fileUrl: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } }> };

export type GetPicturesFromFollowingQueryVariables = Exact<{
  authorId: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type GetPicturesFromFollowingQuery = { __typename?: 'Query', picturesFromFollowing: Array<{ __typename?: 'Picture', id: number, description?: string | null, createdAt: any, updatedAt: any, fileUrl: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } }> };

export type UserFragmentFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null };

export type CollectionFragmentFragment = { __typename?: 'Collection', id: string, name: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number, picture: { __typename?: 'Picture', fileUrl: string } }> };

export type InitiatedFollowsFragment = { __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null };

export type ReceivedFollowsFragment = { __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null };

export type UserProfileFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null, initiatedFollows: Array<{ __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, receivedFollows: Array<{ __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, collections: Array<{ __typename?: 'Collection', id: string, name: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number, picture: { __typename?: 'Picture', fileUrl: string } }> }>, _count: { __typename?: 'UserCount', pictures: number, initiatedFollows: number, receivedFollows: number } };

export type GetUserProfileQueryVariables = Exact<{
  profileId: Scalars['Float']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null, initiatedFollows: Array<{ __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, receivedFollows: Array<{ __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, collections: Array<{ __typename?: 'Collection', id: string, name: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number, picture: { __typename?: 'Picture', fileUrl: string } }> }>, _count: { __typename?: 'UserCount', pictures: number, initiatedFollows: number, receivedFollows: number } } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }> };

export type GetUsersByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUsersByUsernameQuery = { __typename?: 'Query', usersByUsername: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }> };

export type GetMockedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMockedUserQuery = { __typename?: 'Query', mockedUser: Array<{ __typename?: 'User', id: number, email: string }> };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  firstName
  lastName
  username
  avatar
  bio
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
  likes {
    id
    userId
    pictureId
  }
  _count {
    comments
    likes
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
export const CollectionFragmentFragmentDoc = gql`
    fragment CollectionFragment on Collection {
  id
  name
  pictures {
    pictureId
    picture {
      fileUrl
    }
  }
}
    `;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on User {
  ...UserFragment
  initiatedFollows {
    ...InitiatedFollows
  }
  receivedFollows {
    ...ReceivedFollows
  }
  collections {
    ...CollectionFragment
  }
  _count {
    pictures
    initiatedFollows
    receivedFollows
  }
}
    ${UserFragmentFragmentDoc}
${InitiatedFollowsFragmentDoc}
${ReceivedFollowsFragmentDoc}
${CollectionFragmentFragmentDoc}`;
export const CreateCollectionDocument = gql`
    mutation CreateCollection($name: String!) {
  createCollection(name: $name) {
    id
    name
    pictures {
      pictureId
    }
  }
}
    `;
export type CreateCollectionMutationFn = Apollo.MutationFunction<CreateCollectionMutation, CreateCollectionMutationVariables>;

/**
 * __useCreateCollectionMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutation, { data, loading, error }] = useCreateCollectionMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCollectionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCollectionMutation, CreateCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCollectionMutation, CreateCollectionMutationVariables>(CreateCollectionDocument, options);
      }
export type CreateCollectionMutationHookResult = ReturnType<typeof useCreateCollectionMutation>;
export type CreateCollectionMutationResult = Apollo.MutationResult<CreateCollectionMutation>;
export type CreateCollectionMutationOptions = Apollo.BaseMutationOptions<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const AddPictureToCollectionDocument = gql`
    mutation AddPictureToCollection($pictureId: [Float!]!, $collectionId: Float!) {
  addPictureToCollection(pictureId: $pictureId, collectionId: $collectionId) {
    collectionId
    pictureId
  }
}
    `;
export type AddPictureToCollectionMutationFn = Apollo.MutationFunction<AddPictureToCollectionMutation, AddPictureToCollectionMutationVariables>;

/**
 * __useAddPictureToCollectionMutation__
 *
 * To run a mutation, you first call `useAddPictureToCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPictureToCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPictureToCollectionMutation, { data, loading, error }] = useAddPictureToCollectionMutation({
 *   variables: {
 *      pictureId: // value for 'pictureId'
 *      collectionId: // value for 'collectionId'
 *   },
 * });
 */
export function useAddPictureToCollectionMutation(baseOptions?: Apollo.MutationHookOptions<AddPictureToCollectionMutation, AddPictureToCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPictureToCollectionMutation, AddPictureToCollectionMutationVariables>(AddPictureToCollectionDocument, options);
      }
export type AddPictureToCollectionMutationHookResult = ReturnType<typeof useAddPictureToCollectionMutation>;
export type AddPictureToCollectionMutationResult = Apollo.MutationResult<AddPictureToCollectionMutation>;
export type AddPictureToCollectionMutationOptions = Apollo.BaseMutationOptions<AddPictureToCollectionMutation, AddPictureToCollectionMutationVariables>;
export const RemovePictureFromCollectionDocument = gql`
    mutation RemovePictureFromCollection($pictureId: Float!, $collectionId: Float!) {
  removePictureFromCollection(pictureId: $pictureId, collectionId: $collectionId) {
    pictureId
  }
}
    `;
export type RemovePictureFromCollectionMutationFn = Apollo.MutationFunction<RemovePictureFromCollectionMutation, RemovePictureFromCollectionMutationVariables>;

/**
 * __useRemovePictureFromCollectionMutation__
 *
 * To run a mutation, you first call `useRemovePictureFromCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePictureFromCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePictureFromCollectionMutation, { data, loading, error }] = useRemovePictureFromCollectionMutation({
 *   variables: {
 *      pictureId: // value for 'pictureId'
 *      collectionId: // value for 'collectionId'
 *   },
 * });
 */
export function useRemovePictureFromCollectionMutation(baseOptions?: Apollo.MutationHookOptions<RemovePictureFromCollectionMutation, RemovePictureFromCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePictureFromCollectionMutation, RemovePictureFromCollectionMutationVariables>(RemovePictureFromCollectionDocument, options);
      }
export type RemovePictureFromCollectionMutationHookResult = ReturnType<typeof useRemovePictureFromCollectionMutation>;
export type RemovePictureFromCollectionMutationResult = Apollo.MutationResult<RemovePictureFromCollectionMutation>;
export type RemovePictureFromCollectionMutationOptions = Apollo.BaseMutationOptions<RemovePictureFromCollectionMutation, RemovePictureFromCollectionMutationVariables>;
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
export const LikePictureDocument = gql`
    mutation LikePicture($pictureId: Float!) {
  likePicture(pictureId: $pictureId) {
    ...PictureFragment
  }
}
    ${PictureFragmentFragmentDoc}`;
export type LikePictureMutationFn = Apollo.MutationFunction<LikePictureMutation, LikePictureMutationVariables>;

/**
 * __useLikePictureMutation__
 *
 * To run a mutation, you first call `useLikePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePictureMutation, { data, loading, error }] = useLikePictureMutation({
 *   variables: {
 *      pictureId: // value for 'pictureId'
 *   },
 * });
 */
export function useLikePictureMutation(baseOptions?: Apollo.MutationHookOptions<LikePictureMutation, LikePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePictureMutation, LikePictureMutationVariables>(LikePictureDocument, options);
      }
export type LikePictureMutationHookResult = ReturnType<typeof useLikePictureMutation>;
export type LikePictureMutationResult = Apollo.MutationResult<LikePictureMutation>;
export type LikePictureMutationOptions = Apollo.BaseMutationOptions<LikePictureMutation, LikePictureMutationVariables>;
export const UnlikePictureDocument = gql`
    mutation UnlikePicture($likeId: Float!) {
  unlikePicture(likeId: $likeId) {
    ...PictureFragment
  }
}
    ${PictureFragmentFragmentDoc}`;
export type UnlikePictureMutationFn = Apollo.MutationFunction<UnlikePictureMutation, UnlikePictureMutationVariables>;

/**
 * __useUnlikePictureMutation__
 *
 * To run a mutation, you first call `useUnlikePictureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePictureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikePictureMutation, { data, loading, error }] = useUnlikePictureMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *   },
 * });
 */
export function useUnlikePictureMutation(baseOptions?: Apollo.MutationHookOptions<UnlikePictureMutation, UnlikePictureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlikePictureMutation, UnlikePictureMutationVariables>(UnlikePictureDocument, options);
      }
export type UnlikePictureMutationHookResult = ReturnType<typeof useUnlikePictureMutation>;
export type UnlikePictureMutationResult = Apollo.MutationResult<UnlikePictureMutation>;
export type UnlikePictureMutationOptions = Apollo.BaseMutationOptions<UnlikePictureMutation, UnlikePictureMutationVariables>;
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
    avatar
    bio
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
export const GetCollectionsDocument = gql`
    query GetCollections($userId: Float!) {
  getCollectionsByUser(userId: $userId) {
    id
    name
    pictures {
      picture {
        id
        fileUrl
      }
    }
  }
}
    `;

/**
 * __useGetCollectionsQuery__
 *
 * To run a query within a React component, call `useGetCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCollectionsQuery(baseOptions: Apollo.QueryHookOptions<GetCollectionsQuery, GetCollectionsQueryVariables> & ({ variables: GetCollectionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, options);
      }
export function useGetCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionsQuery, GetCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, options);
        }
export function useGetCollectionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCollectionsQuery, GetCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, options);
        }
export type GetCollectionsQueryHookResult = ReturnType<typeof useGetCollectionsQuery>;
export type GetCollectionsLazyQueryHookResult = ReturnType<typeof useGetCollectionsLazyQuery>;
export type GetCollectionsSuspenseQueryHookResult = ReturnType<typeof useGetCollectionsSuspenseQuery>;
export type GetCollectionsQueryResult = Apollo.QueryResult<GetCollectionsQuery, GetCollectionsQueryVariables>;
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
export const GetPicturesFromFollowingDocument = gql`
    query GetPicturesFromFollowing($authorId: [Float!]!) {
  picturesFromFollowing(authorId: $authorId) {
    ...PictureFragment
  }
}
    ${PictureFragmentFragmentDoc}`;

/**
 * __useGetPicturesFromFollowingQuery__
 *
 * To run a query within a React component, call `useGetPicturesFromFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPicturesFromFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPicturesFromFollowingQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetPicturesFromFollowingQuery(baseOptions: Apollo.QueryHookOptions<GetPicturesFromFollowingQuery, GetPicturesFromFollowingQueryVariables> & ({ variables: GetPicturesFromFollowingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPicturesFromFollowingQuery, GetPicturesFromFollowingQueryVariables>(GetPicturesFromFollowingDocument, options);
      }
export function useGetPicturesFromFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPicturesFromFollowingQuery, GetPicturesFromFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPicturesFromFollowingQuery, GetPicturesFromFollowingQueryVariables>(GetPicturesFromFollowingDocument, options);
        }
export function useGetPicturesFromFollowingSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPicturesFromFollowingQuery, GetPicturesFromFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPicturesFromFollowingQuery, GetPicturesFromFollowingQueryVariables>(GetPicturesFromFollowingDocument, options);
        }
export type GetPicturesFromFollowingQueryHookResult = ReturnType<typeof useGetPicturesFromFollowingQuery>;
export type GetPicturesFromFollowingLazyQueryHookResult = ReturnType<typeof useGetPicturesFromFollowingLazyQuery>;
export type GetPicturesFromFollowingSuspenseQueryHookResult = ReturnType<typeof useGetPicturesFromFollowingSuspenseQuery>;
export type GetPicturesFromFollowingQueryResult = Apollo.QueryResult<GetPicturesFromFollowingQuery, GetPicturesFromFollowingQueryVariables>;
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
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUsersByUsernameDocument = gql`
    query GetUsersByUsername($username: String!) {
  usersByUsername(username: $username) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUsersByUsernameQuery__
 *
 * To run a query within a React component, call `useGetUsersByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUsersByUsernameQuery(baseOptions: Apollo.QueryHookOptions<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables> & ({ variables: GetUsersByUsernameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables>(GetUsersByUsernameDocument, options);
      }
export function useGetUsersByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables>(GetUsersByUsernameDocument, options);
        }
export function useGetUsersByUsernameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables>(GetUsersByUsernameDocument, options);
        }
export type GetUsersByUsernameQueryHookResult = ReturnType<typeof useGetUsersByUsernameQuery>;
export type GetUsersByUsernameLazyQueryHookResult = ReturnType<typeof useGetUsersByUsernameLazyQuery>;
export type GetUsersByUsernameSuspenseQueryHookResult = ReturnType<typeof useGetUsersByUsernameSuspenseQuery>;
export type GetUsersByUsernameQueryResult = Apollo.QueryResult<GetUsersByUsernameQuery, GetUsersByUsernameQueryVariables>;
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