import EditProfileDialog from '@/components/EditProfileDialog';
import { Button } from '@/components/ui/button';

export default function OwnProfile() {
  return (
    <div className="flex">
      <EditProfileDialog>
        <Button variant="gray" size="xs">
          Edit Profile
        </Button>
      </EditProfileDialog>
    </div>
  );
}
