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
} from '@/components/UploadPictureDialog/UploadPictureForm';
import ErrorAlert from '@/components/AlertError';

type Props = {
  trigger?: ReactNode;
  defaultValues?: FormDataWithoutFile & {
    id: number;
    fileUrl: string;
    description?: string | null;
  };
  open: boolean;
  setOpen: (value: boolean) => void;
};

function UploadPictureDialog({ trigger, defaultValues, open, setOpen }: Props) {
  const [errorMutation, setErrorMutation] = useState<string | null>(null);

  const handleOpen = (isOpen: boolean) => {
    if (!isOpen) {
      setErrorMutation(null);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
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
          defaultValues={defaultValues}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}

export default UploadPictureDialog;
