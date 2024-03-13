import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Props = {
  children: React.ReactNode;
};

export default function AuthenticatedLayout({ children }: Props) {
  return (
    <div className="border border-blue-700">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
