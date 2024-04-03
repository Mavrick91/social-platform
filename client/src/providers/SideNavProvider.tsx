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
  isNotificationVisible: boolean;
  toggleNotification: () => void;
  isNewPostVisible: boolean;
  toggleNewPost: () => void;
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
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [isNewPostVisible, setIsNewPostVisible] = useState(false);
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

  const toggleNotification = useCallback(() => {
    setIsNotificationVisible(
      (prevIsNotificationVisible) => !prevIsNotificationVisible
    );
  }, []);

  const toggleNewPost = useCallback(() => {
    setIsNewPostVisible((prevIsNewPostVisible) => !prevIsNewPostVisible);
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
    isNotificationVisible,
    toggleNotification,
    isNewPostVisible,
    toggleNewPost,
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
