import { Button } from '@/components/ui/button';
import { SettingsIcon } from 'lucide-react';

export default function OwnProfile() {
  return (
    <>
      <Button>Edit Profile</Button>

      <SettingsIcon className="text-gray-600 shrink-0" />
    </>
  );
}
