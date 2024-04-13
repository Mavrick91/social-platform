import SideNav from '@/components/SideNav';
import { clearStorage, getTokens, getUser } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { SideNavProvider, useSideNav } from '@/providers/SideNavProvider';
import { UserInfoProvider } from '@/providers/UserInfoProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const MainContent = ({ children }: Props) => {
  const { sideNavOpen, isConversationPage } = useSideNav();

  return (
    <div className="flex h-full bg-primary-background">
      <SideNav />
      <div
        className={cn('overflow-y-auto h-full w-full bg-prim', {
          'ml-nav-narrow-width': !sideNavOpen || isConversationPage,
          'ml-nav-medium-width': sideNavOpen || !isConversationPage,
        })}
      >
        {children}
      </div>
    </div>
  );
};

const AuthenticatedLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const tokens = getTokens();
  const localUser = getUser();
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  useEffect(() => {
    if (!tokens || !tokens.accessToken || !localUser) {
      clearStorage();
      navigate('/login');
    } else {
      setIsValidatingToken(false);
    }
  }, [localUser, navigate, tokens]);

  if (isValidatingToken) {
    return null;
  }

  return (
    <SideNavProvider>
      <UserInfoProvider>
        <MainContent>{children}</MainContent>
      </UserInfoProvider>
    </SideNavProvider>
  );
};

export default AuthenticatedLayout;
