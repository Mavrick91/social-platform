import PictureProfileItem from '@/pages/Profile/PictureProfileItem';
import { Card } from '@/components/ui/card.tsx';
import PictureEmpty from '@/pages/Dashboard/PictureEmpty';
import { Picture } from '@/generated/graphql.tsx';

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
    <Card>
      <PictureEmpty />
    </Card>
  );
};

export default ProfilePics;
