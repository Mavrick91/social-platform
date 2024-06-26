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
  id: Scalars['Int']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nameId: Scalars['String']['output'];
  pictures: Array<PictureOnCollection>;
  user: User;
  userId: Scalars['Int']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  /** The content of the comment */
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The unique identifier of the comment */
  id: Scalars['Int']['output'];
  /** The picture the comment belongs to */
  picture?: Maybe<Picture>;
  pictureId?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The user who created the comment */
  user: User;
  userId?: Maybe<Scalars['Int']['output']>;
};

export type CreateCommentInput = {
  /** The content of the comment */
  content: Scalars['String']['input'];
  /** The ID of the picture the comment belongs to */
  pictureId: Scalars['Int']['input'];
  /** The ID of the user who created the comment */
  userId: Scalars['Int']['input'];
};

export type CreateMessageInput = {
  content: Scalars['String']['input'];
  threadId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type CreatePictureInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  disableComments?: Scalars['Boolean']['input'];
  fileName: Scalars['String']['input'];
  hideLikesAndViewCounts?: Scalars['Boolean']['input'];
  sizes: SizeInput;
};

export type CreateThoughtInput = {
  content: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
  visibility: Visibility;
};

export type CreateThreadInput = {
  userIds: Array<Scalars['Float']['input']>;
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

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  thread: Thread;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPictureToCollection: Array<PictureOnCollection>;
  createCollection: Collection;
  createComment: Comment;
  createMessage: Message;
  createPicture: Picture;
  createThought: Thought;
  createThread: Thread;
  createUser: User;
  deleteAllCollectionsForUser: Collection;
  deleteCollection: Collection;
  deletePicture: Picture;
  deleteThought: Thought;
  followUser: Follow;
  likePicture: Picture;
  login: LoginResponse;
  markNotificationsAsRead: Array<Notification>;
  removeComment: Comment;
  removePictureFromCollection: Array<Collection>;
  unfollowUser: Follow;
  unlikePicture: Picture;
  updateComment: Comment;
  updateNameCollection: Collection;
  updatePicture: Picture;
  updateThought: Thought;
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


export type MutationCreateMessageArgs = {
  createMessageInput: CreateMessageInput;
};


export type MutationCreatePictureArgs = {
  input: CreatePictureInput;
};


export type MutationCreateThoughtArgs = {
  createThoughtInput: CreateThoughtInput;
};


export type MutationCreateThreadArgs = {
  createThreadInput: CreateThreadInput;
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


export type MutationDeleteThoughtArgs = {
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


export type MutationMarkNotificationsAsReadArgs = {
  notificationIds: Array<Scalars['Int']['input']>;
};


export type MutationRemoveCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemovePictureFromCollectionArgs = {
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


export type MutationUpdateNameCollectionArgs = {
  collectionId: Scalars['Float']['input'];
  newName: Scalars['String']['input'];
};


export type MutationUpdatePictureArgs = {
  id: Scalars['Float']['input'];
  input: UpdatePictureInput;
};


export type MutationUpdateThoughtArgs = {
  updateThoughtInput: UpdateThoughtInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserDto;
  username: Scalars['String']['input'];
};

export type Notification = {
  __typename?: 'Notification';
  comment?: Maybe<Comment>;
  commentId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  picture?: Maybe<Picture>;
  pictureId?: Maybe<Scalars['Int']['output']>;
  read: Scalars['Boolean']['output'];
  receiver: User;
  receiverId: Scalars['Int']['output'];
  sender: User;
  senderId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  currentPage: Scalars['Int']['output'];
  notifications: Array<Notification>;
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Picture = {
  __typename?: 'Picture';
  _count: PictureCount;
  altText: Scalars['String']['output'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  disableComments: Scalars['Boolean']['output'];
  fileName: Scalars['String']['output'];
  hideLikesAndViewCounts: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  likes: Array<Like>;
  sizes: SizeType;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
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
  getCollection: Collection;
  message: Message;
  messages: Array<Message>;
  mockedUser: Array<User>;
  notifications: PaginatedNotifications;
  picturesByUsername: Array<Picture>;
  picturesFromFollowing: Array<Picture>;
  thoughts: Array<Thought>;
  thread: Thread;
  threads: Array<Thread>;
  threadsByUserId: Array<Thread>;
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


export type QueryGetCollectionArgs = {
  collectionName: Scalars['String']['input'];
};


export type QueryMessageArgs = {
  id: Scalars['Float']['input'];
};


export type QueryNotificationsArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryPicturesByUsernameArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPicturesFromFollowingArgs = {
  userId: Array<Scalars['Float']['input']>;
};


export type QueryThoughtsArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryThreadArgs = {
  id: Scalars['Float']['input'];
};


export type QueryThreadsByUserIdArgs = {
  userId: Scalars['Float']['input'];
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};


export type QueryUsersByUsernameArgs = {
  username: Scalars['String']['input'];
};

export type SizeInput = {
  medium: Scalars['String']['input'];
  original: Scalars['String']['input'];
  small: Scalars['String']['input'];
  thumbnail: Scalars['String']['input'];
};

export type SizeType = {
  __typename?: 'SizeType';
  medium: Scalars['String']['output'];
  original: Scalars['String']['output'];
  small: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded: Message;
  notificationAdded: Notification;
};


export type SubscriptionMessageAddedArgs = {
  threadId: Scalars['Float']['input'];
};


export type SubscriptionNotificationAddedArgs = {
  userId: Scalars['Int']['input'];
};

export type Thought = {
  __typename?: 'Thought';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** The unique identifier of the thought */
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  visibility: Visibility;
};

export type Thread = {
  __typename?: 'Thread';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  messages: Array<Message>;
  updatedAt: Scalars['DateTime']['output'];
  users: Array<User>;
};

export type UnfollowDto = {
  followingId: Scalars['Float']['input'];
  userId: Scalars['Float']['input'];
};

export type UpdateCommentInput = {
  /** The content of the comment */
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** The ID of the picture the comment belongs to */
  pictureId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the user who created the comment */
  userId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdatePictureInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  disableComments?: InputMaybe<Scalars['Boolean']['input']>;
  hideLikesAndViewCounts?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateThoughtInput = {
  content: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  visibility: Visibility;
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
  closeFriends: Array<User>;
  closeFriendsOf: Array<User>;
  collections: Array<Collection>;
  comments: Array<Comment>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  initiatedFollows: Array<Follow>;
  isMock: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  likes: Array<Like>;
  messages: Array<Message>;
  password: Scalars['String']['output'];
  pictures: Array<Picture>;
  receivedFollows: Array<Follow>;
  receivedNotifications: Array<Notification>;
  sentNotifications: Array<Notification>;
  thought?: Maybe<Thought>;
  threads: Array<Thread>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  initiatedFollows: Scalars['Int']['output'];
  pictures: Scalars['Int']['output'];
  receivedFollows: Scalars['Int']['output'];
};

export enum Visibility {
  CloseFriends = 'CLOSE_FRIENDS',
  Followers = 'FOLLOWERS'
}

export type CreateCollectionMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateCollectionMutation = { __typename?: 'Mutation', createCollection: { __typename?: 'Collection', id: number, name: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number }> } };

export type AddPictureToCollectionMutationVariables = Exact<{
  pictureId: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
  collectionId: Scalars['Float']['input'];
}>;


export type AddPictureToCollectionMutation = { __typename?: 'Mutation', addPictureToCollection: Array<{ __typename?: 'PictureOnCollection', collectionId: string, pictureId: number, picture: { __typename?: 'Picture', sizes: { __typename?: 'SizeType', small: string } } }> };

export type RemovePictureFromCollectionMutationVariables = Exact<{
  pictureId: Scalars['Float']['input'];
}>;


export type RemovePictureFromCollectionMutation = { __typename?: 'Mutation', removePictureFromCollection: Array<{ __typename?: 'Collection', id: number }> };

export type DeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars['Float']['input'];
}>;


export type DeleteCollectionMutation = { __typename?: 'Mutation', deleteCollection: { __typename?: 'Collection', id: number } };

export type UpdateNameCollectionMutationVariables = Exact<{
  collectionId: Scalars['Float']['input'];
  newName: Scalars['String']['input'];
}>;


export type UpdateNameCollectionMutation = { __typename?: 'Mutation', updateNameCollection: { __typename?: 'Collection', id: number, name: string } };

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


export type LikePictureMutation = { __typename?: 'Mutation', likePicture: { __typename?: 'Picture', id: number, fileName: string, description?: string | null, createdAt: any, updatedAt: any, hideLikesAndViewCounts: boolean, disableComments: boolean, altText: string, sizes: { __typename?: 'SizeType', thumbnail: string, original: string, medium: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number, user: { __typename?: 'User', id: number, username: string } }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } } };

export type UnlikePictureMutationVariables = Exact<{
  likeId: Scalars['Float']['input'];
}>;


export type UnlikePictureMutation = { __typename?: 'Mutation', unlikePicture: { __typename?: 'Picture', id: number, fileName: string, description?: string | null, createdAt: any, updatedAt: any, hideLikesAndViewCounts: boolean, disableComments: boolean, altText: string, sizes: { __typename?: 'SizeType', thumbnail: string, original: string, medium: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number, user: { __typename?: 'User', id: number, username: string } }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } } };

export type ThreadMessageFragment = { __typename?: 'Message', id: number, content: string, createdAt: any, user: { __typename?: 'User', id: number } };

export type CreateMessageMutationVariables = Exact<{
  createMessageInput: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, content: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: number }, thread: { __typename?: 'Thread', messages: Array<{ __typename?: 'Message', id: number, content: string, createdAt: any, user: { __typename?: 'User', id: number } }> } } };

export type MarkNotificationsAsReadMutationVariables = Exact<{
  notificationIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type MarkNotificationsAsReadMutation = { __typename?: 'Mutation', markNotificationsAsRead: Array<{ __typename?: 'Notification', id: number, read: boolean }> };

export type UploadPictureMutationVariables = Exact<{
  input: CreatePictureInput;
}>;


export type UploadPictureMutation = { __typename?: 'Mutation', createPicture: { __typename?: 'Picture', id: number } };

export type UpdatePictureMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  input: UpdatePictureInput;
}>;


export type UpdatePictureMutation = { __typename?: 'Mutation', updatePicture: { __typename?: 'Picture', id: number, description?: string | null, altText: string, disableComments: boolean, hideLikesAndViewCounts: boolean } };

export type DeletePictureMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePictureMutation = { __typename?: 'Mutation', deletePicture: { __typename?: 'Picture', id: number } };

export type CreateThoughtMutationVariables = Exact<{
  createThoughtInput: CreateThoughtInput;
}>;


export type CreateThoughtMutation = { __typename?: 'Mutation', createThought: { __typename?: 'Thought', id: number, content: string, visibility: Visibility, createdAt: any, user: { __typename?: 'User', id: number, username: string } } };

export type DeleteThoughtMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeleteThoughtMutation = { __typename?: 'Mutation', deleteThought: { __typename?: 'Thought', id: number } };

export type UpdateThoughtMutationVariables = Exact<{
  updateThoughtInput: UpdateThoughtInput;
}>;


export type UpdateThoughtMutation = { __typename?: 'Mutation', updateThought: { __typename?: 'Thought', id: number, content: string } };

export type CreateThreadMutationVariables = Exact<{
  createThreadInput: CreateThreadInput;
}>;


export type CreateThreadMutation = { __typename?: 'Mutation', createThread: { __typename?: 'Thread', id: number, createdAt: any, updatedAt: any, users: Array<{ __typename?: 'User', id: number, username: string }> } };

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
  username: Scalars['String']['input'];
  updateUserInput: UpdateUserDto;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email: string, firstName: string, lastName: string, avatar?: string | null, bio?: string | null } };

