import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import SideNav from '@/components/SideNav';
import Footer from '@/components/Footer';
import { UserInfoProvider } from '@/providers/UserInfoProvider';

type Props = {
  children: React.ReactNode;
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
    <UserInfoProvider>
      <div className="flex h-full">
        <SideNav />
        <div className="p-10 overflow-y-auto h-full w-full">
          <div className="max-w-screen-xl mx-auto grow">{children}</div>
          <Footer />
        </div>
      </div>
    </UserInfoProvider>
  );
};

export default AuthenticatedLayout;
