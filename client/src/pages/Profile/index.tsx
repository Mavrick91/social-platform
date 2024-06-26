import { useGetUserProfileQuery } from '@/__generated__/graphql';
import { cn } from '@/lib/utils';
import { Bookmark, Grid3X3, SquareUser } from 'lucide-react';
import { useMemo } from 'react';
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import UserProfile from './UserProfile';
import { useUserInfo } from '@/providers/UserInfoProvider.tsx';

function Profile() {
  const { username } = useParams();
  const user = useUserInfo();
  const location = useLocation();
  const navigate = useNavigate();
  const { data, error } = useGetUserProfileQuery({
    variables: { username: username! },
  });

  const tabs = useMemo(() => {
    const defaultTab = [
      { name: 'Posts', path: `/${username}`, icon: <Grid3X3 size={12} /> },
      {
        name: 'Tags',
        path: `/${username}/tagged`,
        icon: <SquareUser size={12} />,
      },
    ];

    if (user.id === data?.user?.id) {
      defaultTab.splice(1, 0, {
        name: 'Saved',
        path: `/${username}/saved`,
        icon: <Bookmark size={12} />,
      });
    }
    return defaultTab;
  }, [data?.user?.id, user.id, username]);

  const activeTab = tabs.find(
    (tab) =>
      location.pathname === tab.path ||
      (tab.name === 'Posts' &&
        (location.pathname === `/${username}` ||
          location.pathname === `/${username}/posts`))
  );

  if (error) {
    return (
      <div className="flex flex-col gap-10 items-center mt-10">
        <h1 className="text-2xl font-semibold">Profile not found</h1>
        <span>
          The link you followed may be broken, or the page may have been
          removed.{' '}
          <button className="text-blue-700" onClick={() => navigate('/')}>
            Go back
          </button>{' '}
          to Instagram Clone.
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-lg-page mx-auto">
      <div className="px-5 pt-9">
        {data && <UserProfile currentProfile={data?.user} />}
        <div className="relative flex border-t cursor-pointer justify-center gap-14 border-separator">
          {activeTab &&
            tabs.map((tab) => (
              <Link
                to={tab.path}
                key={tab.name}
                className={cn(
                  'py-4 flex text-primary-text gap-2 items-center',
                  {
                    'border-t border-primary-text': activeTab.name === tab.name,
                    'text-secondary': activeTab.name !== tab.name,
                  }
                )}
              >
                {tab.icon}
                <div className="font-semibold text-sm">{tab.name}</div>
              </Link>
            ))}
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