export type GetCollectionQueryVariables = Exact<{
  collectionName: Scalars['String']['input'];
}>;


export type GetCollectionQuery = { __typename?: 'Query', getCollection: { __typename?: 'Collection', id: number, name: string, isDefault: boolean, pictures: Array<{ __typename?: 'PictureOnCollection', picture: { __typename?: 'Picture', id: number, fileName: string, description?: string | null, createdAt: any, updatedAt: any, hideLikesAndViewCounts: boolean, disableComments: boolean, altText: string, sizes: { __typename?: 'SizeType', thumbnail: string, original: string, medium: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number, user: { __typename?: 'User', id: number, username: string } }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } } }> } };

export type GetCommentsByPictureQueryVariables = Exact<{
  pictureId: Scalars['Int']['input'];
}>;


export type GetCommentsByPictureQuery = { __typename?: 'Query', commentsByPictureId: Array<{ __typename?: 'Comment', id: number, content: string, createdAt?: any | null, updatedAt?: any | null, user: { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null, username: string } }> };

export type NotificationFragmentFragment = { __typename?: 'Notification', id: number, type: string, read: boolean, createdAt: any, sender: { __typename?: 'User', id: number, username: string, avatar?: string | null }, picture?: { __typename?: 'Picture', altText: string, sizes: { __typename?: 'SizeType', small: string } } | null, comment?: { __typename?: 'Comment', content: string } | null };

