import Footer from '@/components/Footer';
import SideNav from '@/components/SideNav';
import { cn } from '@/lib/utils';
import { SideNavProvider, useSideNav } from '@/providers/SideNavProvider';
import { UserInfoProvider } from '@/providers/UserInfoProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

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
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    } else {
      setIsValidatingToken(false);
    }
  }, [accessToken, navigate]);

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
