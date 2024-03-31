import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CreateCollectionStep } from '@/components/NewCollectionDialog/CreateCollectionStep';

type Props = {
  onClickNext: () => void;
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  labelSubmit: string;
};

export default function CreateNewCollectionName({
  children,
  onClickNext,
  open,
  setOpen,
  labelSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <CreateCollectionStep
        onClickNext={onClickNext}
        labelSubmit={labelSubmit}
      />
    </Dialog>
  );
}
