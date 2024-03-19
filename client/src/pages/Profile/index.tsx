import { selectAuthenticatedUser } from '@/features/users/selectors';
import { useAppSelector } from '@/store/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import UserProfile from './UserProfile';
import { useEffect } from 'react';
import PictureList from '../Dashboard/PictureList';

function Profile() {
  const userInfo = useAppSelector(selectAuthenticatedUser);
  const navigate = useNavigate();
  const profileId: number = Number(useParams().profileId);

  useEffect(() => {
    if (isNaN(profileId)) {
      navigate(`/profile/${userInfo.id}`);
    }
  }, [profileId, navigate, userInfo.id]);

  if (isNaN(profileId)) {
    return;
  }

  return (
    <div className="flex flex-col">
      <UserProfile profileId={profileId} />
      <PictureList profileId={profileId} />
    </div>
  );
}

export default Profile;
