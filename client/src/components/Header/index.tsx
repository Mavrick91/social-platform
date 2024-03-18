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
import UploadPicture from '@/components/UploadPictureDialog';
import { Link, useNavigate } from 'react-router-dom';
import { selectAuthenticatedUser } from '@/features/users/selectors.ts';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { DialogTrigger } from '@/components/ui/dialog';

export default function Header() {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [uploadPictureDialogOpen, setUploadPictureDialogOpen] = useState(false);

  const trigger = (
    <DialogTrigger asChild>
      <Button className="gap-2 flex items-center w-full">
        <Plus />
        Upload
      </Button>
    </DialogTrigger>
  );

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="size-10 items-center justify-center shrink-0 flex rounded-full bg-slate-400">
                  {userInfo.firstName[0]}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{`${userInfo.firstName} ${userInfo.lastName}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(`/profile/${userInfo.sub}`)}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => {
                    dispatch(logout());
                    navigate('/login');
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <UploadPicture
              trigger={trigger}
              open={uploadPictureDialogOpen}
              setOpen={setUploadPictureDialogOpen}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
