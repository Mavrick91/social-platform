import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { ReactNode, useState } from 'react';
import UploadPictureForm, {
  FormDataWithoutFile,
} from '@/components/UploadPicture/UploadPictureForm';
import ErrorAlert from '@/components/AlertError';

type Props = {
  refetch: () => void;
  trigger: ReactNode;
  defaultValues?: FormDataWithoutFile & {
    id: number;
    data: string;
  };
};

function UploadPictureDialog({ refetch, trigger, defaultValues }: Props) {
  const [open, setOpen] = useState(false);
  const [errorMutation, setErrorMutation] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}

      <DialogContent className="max-w-3xl">
        {errorMutation && <ErrorAlert className="mb-4" error={errorMutation} />}

        <DialogHeader>
          <DialogTitle>Upload a Picture</DialogTitle>
          <DialogDescription>
            Please fill in the details for the picture you want to upload.
          </DialogDescription>
        </DialogHeader>

        <UploadPictureForm
          setErrorMutation={setErrorMutation}
          refetch={refetch}
          defaultValues={defaultValues}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UploadPictureDialog;
