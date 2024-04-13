import { useFormContext } from 'react-hook-form';
import { FormData } from '..';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClickNext: (params?: any) => void;
  labelSubmit: string;
};

export const CreateCollectionStep = ({ onClickNext, labelSubmit }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <DialogContent className="rounded-lg max-w-96">
      <DialogHeader>
        <h2 className="text-center w-full font-semibold">New collection</h2>
      </DialogHeader>
      <div className="flex flex-col">
        <div className="px-6">
          <Input
            {...register('collectionName')}
            placeholder="Collection name"
            autoComplete="off"
            error={errors.collectionName?.message}
            className="bg-secondary-background placeholder:text-secondary border-separator"
          />
        </div>
        <Separator className="mt-4" elevated />
        <div className="flex justify-center">
          <Button
            type="button"
            variant="blue-link"
            className="p-0"
            onClick={onClickNext}
          >
            {labelSubmit}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
