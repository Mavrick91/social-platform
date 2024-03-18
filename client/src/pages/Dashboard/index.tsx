import UploadPictureDialog from '@/components/UploadPictureDialog';
import { Button } from '@/components/ui/button.tsx';
import { DialogTrigger } from '@/components/ui/dialog.tsx';
import PictureList from '@/pages/Dashboard/PictureList';
import { Plus } from 'lucide-react';

function Dashboard() {
  const trigger = (
    <DialogTrigger className="flex items-center w-full justify-between" asChild>
      <div>
        <h1 className="font-medium text-2xl">Photos</h1>
        <Button className="gap-2">
          <Plus />
          Upload
        </Button>
      </div>
    </DialogTrigger>
  );

  return (
    <>
      <UploadPictureDialog trigger={trigger} />
      <PictureList />
    </>
  );
}

export default Dashboard;
