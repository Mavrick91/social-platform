import useWindowWidth from '@/hooks/useWindowWidth';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

type SideNavContextType = {
  sideNavOpen: boolean;
  toggleSideNav: () => void;
  toggleSearch: () => void;
  isSearchVisible: boolean;
};

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

type SideNavProviderProps = {
  children: React.ReactNode;
};

export const SideNavProvider: React.FC<SideNavProviderProps> = ({
  children,
}) => {
  const windowWidth = useWindowWidth();
  const [sideNavOpen, setSideNavOpen] = useState(windowWidth < 1264);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (windowWidth > 1264) {
      setSideNavOpen(true);
    } else setSideNavOpen(false);
  }, [windowWidth]);

  const toggleSideNav = useCallback(() => {
    setSideNavOpen((prevSideNavOpen) => !prevSideNavOpen);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  }, []);

  const closeSearch = useCallback(() => {
    setIsSearchVisible(false);
  }, []);

  useEffect(() => {
    closeSearch();
  }, [pathname, closeSearch]);

  const value = {
    sideNavOpen,
    toggleSideNav,
    toggleSearch,
    isSearchVisible,
  };

  return (
    <SideNavContext.Provider value={value}>{children}</SideNavContext.Provider>
  );
};

export const useSideNav = (): SideNavContextType => {
  const context = useContext(SideNavContext);
  if (!context) {
    throw new Error('useSideNav must be used within a SideNavProvider');
  }
  return context;
};
