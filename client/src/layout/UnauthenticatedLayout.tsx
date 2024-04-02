import { getTokens } from '@/lib/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export default function UnauthenticatedLayout({ children }: Props) {
  const navigate = useNavigate();
  const tokens = getTokens();
  const [isValidatingToken, setIsValidatingToken] = useState(true);

  useEffect(() => {
    if (tokens && tokens.accessToken) {
      navigate('/');
    } else {
      setIsValidatingToken(false);
    }
  }, [navigate, tokens]);

  if (isValidatingToken) {
    return null;
  }

  return (
    <div className="flex justify-center items-center grow">{children}</div>
  );
}
