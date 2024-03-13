import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { isTokenExpired } from '@/lib/authUtils.ts';

type Props = {
  children: React.ReactNode;
};

const AuthenticatedLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  useEffect(() => {
    if (!accessToken || isTokenExpired(accessToken)) {
      navigate('/login');
    } else {
      setIsValidatingToken(false);
    }
  }, [accessToken, navigate]);

  if (isValidatingToken) {
    return null;
  }

  return (
    <div className="border border-blue-700">
      <Header />
      <div className="max-w-screen-xl mt-10 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
