import { useFormContext } from 'react-hook-form';
import { FormData } from '..';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-select';

type Props = {
  setCurrentStep: (step: number) => void;
};

export const CreateCollectionStep = ({ setCurrentStep }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  return (
    <DialogContent className="px-0 pt-5 pb-2 rounded-lg max-w-96">
      <DialogHeader>
        <h2 className="text-lg font-semibold">New collection</h2>
      </DialogHeader>
      <div className="flex flex-col">
        <Separator className="mb-4" />
        <div className="px-6">
          <Input
            {...register('collectionName')}
            placeholder="Collection name"
            autoFocus
            autoComplete="off"
            error={errors.collectionName?.message}
          />
        </div>
        <Separator className="mt-4 mb-2" />
        <div className="flex justify-center">
          <Button
            type="button"
            variant="blue-link"
            className="p-0"
            onClick={() => setCurrentStep(1)}
          >
            Next
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
