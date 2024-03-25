import { selectAuthenticatedUser } from '@/features/users/selectors';
import { useAppSelector } from '@/store/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PictureList from '../Dashboard/PostProfile';
import UserProfile from './UserProfile';
import { cn } from '@/lib/utils';
import { Bookmark, Grid3X3, SquareUser } from 'lucide-react';

function Profile() {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const navigate = useNavigate();
  const profileId: number = Number(useParams().profileId);
  const [selectedTab, setSelectedTab] = useState('Posts');
  const [borderPos, setBorderPos] = useState(0);
  const tabRef = useRef<HTMLDivElement>(null);
  const [borderWidth, setBorderWidth] = useState(0);

  const tabs = useMemo(
    () => [
      {
        name: 'Posts',
        component: <PictureList profileId={profileId} />,
        icon: <Grid3X3 size={12} />,
      },
      { name: 'Saved', component: <></>, icon: <Bookmark size={12} /> },
      { name: 'Tags', component: <></>, icon: <SquareUser size={12} /> },
    ],
    [profileId]
  );

  useEffect(() => {
    if (tabRef.current) {
      const tabWidth = tabRef.current.offsetWidth;
      const tabLeft = tabRef.current.offsetLeft;
      setBorderPos(tabLeft);
      setBorderWidth(tabWidth);
    }
  }, [selectedTab, tabs]);

  const selectedComponent = tabs.find(
    (tab) => tab.name === selectedTab
  )?.component;

  useEffect(() => {
    if (isNaN(profileId)) {
      navigate(`/profile/${userInfo.id}`);
    }
  }, [profileId, navigate, userInfo.id]);

  if (isNaN(profileId)) {
    return;
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      <UserProfile profileId={profileId} />
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
  );
}

export default Profile;
