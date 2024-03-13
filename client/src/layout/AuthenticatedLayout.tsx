import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (!accessToken || isTokenExpired(accessToken)) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return (
    <div className="border border-blue-700">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AuthenticatedLayout;
