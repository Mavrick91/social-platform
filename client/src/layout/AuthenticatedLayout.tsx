import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { isTokenExpired } from '@/lib/authUtils.ts';
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
      <div className="flex flex-col h-full">
        <Header />
        <div className="p-10 overflow-y-auto bg-[#f9f9f9] h-full">
          <div className="max-w-screen-xl mx-auto grow">{children}</div>
          <Footer />
        </div>
      </div>
    </UserInfoProvider>
  );
};

export default AuthenticatedLayout;
