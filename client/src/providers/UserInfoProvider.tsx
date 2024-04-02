import {
  UserProfileFragment,
  useGetUserProfileQuery,
} from '@/__generated__/graphql';
import { clearStorage, getUser } from '@/lib/storage';
import React, { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfoContext = createContext<UserProfileFragment | undefined>(
  undefined
);

type UserInfoProviderProps = {
  children: React.ReactNode;
};

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({
  children,
}) => {
  const localUser = getUser();
  const navigate = useNavigate();

  const { data, loading, error } = useGetUserProfileQuery({
    variables: { username: localUser.username },
  });

  const value = useMemo(() => data, [data]);

  if (loading) {
    return null;
  }

  if (!data || error) {
    clearStorage();
    navigate('/login');

    return null;
  }

  return (
    <UserInfoContext.Provider value={value?.user}>
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = (): UserProfileFragment => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
};
