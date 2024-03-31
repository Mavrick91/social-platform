import { useUserInfo } from '@/providers/UserInfoProvider';

export default function useGetPicturesFromSaved() {
  const user = useUserInfo();

  const picturesFromSaved = [...user.collections].sort(
    (a, b) => Number(a.id) - Number(b.id)
  )[0];

  return picturesFromSaved;
}
