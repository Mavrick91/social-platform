import { AddPicturesStep } from '@/components/NewCollectionDialog/AddPicturesStep';
import { Dialog } from '@/components/ui/dialog';
import useAddPictureCollection from '@/hooks/graphql/useAddPictureCollection';
import { useUserInfo } from '@/providers/UserInfoProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import useGetPicturesFromSaved from '@/hooks/useGetPicturesFromSaved.ts';

const formSchema = z.object({
  selectedPictures: z.array(z.number()),
});

export type FormData = z.infer<typeof formSchema>;

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setCurrentStep?: (step: number) => void;
  collectionId: number;
};

export const AddPictures: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  setCurrentStep,
  collectionId,
}) => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const [addPictureToCollection] = useAddPictureCollection();
  const [selectedPictures, setSelectedPictures] = useState<number[]>([]);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    methods.register('selectedPictures');
  }, [methods]);

  const onSubmitAddPicture = async (data: FormData) => {
    try {
      await addPictureToCollection({
        variables: {
          collectionId: collectionId,
          pictureId: data.selectedPictures,
        },
      });

      setIsOpen(false);
      navigate(`/${user.username}/saved`);
    } catch (error) {
      if (error instanceof Error)
        toast.error("Failed to update collection's pictures");
    }
  };

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

  const picturesFromSaved = useGetPicturesFromSaved();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmitAddPicture)}>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <AddPicturesStep
            picturesFromSaved={picturesFromSaved}
            selectedPictures={selectedPictures}
            handlePictureClick={handlePictureClick}
            setCurrentStep={setCurrentStep}
            onSubmit={onSubmitAddPicture}
          />
        </Dialog>
      </form>
    </FormProvider>
  );
};
