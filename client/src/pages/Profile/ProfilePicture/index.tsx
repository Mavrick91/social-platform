import { Picture } from '@/generated/graphql.tsx';
import PictureEmpty from '@/pages/Dashboard/PictureEmpty';
import PictureProfileItem from '@/pages/Profile/PictureProfileItem';

type Props = {
  pictures: Picture[];
  refetchPictures: () => void;
};

const ProfilePics = ({ pictures, refetchPictures }: Props) => {
  return pictures && pictures.length >= 1 ? (
    pictures.map((picture) => (
      <PictureProfileItem
        picture={picture}
        key={picture.id}
        refetch={refetchPictures}
      />
    ))
  ) : (
    <PictureEmpty />
  );
};

export default ProfilePics;
