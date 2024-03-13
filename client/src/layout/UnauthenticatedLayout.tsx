import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks.ts';
import { isTokenExpired } from '@/lib/authUtils.ts';

type Props = {
  children: React.ReactNode;
};

export default function UnauthenticatedLayout({ children }: Props) {
  const navigate = useNavigate();
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  useEffect(() => {
    if (accessToken && !isTokenExpired(accessToken)) {
      navigate('/dashboard');
    } else {
      setIsValidatingToken(false);
    }
  }, [accessToken, navigate]);

  if (isValidatingToken) {
    return null;
  }

  return (
    <div className="flex justify-center items-center grow">{children}</div>
  );
}
