import { CollectionFragmentFragment } from '@/__generated__/graphql';
import { Dialog } from '@/components/ui/dialog';
import useAddPictureCollection from '@/hooks/graphql/useAddPictureCollection';
import useCreateCollection from '@/hooks/graphql/useCreateCollection';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import CreateNewCollectionName from '@/components/CreateNewCollectionName';
import { Button } from '../ui/button';
import { AddPicturesStep } from './AddPicturesStep';

const formSchema = z.object({
  collectionName: z.string().min(1, { message: 'Collection name is required' }),
  selectedPictures: z.array(z.number()),
});

export type FormData = z.infer<typeof formSchema>;

type Props = {
  picturesFromSaved: CollectionFragmentFragment;
};

export default function NewCollectionDialog({ picturesFromSaved }: Props) {
  const [selectedPictures, setSelectedPictures] = useState<number[]>([]);
  const [createCollection] = useCreateCollection();
  const [addPictureToCollection] = useAddPictureCollection();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    methods.register('selectedPictures');
  }, [methods]);

  const handlePictureClick = (picId: number) => {
    const newSelectedPictures = [...selectedPictures];
    const index = newSelectedPictures.indexOf(picId);

    if (index > -1) {
      newSelectedPictures.splice(index, 1);
    } else {
      newSelectedPictures.push(picId);
    }

    setSelectedPictures(newSelectedPictures);
    methods.setValue('selectedPictures', newSelectedPictures);
  };

  useEffect(() => {
    if (!isOpen)
      methods.reset({
        collectionName: '',
        selectedPictures: [],
      });
  }, [isOpen, methods.reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await createCollection({
        variables: { name: data.collectionName },
      });

      const newCollection = response.data?.createCollection;

      if (!newCollection) throw new Error();

      if (data.selectedPictures.length > 0)
        await addPictureToCollection({
          variables: {
            collectionId: Number(newCollection.id),
            pictureId: data.selectedPictures,
          },
        });

      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error)
        toast.error('Failed to create collection ' + error.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CreateNewCollectionName
          onClickNext={() => setCurrentStep(1)}
          open={isOpen && currentStep === 0}
          setOpen={setIsOpen}
          labelSubmit="Next"
        >
          <Button variant="blue-link" onClick={() => setCurrentStep(0)}>
            + New collection
          </Button>
        </CreateNewCollectionName>
        <Dialog open={isOpen && currentStep === 1} onOpenChange={setIsOpen}>
          <AddPicturesStep
            picturesFromSaved={picturesFromSaved}
            selectedPictures={selectedPictures}
            handlePictureClick={handlePictureClick}
            setCurrentStep={setCurrentStep}
            onSubmit={onSubmit}
          />
        </Dialog>
      </form>
    </FormProvider>
  );
}
