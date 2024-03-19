import EditProfileDialog from '@/components/EditProfileDialog';
import { Button } from '@/components/ui/button';

export default function OwnProfile() {
  return (
    <>
      <EditProfileDialog>
        <Button>Edit Profile</Button>
      </EditProfileDialog>
    </>
  );
}
