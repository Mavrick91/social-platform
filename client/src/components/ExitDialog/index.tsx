import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator.tsx';

type Props = {
  onClose: () => void;
  handleDiscardChanges: () => void;
};

export default function ExitDialog({ onClose, handleDiscardChanges }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseModal = () => {
    onClose();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-w-96">
        <div className="flex flex-col items-center p-8">
          <span className="text-xl">Discard post?</span>
          <span className="text-sm text-secondary mt-1">
            If you leave, your edits won't be saved.
          </span>
        </div>
        <Separator elevated />
        <button
          type="button"
          className="py-3 text-sm text-destructive font-bold"
          onClick={() => {
            handleDiscardChanges();
            handleCloseModal();
          }}
        >
          Discard
        </button>
        <Separator elevated />
        <button
          type="button"
          className="py-3 text-sm"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
      </DialogContent>
    </Dialog>
  );
}
