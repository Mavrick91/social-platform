import React, { createContext, useContext, useMemo } from 'react';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { useAppSelector } from '@/store/hooks';
import {
  GetUserProfileQuery,
  useGetUserProfileQuery,
} from '@/__generated__/graphql';

const UserInfoContext = createContext<GetUserProfileQuery | undefined>(
  undefined
);

type UserInfoProviderProps = {
  children: React.ReactNode;
};

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({
  children,
}) => {
  const userInfo = useAppSelector(selectAuthenticatedUser);

  const { data, loading } = useGetUserProfileQuery({
    variables: { profileId: userInfo.id },
  });

  const value = useMemo(() => data, [data]);

  if (loading || !data) {
    return null;
  }

  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = (): GetUserProfileQuery => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};