export type GetNotificationsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'PaginatedNotifications', totalCount: number, totalPages: number, currentPage: number, notifications: Array<{ __typename?: 'Notification', id: number, type: string, read: boolean, createdAt: any, sender: { __typename?: 'User', id: number, username: string, avatar?: string | null }, picture?: { __typename?: 'Picture', altText: string, sizes: { __typename?: 'SizeType', small: string } } | null, comment?: { __typename?: 'Comment', content: string } | null }> } };

export type PictureFragmentFragment = { __typename?: 'Picture', id: number, fileName: string, description?: string | null, createdAt: any, updatedAt: any, hideLikesAndViewCounts: boolean, disableComments: boolean, altText: string, sizes: { __typename?: 'SizeType', thumbnail: string, original: string, medium: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number, user: { __typename?: 'User', id: number, username: string } }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } };

export type GetPictureByUsernameQueryVariables = Exact<{
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetPictureByUsernameQuery = { __typename?: 'Query', picturesByUsername: Array<{ __typename?: 'Picture', id: number, fileName: string, description?: string | null, createdAt: any, updatedAt: any, hideLikesAndViewCounts: boolean, disableComments: boolean, altText: string, sizes: { __typename?: 'SizeType', thumbnail: string, original: string, medium: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number, user: { __typename?: 'User', id: number, username: string } }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } }> };

