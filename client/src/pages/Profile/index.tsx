import { cn } from '@/lib/utils';
import { Bookmark, Grid3X3, SquareUser } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbnailGrid from '../../components/ThumbnailGrid';
import UserCollections from './UserCollections';
import UserProfile from './UserProfile';
import { useGetUserProfileQuery } from '@/__generated__/graphql';

function Profile() {
  const { username } = useParams();
  const [selectedTab, setSelectedTab] = useState('Posts');
  const [borderPos, setBorderPos] = useState(0);
  const tabRef = useRef<HTMLDivElement>(null);
  const [borderWidth, setBorderWidth] = useState(0);
  const navigate = useNavigate();
  const { data, loading, error } = useGetUserProfileQuery({
    variables: { username: username! },
  });

  const tabs = useMemo(
    () => [
      {
        name: 'Posts',
        component: <ThumbnailGrid />,
        icon: <Grid3X3 size={12} />,
      },
      {
        name: 'Saved',
        component: <UserCollections />,
        icon: <Bookmark size={12} />,
      },
      { name: 'Tags', component: <></>, icon: <SquareUser size={12} /> },
    ],
    []
  );

  useEffect(() => {
    if (tabRef.current) {
      const tabWidth = tabRef.current.offsetWidth;
      const tabLeft = tabRef.current.offsetLeft;
      setBorderPos(tabLeft - 5);
      setBorderWidth(tabWidth + 10);
    }
  }, [selectedTab, tabs]);

  const selectedComponent = tabs.find(
    (tab) => tab.name === selectedTab
  )?.component;

  if (error || !data?.user) {
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
        <UserProfile currentProfile={data?.user} />
        <div className="relative flex border-t cursor-pointer justify-center gap-14 border-gray-200">
          {tabs.map((tab) => (
            <div
              key={tab.name}
              ref={selectedTab === tab.name ? tabRef : undefined}
              onClick={() => setSelectedTab(tab.name)}
              className={cn('py-4 flex gap-2 items-center', {
                'text-black': selectedTab === tab.name,
                'text-gray-400': selectedTab !== tab.name,
              })}
            >
              {tab.icon}
              <div className="font-semibold text-sm">{tab.name}</div>
            </div>
          ))}
          <div
            className="absolute left-0 top-0 h-px bg-black transition-transform duration-200 ease-in-out"
            style={{
              width: `${borderWidth}px`,
              transform: `translateX(${borderPos}px)`,
            }}
          />
        </div>
        {selectedComponent}
      </div>
    </div>
  );
}

export default Profile;
