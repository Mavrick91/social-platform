import useWindowWidth from '@/hooks/useWindowWidth';
import React, { createContext, useContext, useEffect } from 'react';

type SideNavContextType = {
  sideNavOpen: boolean;
  toggleSideNav: () => void;
};

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

type SideNavProviderProps = {
  children: React.ReactNode;
};

export const SideNavProvider: React.FC<SideNavProviderProps> = ({
  children,
}) => {
  const windowWidth = useWindowWidth();
  const [sideNavOpen, setSideNavOpen] = React.useState<boolean>(
    windowWidth < 1264
  );

  useEffect(() => {
    if (windowWidth > 1264) {
      setSideNavOpen(true);
    } else setSideNavOpen(false);
  }, [windowWidth]);

  const toggleSideNav = () => {
    setSideNavOpen((prev) => !prev);
  };

  const value = {
    sideNavOpen,
    toggleSideNav,
  };

  return (
    <SideNavContext.Provider value={value}>{children}</SideNavContext.Provider>
  );
};

export const useSideNavOpen = (): SideNavContextType => {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error('useSideNavOpen must be used within a SideNavProvider');
  }
  return context;
};