export type GetPicturesFromFollowingQueryVariables = Exact<{
  userId: Array<Scalars['Float']['input']> | Scalars['Float']['input'];
}>;


export type GetPicturesFromFollowingQuery = { __typename?: 'Query', picturesFromFollowing: Array<{ __typename?: 'Picture', id: number, fileName: string, description?: string | null, createdAt: any, updatedAt: any, hideLikesAndViewCounts: boolean, disableComments: boolean, altText: string, sizes: { __typename?: 'SizeType', thumbnail: string, original: string, medium: string }, user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }, likes: Array<{ __typename?: 'Like', id: number, userId: number, pictureId: number, user: { __typename?: 'User', id: number, username: string } }>, _count: { __typename?: 'PictureCount', comments: number, likes: number } }> };

export type ThreadUserFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null, username: string };

export type GetThreadQueryVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type GetThreadQuery = { __typename?: 'Query', thread: { __typename?: 'Thread', id: number, createdAt: any, updatedAt: any, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null, username: string }>, messages: Array<{ __typename?: 'Message', id: number, content: string, createdAt: any, user: { __typename?: 'User', id: number } }> } };

export type GetThreadsByUserIdQueryVariables = Exact<{
  userId: Scalars['Float']['input'];
}>;


export type GetThreadsByUserIdQuery = { __typename?: 'Query', threadsByUserId: Array<{ __typename?: 'Thread', id: number, createdAt: any, updatedAt: any, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, avatar?: string | null, username: string }>, messages: Array<{ __typename?: 'Message', id: number, content: string, createdAt: any, user: { __typename?: 'User', id: number } }> }> };

export type UserFragmentFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null };

export type CollectionFragmentFragment = { __typename?: 'Collection', id: number, name: string, nameId: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number, picture: { __typename?: 'Picture', sizes: { __typename?: 'SizeType', small: string } } }> };

export type InitiatedFollowsFragment = { __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null };

export type ReceivedFollowsFragment = { __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null };

export type UserProfileFragment = { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null, initiatedFollows: Array<{ __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, receivedFollows: Array<{ __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, collections: Array<{ __typename?: 'Collection', id: number, name: string, nameId: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number, picture: { __typename?: 'Picture', sizes: { __typename?: 'SizeType', small: string } } }> }>, thought?: { __typename?: 'Thought', id: number, content: string, visibility: Visibility, createdAt: any } | null, _count: { __typename?: 'UserCount', pictures: number, initiatedFollows: number, receivedFollows: number } };

export type GetUserProfileQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUserProfileQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null, initiatedFollows: Array<{ __typename?: 'Follow', targetUserId?: number | null, targetUser?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, receivedFollows: Array<{ __typename?: 'Follow', initiator?: { __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null } | null }>, collections: Array<{ __typename?: 'Collection', id: number, name: string, nameId: string, pictures: Array<{ __typename?: 'PictureOnCollection', pictureId: number, picture: { __typename?: 'Picture', sizes: { __typename?: 'SizeType', small: string } } }> }>, thought?: { __typename?: 'Thought', id: number, content: string, visibility: Visibility, createdAt: any } | null, _count: { __typename?: 'UserCount', pictures: number, initiatedFollows: number, receivedFollows: number } } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }> };

export type GetUsersByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetUsersByUsernameQuery = { __typename?: 'Query', usersByUsername: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, username: string, avatar?: string | null, bio?: string | null }> };

export type GetMockedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMockedUserQuery = { __typename?: 'Query', mockedUser: Array<{ __typename?: 'User', id: number, email: string }> };

export type MessageAddedSubscriptionVariables = Exact<{
  threadId: Scalars['Float']['input'];
}>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', id: number, content: string, createdAt: any, user: { __typename?: 'User', id: number } } };

