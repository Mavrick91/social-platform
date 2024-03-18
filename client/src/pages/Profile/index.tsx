import { selectAuthenticatedUser } from '@/features/users/selectors';
import { useAppSelector } from '@/store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import UserProfile from './UserProfile';
import { useEffect } from 'react';
import PictureList from '../Dashboard/PictureList';

function Profile() {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const navigate = useNavigate();
  const userId: number = Number(useParams().userId);

  useEffect(() => {
    if (isNaN(userId)) {
      navigate(`/profile/${userInfo.sub}`);
    }
  }, [userId, navigate, userInfo.sub]);

  if (isNaN(userId)) {
    return;
  }

  return (
    <div className="flex flex-col">
      <UserProfile userId={userId} />
      <PictureList userId={userId} />
    </div>
  );
}

export default Profile;
