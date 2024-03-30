import React, { createContext, useContext, useMemo } from 'react';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  UserProfileFragment,
  useGetUserProfileQuery,
} from '@/__generated__/graphql';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/features/users/userSlice';

const UserInfoContext = createContext<UserProfileFragment | undefined>(
  undefined
);

type UserInfoProviderProps = {
  children: React.ReactNode;
};

export const UserInfoProvider: React.FC<UserInfoProviderProps> = ({
  children,
}) => {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useGetUserProfileQuery({
    variables: { username: userInfo.username },
  });

  const value = useMemo(() => data, [data]);

  if (loading) {
    return null;
  }

  if (!data || error) {
    dispatch(logout());
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