export type NotificationAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type NotificationAddedSubscription = { __typename?: 'Subscription', notificationAdded: { __typename?: 'Notification', id: number, type: string, read: boolean, createdAt: any, sender: { __typename?: 'User', id: number, username: string, avatar?: string | null }, picture?: { __typename?: 'Picture', altText: string, sizes: { __typename?: 'SizeType', small: string } } | null, comment?: { __typename?: 'Comment', content: string } | null } };

export const ThreadMessageFragmentDoc = gql`
    fragment ThreadMessage on Message {
  id
  content
  createdAt
  user {
    id
  }
}
    `;
export const NotificationFragmentFragmentDoc = gql`
    fragment NotificationFragment on Notification {
  id
  type
  sender {
    id
    username
    avatar
  }
  picture {
    altText
    sizes {
      small
    }
  }
  comment {
    content
  }
  read
  createdAt
}
    `;
export const PictureFragmentFragmentDoc = gql`
    fragment PictureFragment on Picture {
  id
  fileName
  description
  createdAt
  updatedAt
  hideLikesAndViewCounts
  disableComments
  sizes {
    thumbnail
    original
    medium
  }
  altText
  user {
    id
    firstName
    lastName
    username
    avatar
    bio
  }
  likes {
    id
    userId
    pictureId
    user {
      id
      username
    }
  }
  _count {
    comments
    likes
  }
}
    `;
