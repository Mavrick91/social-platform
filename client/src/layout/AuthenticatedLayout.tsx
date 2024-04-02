import Footer from '@/components/Footer';
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
  const { sideNavOpen } = useSideNav();

  return (
    <div className="flex h-full">
      <SideNav />
      <div
        className={cn('overflow-y-auto h-full w-full', {
          'ml-small-sidenav': !sideNavOpen,
          'ml-medium-sidenav': sideNavOpen,
        })}
      >
        {children}
        <Footer />
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
