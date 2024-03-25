import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import SideNav from '@/components/SideNav';
import Footer from '@/components/Footer';
import { UserInfoProvider } from '@/providers/UserInfoProvider';
import { SideNavProvider, useSideNav } from '@/providers/SideNavProvider';
import { cn } from '@/lib/utils';

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
        <div className="max-w-screen-xl mx-auto grow">{children}</div>
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