export const ThreadUserFragmentDoc = gql`
    fragment ThreadUser on User {
  id
  firstName
  lastName
  avatar
  username
}
    `;
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
  nameId
  pictures {
    pictureId
    picture {
      sizes {
        small
      }
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
  thought {
    id
    content
    visibility
    createdAt
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
    picture {
      sizes {
        small
      }
    }
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
    mutation RemovePictureFromCollection($pictureId: Float!) {
  removePictureFromCollection(pictureId: $pictureId) {
    id
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
export const DeleteCollectionDocument = gql`
    mutation DeleteCollection($collectionId: Float!) {
  deleteCollection(collectionId: $collectionId) {
    id
  }
}
    `;
export type DeleteCollectionMutationFn = Apollo.MutationFunction<DeleteCollectionMutation, DeleteCollectionMutationVariables>;

/**
 * __useDeleteCollectionMutation__
 *
 * To run a mutation, you first call `useDeleteCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCollectionMutation, { data, loading, error }] = useDeleteCollectionMutation({
 *   variables: {
 *      collectionId: // value for 'collectionId'
 *   },
 * });
 */
export function useDeleteCollectionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCollectionMutation, DeleteCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCollectionMutation, DeleteCollectionMutationVariables>(DeleteCollectionDocument, options);
      }
export type DeleteCollectionMutationHookResult = ReturnType<typeof useDeleteCollectionMutation>;
export type DeleteCollectionMutationResult = Apollo.MutationResult<DeleteCollectionMutation>;
export type DeleteCollectionMutationOptions = Apollo.BaseMutationOptions<DeleteCollectionMutation, DeleteCollectionMutationVariables>;
export const UpdateNameCollectionDocument = gql`
    mutation UpdateNameCollection($collectionId: Float!, $newName: String!) {
  updateNameCollection(collectionId: $collectionId, newName: $newName) {
    id
    name
  }
}
    `;
export type UpdateNameCollectionMutationFn = Apollo.MutationFunction<UpdateNameCollectionMutation, UpdateNameCollectionMutationVariables>;

/**
 * __useUpdateNameCollectionMutation__
 *
 * To run a mutation, you first call `useUpdateNameCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNameCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNameCollectionMutation, { data, loading, error }] = useUpdateNameCollectionMutation({
 *   variables: {
 *      collectionId: // value for 'collectionId'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useUpdateNameCollectionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNameCollectionMutation, UpdateNameCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNameCollectionMutation, UpdateNameCollectionMutationVariables>(UpdateNameCollectionDocument, options);
      }
export type UpdateNameCollectionMutationHookResult = ReturnType<typeof useUpdateNameCollectionMutation>;
export type UpdateNameCollectionMutationResult = Apollo.MutationResult<UpdateNameCollectionMutation>;
export type UpdateNameCollectionMutationOptions = Apollo.BaseMutationOptions<UpdateNameCollectionMutation, UpdateNameCollectionMutationVariables>;
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
export const CreateMessageDocument = gql`
    mutation CreateMessage($createMessageInput: CreateMessageInput!) {
  createMessage(createMessageInput: $createMessageInput) {
    id
    content
    createdAt
    updatedAt
    user {
      id
    }
    thread {
      messages {
        ...ThreadMessage
      }
    }
  }
}
    ${ThreadMessageFragmentDoc}`;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      createMessageInput: // value for 'createMessageInput'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const MarkNotificationsAsReadDocument = gql`
    mutation MarkNotificationsAsRead($notificationIds: [Int!]!) {
  markNotificationsAsRead(notificationIds: $notificationIds) {
    id
    read
  }
}
    `;
export type MarkNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>;

/**
 * __useMarkNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationsAsReadMutation, { data, loading, error }] = useMarkNotificationsAsReadMutation({
 *   variables: {
 *      notificationIds: // value for 'notificationIds'
 *   },
 * });
 */
export function useMarkNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>(MarkNotificationsAsReadDocument, options);
      }
export type MarkNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkNotificationsAsReadMutation>;
export type MarkNotificationsAsReadMutationResult = Apollo.MutationResult<MarkNotificationsAsReadMutation>;
export type MarkNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationsAsReadMutation, MarkNotificationsAsReadMutationVariables>;
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
    altText
    disableComments
    hideLikesAndViewCounts
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
export const CreateThoughtDocument = gql`
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
export type CreateThoughtMutationFn = Apollo.MutationFunction<CreateThoughtMutation, CreateThoughtMutationVariables>;

/**
 * __useCreateThoughtMutation__
 *
 * To run a mutation, you first call `useCreateThoughtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThoughtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThoughtMutation, { data, loading, error }] = useCreateThoughtMutation({
 *   variables: {
 *      createThoughtInput: // value for 'createThoughtInput'
 *   },
 * });
 */
export function useCreateThoughtMutation(baseOptions?: Apollo.MutationHookOptions<CreateThoughtMutation, CreateThoughtMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThoughtMutation, CreateThoughtMutationVariables>(CreateThoughtDocument, options);
      }
export type CreateThoughtMutationHookResult = ReturnType<typeof useCreateThoughtMutation>;
export type CreateThoughtMutationResult = Apollo.MutationResult<CreateThoughtMutation>;
export type CreateThoughtMutationOptions = Apollo.BaseMutationOptions<CreateThoughtMutation, CreateThoughtMutationVariables>;
export const DeleteThoughtDocument = gql`
    mutation DeleteThought($id: Float!) {
  deleteThought(id: $id) {
    id
  }
}
    `;
export type DeleteThoughtMutationFn = Apollo.MutationFunction<DeleteThoughtMutation, DeleteThoughtMutationVariables>;

/**
 * __useDeleteThoughtMutation__
 *
 * To run a mutation, you first call `useDeleteThoughtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThoughtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThoughtMutation, { data, loading, error }] = useDeleteThoughtMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteThoughtMutation(baseOptions?: Apollo.MutationHookOptions<DeleteThoughtMutation, DeleteThoughtMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteThoughtMutation, DeleteThoughtMutationVariables>(DeleteThoughtDocument, options);
      }
export type DeleteThoughtMutationHookResult = ReturnType<typeof useDeleteThoughtMutation>;
export type DeleteThoughtMutationResult = Apollo.MutationResult<DeleteThoughtMutation>;
export type DeleteThoughtMutationOptions = Apollo.BaseMutationOptions<DeleteThoughtMutation, DeleteThoughtMutationVariables>;
export const UpdateThoughtDocument = gql`
    mutation UpdateThought($updateThoughtInput: UpdateThoughtInput!) {
  updateThought(updateThoughtInput: $updateThoughtInput) {
    id
    content
  }
}
    `;
export type UpdateThoughtMutationFn = Apollo.MutationFunction<UpdateThoughtMutation, UpdateThoughtMutationVariables>;

/**
 * __useUpdateThoughtMutation__
 *
 * To run a mutation, you first call `useUpdateThoughtMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThoughtMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThoughtMutation, { data, loading, error }] = useUpdateThoughtMutation({
 *   variables: {
 *      updateThoughtInput: // value for 'updateThoughtInput'
 *   },
 * });
 */
export function useUpdateThoughtMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThoughtMutation, UpdateThoughtMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThoughtMutation, UpdateThoughtMutationVariables>(UpdateThoughtDocument, options);
      }
export type UpdateThoughtMutationHookResult = ReturnType<typeof useUpdateThoughtMutation>;
export type UpdateThoughtMutationResult = Apollo.MutationResult<UpdateThoughtMutation>;
export type UpdateThoughtMutationOptions = Apollo.BaseMutationOptions<UpdateThoughtMutation, UpdateThoughtMutationVariables>;
export const CreateThreadDocument = gql`
    mutation CreateThread($createThreadInput: CreateThreadInput!) {
  createThread(createThreadInput: $createThreadInput) {
    id
    createdAt
    updatedAt
    users {
      id
      username
    }
  }
}
    `;
export type CreateThreadMutationFn = Apollo.MutationFunction<CreateThreadMutation, CreateThreadMutationVariables>;

/**
 * __useCreateThreadMutation__
 *
 * To run a mutation, you first call `useCreateThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThreadMutation, { data, loading, error }] = useCreateThreadMutation({
 *   variables: {
 *      createThreadInput: // value for 'createThreadInput'
 *   },
 * });
 */
export function useCreateThreadMutation(baseOptions?: Apollo.MutationHookOptions<CreateThreadMutation, CreateThreadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThreadMutation, CreateThreadMutationVariables>(CreateThreadDocument, options);
      }
export type CreateThreadMutationHookResult = ReturnType<typeof useCreateThreadMutation>;
export type CreateThreadMutationResult = Apollo.MutationResult<CreateThreadMutation>;
export type CreateThreadMutationOptions = Apollo.BaseMutationOptions<CreateThreadMutation, CreateThreadMutationVariables>;
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
    mutation UpdateUserProfile($username: String!, $updateUserInput: UpdateUserDto!) {
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
 *      username: // value for 'username'
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
export const GetCollectionDocument = gql`
    query GetCollection($collectionName: String!) {
  getCollection(collectionName: $collectionName) {
    id
    name
    isDefault
    pictures {
      picture {
        ...PictureFragment
      }
    }
  }
}
    ${PictureFragmentFragmentDoc}`;

/**
 * __useGetCollectionQuery__
 *
 * To run a query within a React component, call `useGetCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionQuery({
 *   variables: {
 *      collectionName: // value for 'collectionName'
 *   },
 * });
 */
export function useGetCollectionQuery(baseOptions: Apollo.QueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables> & ({ variables: GetCollectionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, options);
      }
export function useGetCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, options);
        }
export function useGetCollectionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, options);
        }
