import { cn } from '@/lib/utils';
import { useSideNav } from '@/providers/SideNavProvider';
import { useUserInfo } from '@/providers/UserInfoProvider';
import DropdownMore from './DropdownMore';
import SideNavLogo from './SideNavLogo';
import UserSearchOverlay from './UserSearchOverlay';
import { getNavigationItems } from './sideNavConfig';
import SideNavItem from './SideNavItem';

export default function SideNav() {
  const { user } = useUserInfo();
  const { sideNavOpen, isSearchVisible, toggleSearch } = useSideNav();
  const navigationItems = getNavigationItems(user, toggleSearch);

  const displaySmallNav = !sideNavOpen || isSearchVisible;

  return (
    <header className="z-50 bg-white shrink-0 h-screen flex-col flex">
      <nav
        className={cn(
          `bg-white h-full z-20 absolute py-2.5 transition-all px-3 border-r border-[#DBDBDB]`,
          {
            'w-small-sidenav': displaySmallNav,
            'w-medium-sidenav': !displaySmallNav,
          }
        )}
      >
        <div className="flex flex-col h-full justify-between mx-auto max-w-screen-xl">
          <SideNavLogo displaySmallNav={displaySmallNav} />

          <div className="flex flex-col grow justify-between h-full">
            <ul className="flex flex-col w-full">
              {navigationItems.map((item) => (
                <SideNavItem
                  key={item.name}
                  item={item}
                  isSmall={!sideNavOpen || isSearchVisible}
                />
              ))}
            </ul>

            <DropdownMore displaySmallNav={displaySmallNav} />
          </div>
        </div>
      </nav>
      {isSearchVisible && <UserSearchOverlay />}
    </header>
  );
}
