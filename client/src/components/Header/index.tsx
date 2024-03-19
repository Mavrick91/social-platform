import UploadPicture from '@/components/UploadPictureDialog';
import { Button } from '@/components/ui/button.tsx';
import { DialogTrigger } from '@/components/ui/dialog';
import { logout } from '@/features/users/userSlice.ts';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { useAppDispatch } from '@/store/hooks.ts';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserAvatar from '@/components/UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function Header() {
  const { user } = useUserInfo();
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
                <button className="shadow-lg shrink-0 rounded-full">
                  <UserAvatar
                    avatar={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{`${user.firstName} ${user.lastName}`}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(`/profile/${user.id}`)}
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