export type GetCollectionQueryHookResult = ReturnType<typeof useGetCollectionQuery>;
export type GetCollectionLazyQueryHookResult = ReturnType<typeof useGetCollectionLazyQuery>;
export type GetCollectionSuspenseQueryHookResult = ReturnType<typeof useGetCollectionSuspenseQuery>;
export type GetCollectionQueryResult = Apollo.QueryResult<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCommentsByPictureDocument = gql`
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
export const GetNotificationsDocument = gql`
    query GetNotifications($page: Int!, $limit: Int!) {
  notifications(page: $page, limit: $limit) {
    notifications {
      ...NotificationFragment
    }
    totalCount
    totalPages
    currentPage
  }
}
    ${NotificationFragmentFragmentDoc}`;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables> & ({ variables: GetNotificationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export function useGetNotificationsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsSuspenseQueryHookResult = ReturnType<typeof useGetNotificationsSuspenseQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const GetPictureByUsernameDocument = gql`
    query GetPictureByUsername($username: String) {
  picturesByUsername(username: $username) {
    ...PictureFragment
  }
}
    ${PictureFragmentFragmentDoc}`;

/**
 * __useGetPictureByUsernameQuery__
 *
 * To run a query within a React component, call `useGetPictureByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPictureByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPictureByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetPictureByUsernameQuery(baseOptions?: Apollo.QueryHookOptions<GetPictureByUsernameQuery, GetPictureByUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPictureByUsernameQuery, GetPictureByUsernameQueryVariables>(GetPictureByUsernameDocument, options);
      }
export function useGetPictureByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPictureByUsernameQuery, GetPictureByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPictureByUsernameQuery, GetPictureByUsernameQueryVariables>(GetPictureByUsernameDocument, options);
        }
export function useGetPictureByUsernameSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetPictureByUsernameQuery, GetPictureByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPictureByUsernameQuery, GetPictureByUsernameQueryVariables>(GetPictureByUsernameDocument, options);
        }
export type GetPictureByUsernameQueryHookResult = ReturnType<typeof useGetPictureByUsernameQuery>;
export type GetPictureByUsernameLazyQueryHookResult = ReturnType<typeof useGetPictureByUsernameLazyQuery>;
export type GetPictureByUsernameSuspenseQueryHookResult = ReturnType<typeof useGetPictureByUsernameSuspenseQuery>;
export type GetPictureByUsernameQueryResult = Apollo.QueryResult<GetPictureByUsernameQuery, GetPictureByUsernameQueryVariables>;
export const GetPicturesFromFollowingDocument = gql`
    query GetPicturesFromFollowing($userId: [Float!]!) {
  picturesFromFollowing(userId: $userId) {
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
 *      userId: // value for 'userId'
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
export const GetThreadDocument = gql`
    query GetThread($id: Float!) {
  thread(id: $id) {
    id
    createdAt
    updatedAt
    users {
      ...ThreadUser
    }
    messages {
      ...ThreadMessage
    }
  }
}
    ${ThreadUserFragmentDoc}
