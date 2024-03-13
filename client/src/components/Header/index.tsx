import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { Button } from '@/components/ui/button.tsx';
import { logout } from '@/features/users/userSlice.ts';
import { Link, useNavigate } from 'react-router-dom';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';

export default function Header() {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <header className="shadow-md z-50">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/dashboard" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Social Platform
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <button
              data-tooltip-target="tooltip-dark"
              type="button"
              className="inline-flex items-center p-2 mr-1 text-sm font-medium text-gray-500 rounded-lg dark:text-gray-400 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>
            <div
              id="tooltip-dark"
              role="tooltip"
              className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
            >
              Toggle dark mode
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="size-10 items-center justify-center flex rounded-full bg-slate-400">
                  {userInfo?.firstName[0]}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{`${userInfo.firstName} ${userInfo.lastName}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