${ThreadMessageFragmentDoc}`;

/**
 * __useGetThreadQuery__
 *
 * To run a query within a React component, call `useGetThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetThreadQuery(baseOptions: Apollo.QueryHookOptions<GetThreadQuery, GetThreadQueryVariables> & ({ variables: GetThreadQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadQuery, GetThreadQueryVariables>(GetThreadDocument, options);
      }
export function useGetThreadLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadQuery, GetThreadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadQuery, GetThreadQueryVariables>(GetThreadDocument, options);
        }
export function useGetThreadSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetThreadQuery, GetThreadQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThreadQuery, GetThreadQueryVariables>(GetThreadDocument, options);
        }
export type GetThreadQueryHookResult = ReturnType<typeof useGetThreadQuery>;
export type GetThreadLazyQueryHookResult = ReturnType<typeof useGetThreadLazyQuery>;
export type GetThreadSuspenseQueryHookResult = ReturnType<typeof useGetThreadSuspenseQuery>;
export type GetThreadQueryResult = Apollo.QueryResult<GetThreadQuery, GetThreadQueryVariables>;
export const GetThreadsByUserIdDocument = gql`
    query GetThreadsByUserId($userId: Float!) {
  threadsByUserId(userId: $userId) {
    id
    createdAt
    updatedAt
    users {
      id
      firstName
      lastName
      avatar
      username
    }
    messages {
      ...ThreadMessage
    }
  }
}
    ${ThreadMessageFragmentDoc}`;

/**
 * __useGetThreadsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetThreadsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThreadsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThreadsByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetThreadsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetThreadsByUserIdQuery, GetThreadsByUserIdQueryVariables> & ({ variables: GetThreadsByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThreadsByUserIdQuery, GetThreadsByUserIdQueryVariables>(GetThreadsByUserIdDocument, options);
      }
export function useGetThreadsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThreadsByUserIdQuery, GetThreadsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThreadsByUserIdQuery, GetThreadsByUserIdQueryVariables>(GetThreadsByUserIdDocument, options);
        }
export function useGetThreadsByUserIdSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetThreadsByUserIdQuery, GetThreadsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetThreadsByUserIdQuery, GetThreadsByUserIdQueryVariables>(GetThreadsByUserIdDocument, options);
        }
export type GetThreadsByUserIdQueryHookResult = ReturnType<typeof useGetThreadsByUserIdQuery>;
export type GetThreadsByUserIdLazyQueryHookResult = ReturnType<typeof useGetThreadsByUserIdLazyQuery>;
export type GetThreadsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetThreadsByUserIdSuspenseQuery>;
export type GetThreadsByUserIdQueryResult = Apollo.QueryResult<GetThreadsByUserIdQuery, GetThreadsByUserIdQueryVariables>;
export const GetUserProfileDocument = gql`
    query GetUserProfile($username: String!) {
  user(username: $username) {
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
 *      username: // value for 'username'
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
export const MessageAddedDocument = gql`
    subscription MessageAdded($threadId: Float!) {
  messageAdded(threadId: $threadId) {
    id
    content
    createdAt
    user {
      id
    }
  }
}
    `;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a React component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageAddedSubscription({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useMessageAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables> & ({ variables: MessageAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageAddedSubscription, MessageAddedSubscriptionVariables>(MessageAddedDocument, options);
      }
export type MessageAddedSubscriptionHookResult = ReturnType<typeof useMessageAddedSubscription>;
export type MessageAddedSubscriptionResult = Apollo.SubscriptionResult<MessageAddedSubscription>;
export const NotificationAddedDocument = gql`
    subscription NotificationAdded($userId: Int!) {
  notificationAdded(userId: $userId) {
    ...NotificationFragment
  }
}
    ${NotificationFragmentFragmentDoc}`;

/**
 * __useNotificationAddedSubscription__
 *
 * To run a query within a React component, call `useNotificationAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationAddedSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationAddedSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationAddedSubscription, NotificationAddedSubscriptionVariables> & ({ variables: NotificationAddedSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationAddedSubscription, NotificationAddedSubscriptionVariables>(NotificationAddedDocument, options);
      }
export type NotificationAddedSubscriptionHookResult = ReturnType<typeof useNotificationAddedSubscription>;
export type NotificationAddedSubscriptionResult = Apollo.SubscriptionResult<NotificationAddedSubscription>;